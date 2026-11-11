//내가 만든 서버로 부터 데이터를 가져온다
//요청 http://127.0.0.1:8000/menus
//서버에게 모든 메뉴다 주세요..
// 이것을 수정에 이용한다면? 서버는 모든 정보를 줄 것이고, 클라이언트는 다시 찾아야 한다..
// 서버나 클라이언트 모두에게 좋은 방법은 아니죠..
API_SERVER = "https://menus-project-back-5kz6.onrender.com"
//API_SERVER = "http://127.0.0.1:8000"


async function getAllMenus() {
  try {
    const url = `${API_SERVER}/menus`;
    //const re = await fetch(url)
    const re = await fetch(url, { method: "get" });
    //method :  get방식
    console.log('불러오기 성공');

    if (!re.ok) throw new Error("전체메뉴불러오지못함")
    return re.json()  // 서버로 부터 받은 데이터..
  } catch (error) {
    console.error(error)
    return []
  }
}

//서버로 부터 검색한 결과를 달라고 하자.. 새로 추가
//서버에게 검색어를 넘기고. 서버는 검색어로 검색한 결과를 리터 원하는 것
//아래 코드에서 re라는 변수 어떤 것을 저장할까요? 검색한 결과를 저장..
// 서버에게 요청하려면 ?    무엇을 요청할것인가? 어떤방식으로? 값을 넘길것인가?
// 검색어에 따라 리턴받은 데이터는 여러개일 수 있다.. 수정은 오직 한 개만 받아야 한다.
async function searchMenus(keyword) {
  try {
    const url = `${API_SERVER}/menus/search?word=${keyword}`;
    const re = await fetch(
      url,
      {
        method: "get"
      }
    );
    if (!re.ok) throw new Error("전체메뉴불러오지못함")
    return re.json()
  } catch (error) {

  }

}

// 서버에게 메류를 저장해 달라고 요청... 
// 요청명: /menus        방법:  create작업  post       넘길값(menuObject):  키보드로 입력받아서 저장한 객체
async function addMenu(menuObject) {
  try {
    const url = '${API_SERVER}/menus';
    const re = await fetch(
      url,
      {
        method: "POST",   // get 방식은  url 뒤에 붙히지만 post 방식은 문서의  body에 저장해서 보낸다.
        //그래서 아래의 headers 작업과 body 작업이 필요하다.
        headers: { "Content-Type": "application/json" },  //html  헤더의 문서의 종류가   json 이다
        body: JSON.stringify(menuObject)   //html의 body영역에 넣은 값
      }
    )
    if (!re.ok) throw new Error("메뉴 등록에 실패함")
    //return re.json()    메뉴 추가 서비스는 호출위치로 리턴이 필수가 아니다.
    return re.json()   //필수는 아니지만 일반적으로 리턴을 하기도 합니다. 
  } catch (error) {
    console.log(error);
    alert("메뉴 등록 중 오류가 발생함")
  }

}

// 서버에게 메뉴를 삭제해 달라고 요청
// 요청명: /menus/id값    메서드:  DELETE     넘길값 : id 값 필요 (path  파라미터 방식.. 쿼리로 보내도 됩니다.)
async function deleteMenu(menuId) {
  try {
    // 클라이언트가 서버에게 데이터를 보내는 방식 
    // 1. 쿼리파라미터 방식  : url 뒤에 붙여서 보낸다.
    // ..  const url = "http://127.0.0.1:8000/menus?menuId="+menuId;  # ? 뒤에가 변수를 붙힌것이고

    // 2. path 파라미터방식 : url 경로에 포함해서 보냅니다.
    const url = `${API_SERVER}/menus/${menuId}`  // 변수명 없이 그냥 값만 붙힌다..  path 파리미터방식

    // 3. request body : html문서의  body 숨겨서 보낸다. addMenu() 함수에서  post  보내는 방식

    //위와 같은 방법으로 상관없지만..
    const re = await fetch(
      url,
      {
        method: "DELETE"
      }
    )
    if (!re.ok) throw new Error("메뉴 삭제에 실패함")
    //return re.json()    메뉴 추가 서비스는 호출위치로 리턴이 필수가 아니다.
    return re.json()   //필수는 아니지만 일반적으로 리턴을 하기도 합니다. 
  } catch (error) {
    console.log(error);
    alert("메뉴 삭제 중 오류가 발생함")
  }
}

// 고민.. 팀하고 고민.. 어떻게 설계를 해야 하나?
// 설계기준 팁 요청이 뭐야?   메서드가 뭐야?     파라미터(넘길 데이터)가 있어?
// 수정은 바로 수정하는 것이 아닙니다. 수정할 글을 먼저 가져와서 수정할 글을 보여주고
// 그 다음에 수정하도록 하고,, 수정버튼을 누르면 실제 데이터가 수정이 된다.. 
// 예) 삭제는 삭제할 번호를 부면 바로 데이터가 삭제되면 됩니다. 수정과 다르다..
// 수정할 데이터를 가져오는 기능 추가, id값을 서버에게 보내서 서버가 한 개만 가져다 주는 코드
async function getMenuOne(id) {
  try {
    const url = `${API_SERVER}/menus/${id}`  
    const re = await fetch(
      url,
      {
        method: "get"
      }
    )
    if (!re.ok) throw new Error("글을 가져오지 못했어요")
    return re.json()   //필수는 아니지만 일반적으로 리턴을 하기도 합니다. 
  } catch (error) {
    console.log(error);
    alert("글을 가져오는 중에 에러가 발샘 함.")
  }
}

// 실제로 클라이언트에서 수정된 글을 서버에게 수정을 요청
async function updateMenu(menuObject) {
  try {
    const url = `${API_SERVER}/menus`;
    const re = await fetch(
      url,
      {
        method: "PUT",  
        headers: { "Content-Type": "application/json" },  //html  헤더의 문서의 종류가   json 이다
        body: JSON.stringify(menuObject)   //html의 body영역에 넣은 값
      }
    )
    if (!re.ok) throw new Error("메뉴 수정에 실패함")
    //return re.json()    메뉴 추가 서비스는 호출위치로 리턴이 필수가 아니다.
    return re.json()   //필수는 아니지만 일반적으로 리턴을 하기도 합니다. 
  } catch (error) {
    console.log(error);
    alert("메뉴 수정 중 오류가 발생함")
  }

}

// 추천서비스
async function recommendMenu(id) {
  console.log('aaaa')
  try{
    const url = `${API_SERVER}/menus/recommend/${id}`
    const re = await fetch(
      url,
      {
        method:"POST"
      }
    )
    if(!re.ok) throw new Error("추천을 하지 못함")
    return re.json()
  } catch (error){
    console.log(error)
  }
}