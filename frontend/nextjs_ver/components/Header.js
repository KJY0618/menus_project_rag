"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <h1>음식 메뉴 관리 시스템</h1>
            <nav>
                <Link href="/">홈</Link>
                <Link href="/menus">전체 메뉴</Link>
                <Link href="/menus/new">메뉴 등록</Link>
            </nav>
        </header>
    )
}