"use client"
import { useState } from "react";
import { addMenu } from "@/service/api";
import { useRouter } from "next/navigation";
export default function MenuForm() {
    const router = useRouter()
    const [form, setForm] = useState({
        id: 0,
        name: "",
        calories: "",
        description: ""
    })
    function handleChange(e) {
            const name = e.target.name          // 어느 입력창인지
            const value = e.target.value        // 사용자가 입력한 글자
            
            const newForm = {... form}          // 현재 form 복사
            newForm[name] = value               // 입력창에 해당하는 칸만 새 값으로
            setForm(newForm)                    // 새 객체로 state 교체
        }
    
        async function handleSubmit(e) {
            e.preventDefault()
            try {
                await addMenu(form)
                alert(form.name + "메뉴가 등록되었습니다.")
                router.replace("/menus")
            } catch(error) {
                console.error(error)
            }
        }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>이름</label>
                <input
                 name="name"    // input에서 name이라는 속성에 name값 지정
                 value={form.name}  
                onChange={handleChange}
                 required
                 />
            </div>

            <div>
                <label>칼로리</label>
                <input
                 name="calories"
                 type="number"
                 value={form.calories} 
                 onChange={handleChange}
                 required
                 />
            </div>

            <div>
                <label>설명</label>
                <textarea
                 name="description"
                value={form.description}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit">
                메뉴 추가하기
            </button>
        </form>
    )
}