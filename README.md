# 🍽️ 음식 메뉴 관리 + RAG 추천 챗봇

음식 메뉴를 관리하는 웹에, **RAG(검색 증강 생성)** 기반 메뉴 추천 챗봇을 붙인 학습용 프로젝트입니다.
사용자가 질문하면 메뉴 데이터를 벡터 DB에서 검색하고, 검색된 메뉴를 근거로 LLM이 추천 답변을 생성합니다.

## 주요 기능

**메뉴 관리**
- 메뉴 목록 조회 / 이름 검색
- 메뉴 등록 · 조회 · 수정 · 삭제
- 메뉴 추천 수 증가
- 홈 화면에 랜덤 메뉴 3개 표시

**RAG 추천 챗봇 (`POST /chat`)**
- 질문과 의미가 비슷한 메뉴 top-3를 벡터 DB에서 검색
- 검색된 메뉴만 근거로 답변 생성 (목록에 없는 음식은 만들어내지 않도록 프롬프트로 제한)

## RAG 동작 흐름

```
[최초 1회] menus_recommendation.json → Document 변환 → 임베딩 → Chroma 벡터 DB 저장

[질문마다]
 질문 → ① 검색(Retrieve): 유사한 메뉴 top-3
      → ② 증강(Augment): 검색 결과를 context로 만들어 프롬프트에 삽입
      → ③ 생성(Generate): Gemini가 context를 근거로 답변 생성
```

구현은 `backend/service/rag_menus.py`에 있고, LangChain **LCEL 파이프라인**으로 구성했습니다.

```python
rag_chain = ({"query": ..., "context": ...} | prompt | llm | StrOutputParser())
```

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 백엔드 | Python, FastAPI, Uvicorn |
| 프론트엔드 | HTML, JavaScript |
| LLM | Google Gemini (`langchain-google-genai`, temperature 0.3) |
| 임베딩 | HuggingFace `jhgan/ko-sroberta-multitask` (로컬 실행, 벡터 정규화 사용) |
| 벡터 DB | Chroma (`langchain-chroma`) |
| RAG 프레임워크 | LangChain |
| 데이터 저장 | JSON 파일 (DB 미사용) |

## 실행 방법

### 1. 사전 준비
- Python 3.12 (`backend/.python-version` 참고)
- Google AI Studio에서 발급한 Gemini API 키

### 2. 설치
```bash
cd backend
pip install -r requirements.txt
```

### 3. 환경변수 설정
`backend/service/` 폴더에 `.env` 파일을 만들고 API 키를 입력합니다.
```
GOOGLE_API_KEY=여기에_본인_API_키
```

### 4. 백엔드 실행
**반드시 `backend` 폴더에서 실행하세요.** (JSON, 벡터 DB 경로가 상대경로입니다)
```bash
uvicorn main:a --reload --port 8000
```
- API 문서: http://127.0.0.1:8000/docs
- **첫 실행 시 벡터 DB(`backend/chroma_db/`)가 자동으로 생성**됩니다. 이때 임베딩 모델을 내려받기 때문에 시간이 걸리고 인터넷 연결이 필요합니다.

### 5. 프론트엔드 실행
```bash
cd frontend
python -m http.server 5500
```
- http://127.0.0.1:5500 접속

### 6. 챗봇 테스트
```bash
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "매콤한 음식 추천해줘"}'
```

## API 목록

| Method | 경로 | 설명 |
|---|---|---|
| GET | `/` | 서버 확인 |
| GET | `/menus` | 전체 메뉴 조회 |
| GET | `/menus/search?word=` | 이름으로 검색 |
| GET | `/menus/{id}` | 메뉴 1개 조회 |
| POST | `/menus` | 메뉴 등록 |
| PUT | `/menus` | 메뉴 수정 |
| DELETE | `/menus/{menu_id}` | 메뉴 삭제 |
| POST | `/menus/recommend/{id}` | 추천 수 증가 |
| POST | `/chat` | RAG 추천 챗봇 (`{"question": "..."}`) |

## 프로젝트 구조

```
.
├── backend/
│   ├── main.py                  # FastAPI 앱, API 라우트
│   ├── requirements.txt
│   ├── service/
│   │   ├── data.py              # 메뉴 데이터 처리 (JSON 읽기/쓰기)
│   │   └── rag_menus.py         # RAG 서비스 (임베딩, 벡터 DB, 체인)
│   ├── storage/
│   │   └── menus_recommendation.json   # 메뉴 데이터
│   ├── chroma_db/               # 벡터 DB (자동 생성, git 제외)
│   └── testcode/                # 개발/실습용 노트북
├── frontend/
│   ├── index.html
│   └── js/data_api.js           # 백엔드 API 호출
└── README.md
```

## 배운 점
- RAG는 **검색 → 증강 → 생성** 순서이며, 벡터 DB를 구축할 때와 조회할 때 **임베딩 모델이 같아야** 한다.
- 임베딩 벡터를 **정규화**하면 길이 차이가 사라져 방향(의미)만 비교할 수 있다.
- `persist_directory`로 벡터 DB를 디스크에 저장하면 재임베딩 없이 다시 불러올 수 있다.
- 검색된 `Document`는 본문(`page_content`)을 하나의 문자열 `context`로 합쳐 프롬프트에 넣는다.
- 노트북으로 실험하고, 실제 서비스는 `.py` 파일로 분리했다.
