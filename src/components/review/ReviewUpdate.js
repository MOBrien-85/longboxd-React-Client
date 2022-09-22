import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createReview, getReviewsById, updateReviewObj, deleteReview } from '../../managers/ReviewManager'
import { getComics } from "../../managers/ComicManager.js"
import { Rating } from 'react-simple-star-rating'
import { getSingleProfile } from "../../managers/ProfileManager"
import './Review.css'


export const ReviewUpdate = () => {
    let { comicId, reviewId } = useParams()

    const navigate = useNavigate()
    const [comic, setComic] = useState([])
    // current user
    let userId = localStorage.getItem('userId')
    const [profile, setProfile] = useState({})

    const [currentReview, setCurrentReview] = useState({
        review: "",
        rating: 0,
        issueId: 0,
    })

    const handleRating = (rate) => {
        const newReview = Object.assign({}, currentReview)
        newReview.rating = rate
        setCurrentReview(newReview)
    }

    useEffect(() => {
        getComics().then(data => setComic(data))
        getSingleProfile(userId).then(data => setProfile(data))
    }, [])

    useEffect(
        () => {
            if (reviewId != undefined) {
                getReviewsById(reviewId)
                    .then(res => setCurrentReview({
                        id: res.id,
                        review: res.review,
                        rating: res.rating,
                        issueId: res.issueId
                    }))
            } else {
                setCurrentReview({
                    review: "",
                    rating: 0,
                    issueId: 0
                })
            }
        },
        [reviewId]
    )

    const changeReviewState = (domEvent) => {
        const newReview = Object.assign({}, currentReview)
        newReview[domEvent.target.name] = domEvent.target.value
        setCurrentReview(newReview)
    }

    return (
        <form className="reviewForm">
            <div className="review_container">
            <h2 className="comic_title">{currentReview?.issue?.title}</h2>
            <h3 className="reviewForm__title">Update Review</h3>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">My Review:</label>
                    <input type="text" name="review" required autoFocus className="form-control"
                        value={currentReview.review}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="rating-label">
                        <strong>Rating:</strong>
                        <Rating
                            name="rating"
                            className="rating"
                            onClick={handleRating}
                            initialValue={currentReview.rating}
                            iconsCount={5}
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            allowHalfIcon
                            transition
                            value={currentReview.rating}
                            onChange={changeReviewState}
                        />
                    </label>
                </div>
            </fieldset>

            <div className="reviewForm__button_container">
                {comicId != undefined ? <button id="submit_updated_review"
                    onClick={evt => {
                        evt.preventDefault()
                        const review = {
                            id: currentReview.id,
                            description: currentReview.review,
                            rating: currentReview.rating,
                            favorite: currentReview.favorite,
                            issue: parseInt(comicId)
                        }
                        if (review.rating > 5) {
                            review.rating = review.rating / 20
                        }
                        updateReviewObj(review)
                            .then(() => navigate(`/collectors/${userId}`))
                    }}>Save Changes</button>
                    :

                    <button type="submit" id="submit_new_review"
                        onClick={evt => {
                            evt.preventDefault()

                            const review = {
                                description: currentReview.review,
                                rating: currentReview.rating / 20,
                                favorite: currentReview.favorite,
                                issue: parseInt(comicId)
                            }

                            createReview(review)
                                .then(() => navigate(`/collectors/${userId}`))
                        }}
                        className="btn btn-primary">Save</button>}
                <div className="abortReview_button_container">
                    <button id="abort_review" onClick={() => navigate(`/comics/${comicId}`)}>
                        Back to Comic
                    </button>
                    <button className="button" onClick={() => {
                        deleteReview(currentReview.id)
                            .then(setCurrentReview)
                            .then(navigate(`/comics/${comicId}`))
                    }}>Delete</button>
                </div>
            </div>
            </div>
        </form>
    )
}