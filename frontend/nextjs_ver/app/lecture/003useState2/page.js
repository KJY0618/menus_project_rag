"use client"
import {useState} from "react";

export default function App3() {
  // 서버와 통신해서 메뉴 3개를 가져와야 한다.
  // 서버 통신은 일단 보류하고
  // useState를 사용하여  임시 메뉴 3개를 출력
  const [names, setNames] = useState(["자장면", "짬뽕", "탕수육"]);
  return (
    <section>
      <h2>오늘의 메뉴 추천해요</h2>
      <ul>
        {names.map((name,idx) => {
          {/* map을 둘떄는 태그마다 유니크하게 지정해둬야한다.
            그래서 li 다음에 key라고 입력해야 한다. 리액트 특징임 */}
          
            return <li key={idx}>{idx + 1}번 메뉴:{name}</li>
        })}

         {/*소괄호를 사용하면 return 생략가능*/}
         {/* {names.map((name,idx) => (
           <li key={idx}>{idx + 1}번 메뉴:{name}</li>
        ))} */}
      </ul>
    </section>
  );
}