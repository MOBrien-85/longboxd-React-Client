import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createReview, getReviewsById, updateReviewObj } from '../../managers/ReviewManager'
import { getComics } from "../../managers/ComicManager.js"
import { Rating } from 'react-simple-star-rating'


export const ReviewForm = () => {
    let { reviewId } = useParams()
    const navigate = useNavigate()
    const [comic, setComic] = useState([])

    const [currentReview, setCurrentReview] = useState({
        review: "",
        rating: 0,
        issueId: 0,
    })

    const handleRating = (rate: number) => {
        setCurrentReview(rate)
    }

    useEffect(() => {
        getComics().then(data => setComic(data))
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
            <h2 className="comic_title">{comic.name}</h2>
            <h3 className="reviewForm__title">Write a Review</h3>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">My Review</label>
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
                            className="rating"
                            onClick={handleRating}
                            initialValue= {0}
                            iconsCount= {5}
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
                {reviewId != undefined ? <button id="submit_updated_review"
                    onClick={evt => {
                        evt.preventDefault()
                        const review = {
                            id: currentReview.id,
                            description: currentReview.review,
                            rating: currentReview.rating,
                            favorite: currentReview.favorite,
                            issue: parseInt(currentReview.issueId)
                        }
                        updateReviewObj(review)
                            .then(() => navigate("/profile/:collectorId"))
                    }}>Update Review</button>
                    :

                    <button type="submit" id="submit_new_review"
                        onClick={evt => {
                            evt.preventDefault()

                            const review = {
                                description: currentReview.review,
                                rating: currentReview.rating,
                                favorite: currentReview.favorite,
                                issue: parseInt(currentReview.issueId)
                            }

                            createReview(review)
                                .then(() => navigate("/profile/:collectorId"))
                        }}
                        className="btn btn-primary">Save</button>}
                <div className="abortReview_button_container">
                    <button id="abort_review" onClick={() => navigate("/comics/:issueId")}>
                        Back to Comic
                    </button>
                </div>
            </div>
        </form>
    )
}