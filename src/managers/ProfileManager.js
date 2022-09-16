export const getProfiles = () => {
    return fetch("http://localhost:8000/collectors", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleProfile = (id) => {
    return fetch(`http://localhost:8000/collectors/${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('lb_token')}`
        }
    })
        .then(res => res.json())
}

export const editUserActive = (user) => {
    return fetch(`http://localhost:8000/collectors/${user.id}/user_active`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const editUserStatus = (user, status) => {
    return fetch(`http://localhost:8000/collectors/${user.id}/user_status`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ is_staff: status })
    })
}