import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createReview, getReviewsByUser, updateReviewObj } from '../../managers/ReviewManager'
import { getComics } from "../../managers/ComicManager.js"
import { Rating } from 'react-simple-star-rating'
import { getSingleProfile } from "../../managers/ProfileManager"


export const ReviewForm = () => {
    let { comicId } = useParams()
    const navigate = useNavigate()
    const [comic, setComic] = useState([])
    // current user
    const currentUserId = parseInt(localStorage.getItem('user_id'))
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
        getSingleProfile(currentUserId).then(data => setProfile(data))
    }, [])

    useEffect(
        () => {
            if (comicId != undefined) {
                getReviewsByUser({comic: comicId})
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
            
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="name">R/V Parking?:</label>
                    <input type="checkbox"
                        value={review.rvParking}
                        onChange={
                            (evt) => {
                                const copy = { ...review }
                                copy.rvParking = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> */}

            <div className="reviewForm__button_container">
                {/* {comicId != undefined ? <button id="submit_updated_review"
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
                            .then(() => navigate(`/profile/${review.id}`))
                    }}>Save Changes</button>
                    : */}

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
                                .then(() => navigate(`/profile/${currentUserId}`))
                        }}
                        className="btn btn-primary">Submit</button>
                        {/* } */}
                <div className="abortReview_button_container">
                    <button id="abort_review" onClick={() => navigate(`/comics/${comic.id}`)}>
                        Back to Comic
                    </button>
                </div>
            </div>
        </form>
    )
}