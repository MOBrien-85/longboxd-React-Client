export const getReviews = () => {
    return fetch("http://localhost:8000/reviews", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
        .then(response => response.json())
}

export const getReviewsById = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
        .then(res => res.json())
}

export const getReviewsByUser = (comic) => {
    return fetch(`http://localhost:8000/reviews/get_review_for_comic`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${localStorage.getItem('lb_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comic)
    })
        .then(res => res.json())
}

export const createReview = (review) => {
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
}

export const updateReviewObj = (review) => {
    return fetch(`http://localhost:8000/reviews/${review.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        },
        body: JSON.stringify(review)
    })
}

export const deleteReview = (reviewId) => {
    return fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lb_token")}`
        }
    })
}

