import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createReview, getReviewsByUser, updateReviewObj } from '../../managers/ReviewManager'
import { getComics } from "../../managers/ComicManager.js"
import { Rating } from 'react-simple-star-rating'
import { FiSave } from "react-icons/fi"
import { AiOutlineRollback } from "react-icons/ai"
import { getSingleProfile } from "../../managers/ProfileManager"
import './Review.css'

export const ReviewForm = () => {
    let { comicId } = useParams()
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
            if (comicId != undefined) {
                getReviewsByUser({ comic: comicId })
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
        [comicId]
    )

    const changeReviewState = (domEvent) => {
        const newReview = Object.assign({}, currentReview)
        newReview[domEvent.target.name] = domEvent.target.value
        setCurrentReview(newReview)
    }

    return (
        <form className="reviewForm">
            <div className="review_container">
                <h2 className="comic_title">{comic.name}</h2>


                <fieldset>
                    <div className="form-group">
                        <strong htmlFor="review">My Review</strong>
                        <input type="text" name="review" required autoFocus className="form-control"
                            placeholder="Write a Review..."
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
                                initialValue={0}
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
                        className="review-save-button"><FiSave title='Submit Review' /></button>


                    <button className="back-button" onClick={() => navigate(`/comics/${comicId}`)}>
                        <AiOutlineRollback title='Back to Comic' />
                    </button>

                </div>
            </div>
        </form>
    )
}