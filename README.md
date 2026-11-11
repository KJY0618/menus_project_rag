# 음식 메뉴 관리 시스템

FastAPI 백엔드와 HTML·JavaScript 프런트엔드로 메뉴를 조회하고 관리하는 간단한 웹 애플리케이션입니다. 메뉴 데이터는 JSON 파일에 저장되며, 별도의 데이터베이스는 사용하지 않습니다.

## 주요 기능

- 메뉴 목록 조회 및 이름 검색
- 메뉴 등록, 상세 조회, 수정, 삭제
- 메뉴 추천 수 증가
- 홈 화면에 메뉴 3개를 무작위로 표시

## 프로젝트 구조

```text
backend/
  main.py                       # FastAPI 앱 및 API 라우트
  requirements.txt              # Python 의존성
  service/data.py               # 메뉴 데이터 처리 및 JSON 파일 입출력
  storage/
    menus_recommendation.json   # 현재 백엔드에서 사용하는 메뉴 데이터
    menus.json                  # 별도 메뉴 데이터 파일
  testcode/test.ipynb           # 실험용 Jupyter 노트북
frontend/
  index.html                    # 화면과 UI 동작
  js/data_api.js                # 백엔드 API 호출 함수
```

## 실행 방법

Python 3과 `pip`이 필요합니다. 백엔드와 프런트엔드를 각각 실행하세요.

### 1. 백엔드 실행

PowerShell에서 프로젝트 루트 기준으로:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:a --reload --host 127.0.0.1 --port 8000
```

백엔드 주소는 <http://127.0.0.1:8000>이며, API 문서는 <http://127.0.0.1:8000/docs>에서 확인할 수 있습니다. 서버 프로세스의 작업 디렉터리가 `backend`여야 JSON 데이터 파일을 찾을 수 있습니다.

### 2. 프런트엔드 실행

새 터미널에서 프로젝트 루트 기준으로:

```powershell
cd frontend
python -m http.server 5500
```

브라우저에서 <http://127.0.0.1:5500>을 엽니다. 프런트엔드는 `http://127.0.0.1:8000`의 API를 호출하도록 설정되어 있습니다. 각 서버를 종료하려면 해당 터미널에서 `Ctrl+C`를 누릅니다.

## API

| 메서드 | 경로 | 설명 |
|---|---|---|
| `GET` | `/` | 서버 환영 메시지 |
| `GET` | `/menus` | 전체 메뉴 조회 |
| `GET` | `/menus/search?word=검색어` | 이름에 검색어가 포함된 메뉴 조회 |
| `GET` | `/menus/{id}` | ID로 메뉴 한 건 조회 |
| `POST` | `/menus` | 메뉴 등록 |
| `PUT` | `/menus` | 메뉴 수정 |
| `DELETE` | `/menus/{menu_id}` | 메뉴 삭제 |
| `POST` | `/menus/recommend/{id}` | 메뉴 추천 수 증가 |

등록·수정 요청의 JSON 형식:

```json
{
  "id": 1,
  "name": "비빔밥",
  "calories": 550,
  "description": "밥에 나물과 고추장을 넣어 비벼 먹는 음식"
}
```

등록 시 ID는 서버가 새로 부여합니다. `id` 필드는 API 모델 검증 때문에 요청에도 포함해야 합니다.

## 데이터 및 참고 사항

- 백엔드는 시작할 때 `backend/storage/menus_recommendation.json`을 읽고, 등록·수정·삭제·추천 수 변경 결과를 같은 파일에 저장합니다.
- `backend/storage/menus.json`은 현재 백엔드 서비스에서 사용하지 않는 별도 데이터 파일입니다.
- 프런트엔드 검색은 메뉴 이름만 대상으로 합니다.
- 현재 새 메뉴를 저장할 때 추천 수(`recommendation`)를 초기화하지 않습니다. 따라서 신규 메뉴의 추천 수 표시에 문제가 생길 수 있습니다.
- CORS는 모든 출처를 허용하도록 설정되어 있어 로컬 개발용으로만 사용하는 것이 적절합니다.