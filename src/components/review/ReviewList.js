import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getComics } from "../../managers/ComicManager.js"
import { getUserReviews } from "../../managers/ReviewManager.js"


export const ReviewsList = (props) => {
    const [comics, setComics] = useState([])
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        getUserReviews(userId).then(data => setReviews())
        getComics().then(data => setComics(data))

    }, [userId])}


    return (
        <article className="reviews">
            {
                reviews.map(review => {
                    // i need to map through reviews -- display the cover image of the comic
                    // and the star rating from the review
                    return <section key={`review--${review.id}`} className="review">
                        <div className="comic_thumbnail">
                            <ul className="cover_image">
                                <li className="cover">
                                    <a href={review?.issue?.cover_image}>

                                    </a>
                                </li>
                            </ul>
                        </div>





                        {/* I need to add a conditional here for the number sign and number so that it only shows for actual issues
                        and then for TPB it can show "Vol. {issue_number}*/}

                        {/* this is a placeholder until i get images displaying -- then, i'll use the commented out code below to display 
                        title and issue number */}
                        {/* <div className="comic_title" onClick={
                                () => {
                                    navigate(`/comics/${comic.id}`)
                                }
                                }>{comic.title} #{comic.issue_number}</div> */}
                        {/* <div className="comic__title">>{comic.title} #{comic.issue_number}</div> */}
                    </section>
                })
            }
        </article>
    )

