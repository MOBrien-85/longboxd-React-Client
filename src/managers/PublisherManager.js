// listing publishers -- manager

export const getPublishers = () => {
    return fetch("http://localhost:8000/publishers", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
        .then(response => response.json())
}

// get comic by ID
export const getPublisherById = (id) => {
    return fetch(`http://localhost:8000/publishers/${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('lb_token')}`
        }
    })
        .then(res => res.json())
}