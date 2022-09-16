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
export const addComicToCollection = (comic) => {
    return fetch(`http://localhost:8000/comics/${comic.id}/add_comic_to_collection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Token ${localStorage.getItem('lb_token')}`
    }
  })
    .then(res => res.json())
}

// delete from collection
export const removeComicFromCollection = (comic) => {
    return fetch(`http://localhost:8000/comics/${comic.id}/remove_comic_from_collection`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('lb_token')}`
      }
    })
  }

// add comic to wishlist
export const addComicToWishlist = (comic) => {
    return fetch(`http://localhost:8000/comics/${comic.id}/add_comic_to_wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Token ${localStorage.getItem('lb_token')}`
    }
  })
    .then(res => res.json())
}

// delete from wishlist
export const removeComicFromWishlist = (comic) => {
    return fetch(`http://localhost:8000/comics/${comic.id}/remove_comic_from_wishlist`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem('lb_token')}`
      }
    })
  }
