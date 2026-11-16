"use client"
import {useState} from "react";

// 훅이란? React 컴포넌트 안에서 특정한 기술을 수행하는 함수
// 종류가 좀 있는데
// 이 lecture에서는 훅 중의 하나인 useState를 다룬다
// useState는 값을 관리한다

export default function App02() {
        // name: 변수명 // setName: setter = useState(초기값)
        // 변수명은 실제 컴포넌트에서 사용할 변수명
        // react에서는 name이라는 변수명의 값을 변경하기 위해 대입연산자 사용하지 않는다
        // 오직 setter를 통해서 값을 변경할 수 있음.. 훅이라는 useState가 상태를 감지하고
        // 값의 내용이 바뀌면.. 자동으로 화면을 갱신 시켜줌
        // js는 값의 내용이 바뀌면 innerHtml or innerText or append 이런것으로
        // 값을 개발자가 직접 바꿨다면
        // 리액트는 훅이라는 것을 두어서 상태를 감지하고 상태가 바뀌면 자동으로 화면을 갱신한다
        // 그래서 아래처럼 코드를 작성한다.

        // 훅(훅 중에 useState)에서 변수의 값이 바뀌면 가상의 돔을 새로 그리고
        // 바로 원래 화면과 바꿔치기 한다.
    const [name, setName] = useState("홍길동");
    return(
        <div>
            <h4>lecture 002 useState Hook(훅)이란?</h4>
            <h4>{name}</h4>
            <button onClick={()=>setName("일지매")}>이름 변경</button>
            {/* 여기 코드보면 엘리먼트는 선택하고.. 바꾸는 코드가 전혀 없다..
                오로지 useState 훅을 사용하여 변수를 설정하고 setter 지정했다.
            */}
        </div>
    )
}