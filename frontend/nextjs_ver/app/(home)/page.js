"use client"
import { useState, useEffect } from "react";
import { getAllMenus } from "@/service/api";


 export default function Home() {
  // 서버와 통신해서 메뉴 3개를 가져와야 한다.
  // 서버 통신은 일단 보류하고
  // useState를 사용하여  임시 메뉴 3개를 출력
  // 메뉴 데이터를 배열로 직접 선언합니다.

  // 메뉴 배열을 State로 관리합니다.
  const [menus, setMenus] = useState([]);

  // 1. 서버로부터 데이터를 가져와야함
  // 2. 가져온 배열에서 랜덤하게 정렬해서 앞에서 3개를 가져와야함

  // 포인트 : menus.map이 동작 하기 전에 미리 3개가 선정 되는 작업이 필요
  // 훅중에 이런 훅이 있다.. 먼저 동작시켜 주겠다.. useEffect
  // useEffect는 서버에서 데이터를 가져와 주는 등 특정 상황에서 작업을 실행..
  // 특정상황을 서버에서 가져오고... 랜덤하게 정렬해서 3개를 선정하는 것으로 정의
  useEffect(() => { // 람다식 작성할 때 {} () 괄호가 없는 경우.. 구분해서 봐야한다..
    // 1. 서버로 데이터를 가져온다
    // setMenus(menuData)
    // const shuffled = [...menus].sort(()=> 0.5 - Math.random()).slice(0,3);
    async function loadMenus() {
      try {
        const data = await getAllMenus();
        const shuffled = [...data].sort(()=> 0.5 - Math.random()).slice(0,3)
        setMenus(shuffled)
      } catch(error) {
        console.error(error);
      }
    }
    loadMenus();
  }, [])  // [] 표시는 컴포넌트가 처음 화면에 나타난 후 실행.. 중요한 점 화면에 나타난 후
          // 화면에 나타날 때마다 실행된다는 의미
          // 리턴에서 정의한 컴포넌트가 화면에 나타날때마다.. 이 훅이 코드를 실행해 준다
          // 이 훅은 서버로부터 데이터를 가져오고 랜덤하게 3개를 뽑아서 준다..
  /*
  제목 : useEffect 사용하는 방법 3가지

  1번째 - 랜더링 된 후 실행 - 잘 안씀
    useEffect(() => { // 람다식 작성할 때 {} () 괄호가 없는 경우.. 구분해서 봐야한다..
    // 1. 서버로 데이터를 가져온다
    // setMenus(menuData)
    const shuffled = [...menus].sort(()=> 0.5 - Math.random()).slice(0,3);
    setMenus(shuffled)
})

  2번쨰 - 화면에 나타날때.. 컴포넌트가 화면에 보여질 때 딱 한번 실행
    useEffect(() => { // 람다식 작성할 때 {} () 괄호가 없는 경우.. 구분해서 봐야한다..
    // 1. 서버로 데이터를 가져온다
    // setMenus(menuData)
    const shuffled = [...menus].sort(()=> 0.5 - Math.random()).slice(0,3);
    setMenus(shuffled)
  }, [])

  3번째 - 화면에 나타나고 변수의 상태(useState)가 변경 될 때
       - 2번째 동작 + [menus] 이 변수의 값이 바뀌면 자동으로 동작을 합니다.
    useEffect(() => { // 람다식 작성할 때 {} () 괄호가 없는 경우.. 구분해서 봐야한다..
    // 1. 서버로 데이터를 가져온다
    // setMenus(menuData)
    const shuffled = [...menus].sort(()=> 0.5 - Math.random()).slice(0,3);
    setMenus(shuffled)
  },[menus])
  */

  return (
    <section>
      <h2>오늘의 추천 메뉴</h2>
      <div className="recommend-list">
        {menus.map((menu) => (
          <div className="card" key={menu.id}>
            <h3>{menu.name}</h3>
            <p>{menu.calories}</p>
            <p>{menu.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
