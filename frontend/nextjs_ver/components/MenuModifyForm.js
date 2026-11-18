"use client"

import { useState } from "react"
import { updateMenu } from "@/service/api"
import { useRouter } from "next/navigation"

export default function MenuModifyForm({data}) {
    const [name, setName] = useState(data.name)
    const [calories, setCalories] = useState(data.calories)
    const [description, setDescription] = useState(data.description)
    const router = useRouter();

    // submit 이벤트 처리하는 핸들러
    async function handleSubmit(e) {
        e.preventDefault();     // 모든 이벤트 핸들로는 react에서 이렇게 처리..
                                // submit 이벤트를 form 내용을 제출하는 다음 순서
        // 수정할 데이터를 수집
        const menuObject = {
            id:data.id,     //중요한 이유는 수정할 데이터의 아이디를 넘겨줘야 다른 정보가 수정이 안됨
            name: name,
            calories:Number(calories),
            description:description
        }
        try {
            await updateMenu(menuObject)
            alert('메뉴가 수정 됨')
            router.replace("/menus")
        } catch(error) {
            console.error(error)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>메뉴이름: 
                <input
                 id="name"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}/></div>
                 {/* 리액트는 화면을 만들면 부분 수정 불가 > immutable
                     변경하려면 훅을 써야 함 .. 그래서 onChange 이벤트 핸들러처리 
                 */}

            <div>칼로리:
                 <input
                  id="calorise"
                  value={calories}
                  onChange={(e)=>setCalories(e.target.value)}/></div>
            <div>설명:
                 <input
                  id="description"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}/></div>
            {/* 버튼 타입이 submit일 경우 버튼이 클릭되면 onSubmit 이벤트가 발생되고
                지정된 함수콜 */}
            <button type="submit">수정</button>
        </form>
    )
}