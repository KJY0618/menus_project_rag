# RAG Service
# 노트북은 코드 작성하고 실행해서 바로 확인 가능.. 개발이나 테스트에 적합
# 실제 서비스는 py 파일로 작성한다 py 파일은 터미널에서 python 파일명으로 실행한다.
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
import json
import os
from langchain_core.documents import Document  
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda # 파이프라인 조립할때 필요한 객체
from langchain_core.output_parsers import StrOutputParser # LLM 응답시 문자열로 하라는 객체

load_dotenv()   #.env에 있는 구글 api 키를 자동으로 로딩
PATH_JSON = "./storage/menus_recommendation.json"
PATH_CHROMA = "./chroma_db/menus_db"

# 모델을 선정하고 파라미터 값을 설정할 수 있다.
llm = ChatGoogleGenerativeAI(model = "gemini-3.5-flash", 
                             temperature= 0.3,
                             max_output_tokens = 1024)

embeddings = HuggingFaceEmbeddings(
    model_name="jhgan/ko-sroberta-multitask",
    model_kwargs={"device": "cpu"},  # GPU 있으면 "cuda"
    encode_kwargs={"normalize_embeddings": True} # 벡터 비교에서 중요한 건 “방향”임
)

prompt = ChatPromptTemplate.from_template("""
[역할] 음식을 추천하고 설명하는 사장님이야.
[사용자질문] {query}
[참고정보] {context}
[규칙]
- 참고정보만 참고해서 답변을 만들 것. 새로운 음식 추가하지 않는다.
- 음식이름을 먼저 이야기하고 구매 가능하도록 설명한다.
- 설명은 2줄 이하로 한다
- 아주 친절한 모드로 응답한다.
""")
rag_chain = (
    # 첫번쨰 파이프 라인  
    {
        "query":lambda x : x['usequery'],
        "context": RunnableLambda(lambda x: format_docs(retrieval_docs(x['usequery'])))
        #RunnableLambda langChain을 통과하기 위한 객체
    } 
    |prompt # 두번째 파이프 라인
    |llm # 세번째 파이프 라인
    |StrOutputParser() # 네번째 파이프 라인
)

def loadJsonMakeVector():
    # json 데이터로드
    with open(PATH_JSON, "r", encoding="utf-8") as file:
        data = json.load(file)

    # Dcoument 생성
    docs = []  # document 문서를 저장할 배열
    for row in data:
        content = f"""
            이름 : {row['name']}
            설명 : {row['description']}
        """
        docmake = Document(
            page_content=content.strip()
        )
        docs.append(docmake)

    ## 벡터 데이터 생성   
    Chroma.from_documents(
        documents=docs,     ## 벡터 데이터 베이스를 구축할 정보
        embedding=embeddings,   ## docs의 문장을 해석하여 데이터베이스를 구축할 임베딩 객체
        persist_directory= PATH_CHROMA ## 데이터베이스 위치
    )

def loadVectorDB():
    # 데이터베이스를 로드하기 전에.. 데이터베이스가 없다면 데이터베이스를 생성하도록 하자
    if not os.path.exists(PATH_CHROMA):
        print('DB를 생성합니다')
        loadJsonMakeVector()

    print('DB를 로드합니다')
    vectorstore = Chroma(
    persist_directory = PATH_CHROMA,
    embedding_function = embeddings   # 주의할 점.. 벡터디비 구축 시 embedding 모델과
                                    # 읽어 올 때의 모델은 동일해야 한다
    )
    return vectorstore

## 거리가 짧은 데이터를 검색해 오는 함수 정의
def retrieval_docs(query, k=3):
    results = loadVectorDB().similarity_search(query, k=k)
    return results

## 보강 - 검색한 정보를 모델에 입력하기 위해 보강한다
def format_docs(docs):
    data = ''
    for doc_data in docs:
        data = data + "\n\n" + doc_data.page_content
    return data

## 질의를 받고 rag로 응답 문장을 만들어서 리턴하는 함수
def rag_menus_service(query):
    result = rag_chain.invoke({'usequery':query})
    return result



