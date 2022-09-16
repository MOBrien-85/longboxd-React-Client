export const getCreators = () => {
    return fetch("http://localhost:8000/creators", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
        .then(response => response.json())
}

// get comic by ID
export const getComicById = (id) => {
    return fetch(`http://localhost:8000/creators/${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('lb_token')}`
        }
    })
        .then(res => res.json())
}