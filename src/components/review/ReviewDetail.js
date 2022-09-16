import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getReviewsById, deleteReview } from "../../managers/ReviewManager"
import { getSingleProfile } from "../../managers/ProfileManager"
import { Rating } from 'react-simple-star-rating'
import { getComicById } from "../../managers/ComicManager"

export const ReviewDetails = () => {
    const { reviewId, comicId } = useParams()
    const navigate = useNavigate()
    const [review, setReviewDetails] = useState([])
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    const [profile, setProfile] = useState({})
    const [comic, setComic] = useState([])

    useEffect(() => {
        getComicById(comicId).then(data => setComic(data))
        getReviewsById(reviewId).then(data => setReviewDetails(data))
        getSingleProfile(currentUserId).then(data => setProfile(data))
    }, [reviewId])

    return <><section className="review_display">
        <header className="review_header">Review by: {review?.user?.name}</header>

        <hr />

        <div className="review_content">{review.review}</div>

        <div className="rating">
            <div>Rating: {review.rating}</div>
        </div>
        <div className="button_container">
            <button id={review.id} onClick={
                (e) => navigate(`/reviewForm/${comic.id}`)
            }>Edit</button>
            <button className="button" onClick={() => {
                deleteReview(review.id)
                    .then(setReviewDetails)
            }}>Delete</button>
        </div>
    </section>
    </>



}