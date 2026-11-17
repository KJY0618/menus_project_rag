"use client"
import MenuTable from "@/components/MenuTable";
import { getAllMenus } from "@/service/api"
import { useEffect, useState } from "react"

const PAGE_SIZE = 5;

export default function MenusList() {
    // 처음 컴포넌트가 실행되자 마자.. 서버로 부터 데이터 가져와야함
    // 컴포넌트가 화면에 보여질때 딱 한 번 실행 > useEffect
    // 서버로 부터 받은 리스트를 저장.. useState
    const [menus, setMenus] = useState([])
    const [page, setPage] = useState(1)
    const [keyword,setKeyword] = useState('')
    async function loadMenus() {
        try {
          const data = await getAllMenus();
          setMenus(data);
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        loadMenus();
    },[])

    // 검색어 필터링
    const search = keyword.trim().toLowerCase()
    const filtered = menus.filter((menu) => (
        (menu.name || "").toLowerCase().includes(search) ||
        (menu.description || "").toLowerCase().includes(search) 
    ))

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const start = (page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    function handleSearch(e) {
        setKeyword(e.target.value)
        setPage(1)
    }

    return (
        <div>
            <input type="text" value={keyword} onChange={handleSearch}/>
            {/* 메뉴 테이블 */}
             <MenuTable items={pageItems}/>
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
                이전
            </button>
            <span> {page} / {totalPages} </span>
            <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>
                다음
            </button>
        </div>
    )
}