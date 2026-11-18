// 메뉴를 별도의 컴포넌트로 분리
// 분리하는 목적은 1. 컴포넌트를 나누면 작은 조각으로 분리 재사용이 높아 질 수 있다
//               2. 부모와 자식간의 연계성을 공부하고자 합니다.. 부모는 menus/page.js가 되는 것이고
//               3. 자식은 별도로 만드는 컴포넌트가 되는 것
import { deleteMenu, recommendMenu } from "@/service/api";
import Link from "next/link";       // 링크 페이지 이동


export default function MenuTable(props) {

    // onclick onchange 이벤트 핸들러 처리..
    async function handleDelete(id) {
        if (!confirm(id + "삭제할까요?")) return;

        try {
            await deleteMenu(id)
            await props.onRefresh()
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRecommend(id) {
        if (!confirm(id + "추천할까요?")) return;

        try {
            await recommendMenu(id)
            await props.onRefresh()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>칼로리</th>
                    <th>설명</th>
                    <th>추천</th>
                    <th>관리</th>
                </tr>
            </thead>

            <tbody>
                {/* map은 메뉴 배열을 표의 행들로 바꿉니다. 각 행에는 고유한 key가 필요합니다.
                    추천은 api로 호출이동.. 중간에 확인 창 거침
                    삭제도 api로 호출... 중간에 확인창 거친다.
                    수정은 api를 호출하는 것이 아닌 수정 페이지 이동..(라우팅 Link)
                */}
                {props.items.map((menu) => (
                    <tr key={menu.id}>
                        <td>{menu.id}</td>
                        <td>{menu.name}</td>
                        <td>{menu.calories} kcal</td>
                        <td>{menu.description}</td>
                        <td>{menu.recommendation ?? 0}
                            <button onClick={() => handleRecommend(menu.id)}>추천</button>
                        </td>
                        <td>
                        {/* 동적 라우팅 경로상에 데이터가 추가되면서 라우팅의 경로가 절대적이지 않고 
                            값에 따라 바뀜 */}
                            <Link href={`/menus/${menu.id}/edit`}>수정</Link>
                            <button onClick={() => handleDelete(menu.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}