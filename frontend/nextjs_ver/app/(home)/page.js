"use client"
import { useState } from "react";


export default function Home() {
  // 서버와 통신해서 메뉴 3개를 가져와야 한다.
  // 서버 통신은 일단 보류하고
  // useState를 사용하여  임시 메뉴 3개를 출력
  // 메뉴 데이터를 배열로 직접 선언합니다.
  const menuData = [
    {
      id: 1,
      name: "김치찌개",
      calories: 550,
      description: "얼큰하고 맛있는 돼지고기 김치찌개"
    },
    {
      id: 2,
      name: "불고기",
      calories: 650,
      description: "달콤한 양념으로 만든 소불고기"
    },
    {
      id: 3,
      name: "비빔밥",
      calories: 500,
      description: "다양한 채소와 고추장을 넣은 비빔밥"
    }
  ];

  // 메뉴 배열을 State로 관리합니다.
  const [menus, setMenus] = useState(menuData);
  return (
    <section>
      <h2>오늘의 추천 메뉴</h2>
      <div className="recommend-list"></div>
      {menus.map((menu)=> (
        <div className="card" key={menu.id}>
          <h3>{menu.name}</h3>
          <p>{menu.calories}</p>
          <p>{menu.description}</p>
        </div>
      ))}
    </section>
  );
}
