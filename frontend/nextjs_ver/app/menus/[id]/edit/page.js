"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { getMenuOne } from "@/service/api";
import MenuModifyForm from "@/components/MenuModifyForm";
export default function EditMenuPage() {
    // 이 페이지가 어떤 역할을 할 것 인가?
    // 역할 : 수정할 번호를 받아서.. 그 번호로 원본데이터를 서버에서 가져옴
    // 서버에서 가져온 데이터를 보여주고, 수정하도록 함
    // 수정 완료 버튼을 누르면 서버에게 파라메터를 주면서 갱신 요청
    // 수정할 글의 번호를 가져온다
    const {id} = useParams();   // URL 동적 경로 가져오기 즉 [id] 값 가져오기

    // 수정할 아이디로 서버에게 원본데이터를 받아서 저장할 변수 menu
    const[menu, setMenu] = useState(null);

    // 수정할 글을 가져온다
    // useEffect 서버와 통신 등 이럴 때 사용한다
    useEffect(()=> {
        async function loadMenu() {
            try {
                const data = await getMenuOne(id);
                setMenu(data)
                console.log("서버로부터 수정할 데이터 원본 가져옴")
            } catch(error) {
                console.error(error)
            }
        }
        loadMenu(); // 호출 필요
    },[id]) // id의 값이 변경 될 때마다 실행

    if(!menu) return <p>메뉴 정보를 불러오는 중입니다.</p>

    return (
        <section>
            <h2>메뉴 수정</h2>
                <MenuModifyForm data={menu}/>
        </section>
    )
}