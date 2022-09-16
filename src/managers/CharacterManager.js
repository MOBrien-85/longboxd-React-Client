export const getCharacters = () => {
    return fetch("http://localhost:8000/characters", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
        .then(response => response.json())
}

// get comic by ID
export const getCharacterById = (id) => {
    return fetch(`http://localhost:8000/characters/${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('lb_token')}`
        }
    })
        .then(res => res.json())
}
