"use client";
import { useState } from "react";

export default function TestUseState() {
    // let menu = "김치찌개";
    const [menu, setMenu] = useState('김치찌개')
    const [inputName, setInputName] = useState('')
    function handleChangeMenu(e) {  // html 태그가 동작하면 모두다 이벤트 인식
                                    // 이 함수를 콜한 태그가 어떤 태그 인가를 넘겨 받는다
        e.preventDefault();         // 태그는 화면을 새로고침하는 성격이 있어서 진행하지마
                                    // 화면의 새로고침을 방지하는 코드
        // const input = document.getElementById('menu_input').value;
        // menu = input;    직접 화면 바꾸는게 안됨
        setMenu(inputName);     // 훅에게 값 바꿔 달라고 하기.. 훅이 값의 변경을 인지하고
                                // 새로운 컴포넌트가 만들어져서 이전것은 버리고 새것으로 교체 된다
    }

    return (
        <div>
            <h4>useState 예제들</h4>
            {/* 음식 메뉴 하나를 저장하는 상태를 추가하는 예 */}
            <h4>현재 메뉴 : {menu} </h4>
            <input type="text" id="menu_input" 
                   value={inputName}
                   onChange={(e) => setInputName(e.target.value)}
            />
            <button onClick={handleChangeMenu}>메뉴 변경</button>
        </div>
    )
}