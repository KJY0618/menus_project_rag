"use client";
import { useState } from "react";

export default function TestFive() {
    const menu = ['김치찌개', '불고기', '비빔밥'];
    const [menus, setMenus] = useState(menu);
    const [newMenu, setNewMenu] = useState('');

    function addMenu(e){
        e.preventDefault();
        const menuAdd = newMenu.trim();
        if(!menuAdd) {
            return;
        }

        // 기존 메뉴에 추가
        setMenus([...menus, menuAdd]);     // 새로운 배열을 만들어서 추가한다.
        // 입력한 곳 초기화
        setNewMenu('');
    }
    return (
        <div>
            <h4>use state 리스트로 살펴보기</h4>
            {menus.map((menu, idx) =>(
                <li key={idx}>{menu}</li>   
                                            // 리액트에서는 부모와 자식간의 관계를 가상돔에서 인식
                                            // 그래서 반복으로 출력할 경우 자식을 구분하기 위해 key 지정
            ))}
            <input type="text"
                   value={newMenu}
                   onChange={(e)=>{setNewMenu(e.target.value)}} />
            <button onClick={addMenu}>메뉴 추가</button>
        </div>
    )
}