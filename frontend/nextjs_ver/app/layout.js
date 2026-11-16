import "./globals.css";
// 컴포넌트 import
import Header from "@/components/Header"
import ChatSideBar from "@/components/ChatSideBar"


// 처음 화면의 grid를 어떻게 구상할 것인가?
// 매뉘을 Header, 채팅창을 ChatSideBar, 메인창 보류
// http://127.0.0.1:3000/ 맨 처음의 랜딩페이지가 page.js 파일

// 1번쨰.. app 하위에 있는 layout은 모든 페이지에 적용되는 디자인
// 아래코드로 해석한다면
// 이말은 모든 페이지에는 Header와 왼쪽에 ChatSidebar가 있다는 의미
// 그리고 그 주소(url)마다 화면을 출력하는 page.js 파일이
// children으로 들어와서 화면을 완성한다..
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
