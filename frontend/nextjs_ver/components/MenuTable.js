export default function MenuTable(props) {
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
                {/* map은 메뉴 배열을 표의 행들로 바꿉니다. 각 행에는 고유한 key가 필요합니다. */}
                {props.items.map((menu) => (
                    <tr key={menu.id}>
                        <td>{menu.id}</td>
                        <td>{menu.name}</td>
                        <td>{menu.calories} kcal</td>
                        <td>{menu.description}</td>
                        <td>{menu.recommendation ?? 0}</td>
                        <td>수정 삭제</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}