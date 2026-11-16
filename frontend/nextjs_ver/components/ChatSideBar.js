"use client";   // next.js에게 이 파일은 브라우저에서 동작하는 컴포넌트로 만들겠다는 선언

export default function ChatSideBar() {
    return (
        <aside className="chat-sidebar">
            <h2>AI 메뉴 도우미</h2>
            <div className="chat-messages">
            </div>
            <div className="chat-input-area">
                <textarea />
                <button>
                    전송
                </button>
            </div>
        </aside>
    )
}