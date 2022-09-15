// listing Comics -- manager

export const getComics = () => {
    return fetch("http://localhost:8000/comics", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
        .then(response => response.json())
}

// get comic by ID
export const getComicById = (id) => {
    return fetch(`http://localhost:8000/comics/${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('lb_token')}`
        }
    })
        .then(res => res.json())
}

// get comic by publisher ID

// get comics by creator ID

// add comic to collection

// delete from collection

// add comic to wishlist

// delete from wishlist

