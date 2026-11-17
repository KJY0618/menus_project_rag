
const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// 전체 메뉴 조회
export async function getAllMenus() {
    try {
        const response = await fetch(`${API_SERVER}/menus`);
        if (!response.ok) {
            throw new Error(`메뉴 조회 실패: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("전체 메뉴 조회 오류:", error);
        throw error;
    }
}


// 메뉴 검색
export async function searchMenus(keyword) {
    try {
        const params = new URLSearchParams({ word: keyword });
        const response = await fetch(`${API_SERVER}/menus/search?${params}`);

        if (!response.ok) {
            throw new Error(`메뉴 검색 실패: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error("메뉴 검색 오류:", error);
        throw error;
    }
}


// 메뉴 한 건 조회
export async function getMenuOne(id) {
    try {
        const response = await fetch(`${API_SERVER}/menus/${id}`);

        if (!response.ok) {
            throw new Error(`메뉴 조회 실패: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error("메뉴 상세 조회 오류:", error);
        throw error;
    }
}


// 메뉴 등록
export async function addMenu(menuObject) {
    try {
        const response = await fetch(`${API_SERVER}/menus`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menuObject)
        });

        if (!response.ok) {
            throw new Error(`메뉴 등록 실패: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error("메뉴 등록 오류:", error);
        throw error;
    }
}


// 메뉴 수정
export async function updateMenu(menuObject) {
    try {
        const response = await fetch(`${API_SERVER}/menus`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menuObject)
        });

        if (!response.ok) {
            throw new Error(`메뉴 수정 실패: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error("메뉴 수정 오류:", error);
        throw error;
    }
}


// 메뉴 삭제
export async function deleteMenu(id) {
    try {
        const response = await fetch(`${API_SERVER}/menus/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`메뉴 삭제 실패: ${response.status}`);
        }

        if (response.status === 204) {
            return null;
        }

        return response.json();

    } catch (error) {
        console.error("메뉴 삭제 오류:", error);
        throw error;
    }
}


// 메뉴 추천
export async function recommendMenu(id) {
    try {
        const response = await fetch(`${API_SERVER}/menus/recommend/${id}`, {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error(`메뉴 추천 실패: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error("메뉴 추천 오류:", error);
        throw error;
    }
}


// AI 채팅
export async function sendChat(question) {
    try {
        const response = await fetch(`${API_SERVER}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error(`AI 채팅 요청 실패: ${response.status}`);
        }

        return response.json();

    } catch (error) {
        console.error("AI 채팅 오류:", error);
        throw error;
    }
}



// // 공통 API 요청 함수
// async function request(url, options = {}) {
//     const response = await fetch(`${API_SERVER}${url}`, options);

//     if (!response.ok) {
//         throw new Error(`서버 요청 실패: ${response.status}`);
//     }
//     // DELETE 요청에서 응답 본문이 없는 경우
//     if (response.status === 204) {
//         return null;
//     }
//     return response.json();
// }

// // 전체 메뉴 조회
// export async function getAllMenus() {
//     return request("/menus");
// }

// // 메뉴 검색
// export async function searchMenus(keyword) {
//     const params = new URLSearchParams({ word: keyword });
//     return request(`/menus/search?${params}`);
// }

// // 메뉴 한 건 조회
// export async function getMenuOne(id) {
//     return request(`/menus/${id}`);
// }

// // 메뉴 등록
// export async function addMenu(menuObject) {
//     return request("/menus", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(menuObject)
//     });
// }

// // 메뉴 수정
// export async function updateMenu(menuObject) {
//     return request("/menus", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(menuObject)
//     });
// }

// // 메뉴 삭제
// export async function deleteMenu(id) {
//     return request(`/menus/${id}`, {
//         method: "DELETE"
//     });
// }

// // 메뉴 추천
// export async function recommendMenu(id) {
//     return request(`/menus/recommend/${id}`, {
//         method: "POST"
//     });
// }

// // AI 채팅
// export async function sendChat(question) {
//     return request("/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question })
//     });
// }
