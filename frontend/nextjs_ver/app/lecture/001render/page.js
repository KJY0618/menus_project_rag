import {Greeting} from "./Greeting"


// return 작성할때는 하나의 태그로 모두 감싸야한다. 태그를 열고 꼭 닫아야 함
// export : 외부의 파일에서 접근하게 해준다
// default : 001render 함수를 import한다면 기존으로 제공될 함수임을 명시
export default function App() {
    return (
        <main>
            <Greeting num={1} name="홍길동"/>
            <Greeting num={2} name="김길동"/>
            <Greeting num={3} name="정길동"/>
            <p>컴포넌트를 화면에 배치함.</p>
        </main>
    )
}