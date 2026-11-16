// 컴포넌트를 만드는 함수.. 재사용한다..
// 껍데기만 만들어 놓고 변수로 값을 달리해서 내용만 바꿔치기
// probs라는 기능으로 데이터를 넘기고 받는다.
export function Greeting(props) {
    // return 뒤에 있는 것을 컴포넌트로 암기
    // 컴포넌트가 뭐냐? 화면을 만들어 주는 것
    return <h1>{props.num}.안녕하세요. {props.name} 처음뵙겠습니다</h1>
}