"use client"
import MenuTable from "@/components/MenuTable";
import { getAllMenus } from "@/service/api"
import { useEffect, useState } from "react"

const PAGE_SIZE = 5;

export default function MenusList() {
    // 처음 컴포넌트가 실행되자 마자.. 서버로 부터 데이터 가져와야함
    // 컴포넌트가 화면에 보여질때 딱 한 번 실행 > useEffect
    // 서버로 부터 받은 리스트를 저장.. useState
    // menus를 훅에서 관리하면 훅이 menus 변수의 상태가 변화가 있을 때
    // js스크립트처럼 별도의 코드 없이 자동으로 화면에 적용시킴
    const [menus, setMenus] = useState([])      // 훅인데 변수의 값 등 상태 저장 관리
                                                // 변수의 값이 변경되면.. 자동으로 화면 갱신됨
    const [page, setPage] = useState(1)
    const [keyword,setKeyword] = useState('')

    // 일반 함수.. 역할 : 서버로부터 메뉴를 가져온다
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
    },[])   // MenuList에서 만든 컴포넌트가 화면에 나타날때 1번 실행

    // 컴포넌트 랜더링 순서.. 1. useState 변수를 실행. 변수 만들어짐
    //                     2. retrun에서 정의한 화면을 만듬
    //                     3. useEffect 실행된다.. 이때 loadMenus()콜하고 
    //                        loadMenus()함수에는 setMenus(data)가 있다 여기서 상태변화
    //                         그 후 화면이 다시 갱신
    
    // 검색어 필터링
    const search = keyword.trim().toLowerCase()
    const filtered = menus.filter((menu) => (
        (menu.name || "").toLowerCase().includes(search) ||
        (menu.description || "").toLowerCase().includes(search) 
    ))

    // 페이징네이션
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
             <MenuTable items={pageItems} onRefresh={loadMenus}/>
             
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