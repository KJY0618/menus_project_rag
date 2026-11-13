## 역할 : 클라이언트로 부터 요청이 오면 요청을 받고 응답해 주는 역할..

from fastapi import FastAPI
from service import data, rag_menus, rag_menus_meta
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# from pydantic import Field

a = FastAPI()


# CORS정책...
# 파이썬 서버가.. 서버를 서비스 할 때 누구나 제공하겠다 하면  * 로 허용
# 서비스를 서비스 할 때.. 허용한 사람에게만 하겠다.. origins 등으로 설정
# 기준은 서비스를 허용할 범위...
a.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #오리진과 내 서버의 주소가 달라도 즉 출저가 달라도 허용할께
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 로비로 들어오는 서비스를 하나 제공하자.
@a.get("/")     # 첫 화면
def home():
    print("클라이언트가 /를 요청하였습니다.")
    return {
        "message":"환영합니다."
    }

@a.get("/menus")  #서비스 이름(요청): /menus   방법 get (조회 의도가 있다.)
def menus():
    return data.get_all()  
    # data객체의 get_all함수에게 자료를 조회해 달라고 요청
    # 그 요청에 대한 응답을 받아서 클라이언트에 응답을 함.
    # 응답 타입이 리스트이다.. 그리고 그 리스트에는 딕셔너리 타입  > json으로 응답

@a.get("/menus/search")
def menus_search(word:str =""):
    print('menus_search 진입함')
    return data.search_Word(word)


## 클라이언트가 보낸 객체를 파이썬은 객체 구조를 이해 못한다.
## BaseModel은  Menu 객체의 변수에 값을 저장할 때. 타입이 맞는지 검사하는 도구
## id변수에는 정수, name 문자열 ...
class Menu(BaseModel):
    id:int
    name:str
    calories : int
    description : str

# class Menu(BaseModel):
#     id: int
#     name: str = Field(min_length=6, max_length=20)
#     calories: int = Field(ge=0)
#     description: str


@a.post("/menus")
def add_menus(menuObject:Menu):   ## menuObject는 변수명 , Menu 타입 : 위에서 정의한 클래스
    ## Menu 라는 객체는 4개의 변수를 가지고 있고, 클라이언트가 보낸 객체의 정보를 
    ## 자동으로   menuObject  로 만들어 준다. 이때 BaseModel 로  Menu클래스를 정의해서.. 타입을 체크해 줍니다.
    ## 이렇게 되면 클라이언트로 받은 데이터로 만든  menuObject의 값에 대한 신뢰성이 높아진다.
    # 받은 객체를 배열에 추가하는 작업필요

    print('받은데이터 확인',menuObject)
    data.add_menu(menuObject)
    return {
        "message":"ok"
    }

# 클라이언트가 보낸 방식 http://127.0.0.1:8000/menus/${menuId}   #클라이언트가 보낸  data가 ${menuId}
# 클라이어트가 /요청/데이터  이런 형식으로 보내서 다음과 같이 작성해야 한다.
@a.delete("/menus/{menu_id}")
def delete_menu(menu_id : int):
    #data.py 파일에게 삭제해 달라고 요청
    result = data.delete_menu(menu_id)
    if(result is None):
         return{
                "message":"삭제된거 없어요"
         }
    
    return{
           "message":"삭제했습니다."
    }

# 글 수정 요청이 아니라.. id로 글 정보 조회..
@a.get("/menus/{id}")
def getOne_menu(id : int):
    print(id, '메뉴의 데이터를 요청함')  #로그 남긴다. 디버깅이나 역추적
    result = data.get_one(id)
    if(result is None):
        return {
            "message":"no"
        }
    return result

# 데이터 글 갱신

@a.put("/menus")
def update_menu(menudata:Menu):
    # 로그남기기 팁 실제 현업에는 print남기지 않아요.. 자원이슈로..
    print(menudata.id, ' 데이터 글 수정을 요청함')
    data.update_one(menudata)
    return {
        "message":"ok"
    }

@a.post("/menus/recommend/{id}")
def update_recommend(id:int):
    
    data.update_recommend(id)
    return{
        "message":"ok"
    }

# 클라이언트가 채팅을 요청하면 응답해 주는 서비스 개발 예정
class ChatRequest(BaseModel):
    question:str

@a.post("/chat")
def chatting(chatRequest: ChatRequest):
    # print(chatRequest.question)
    # RAG 기본 기능
    # results = rag_menus.rag_menus_service(chatRequest.question)

    # RAG 기능 업그레이드 (메타데이터 기능 추가)
    results = rag_menus_meta.rag_process(chatRequest.question)
    return {
        "answer": results
    }
    