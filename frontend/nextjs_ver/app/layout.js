import "./globals.css";
// 컴포넌트 import
import Header from "@/components/Header"
import ChatSideBar from "@/components/ChatSideBar"


// 처음 화면의 grid를 어떻게 구상할 것인가?
// 매뉘을 Header, 채팅창을 ChatSideBar, 메인창 보류
// http://127.0.0.1:3000/ 맨 처음의 랜딩페이지가 page.js 파일
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <div className="app-layout">
          <ChatSideBar />
          <main> {/* 추천메뉴 들어갈 자리 */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
