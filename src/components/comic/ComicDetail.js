// details page for a single comic
// display: title, creators, publisher, release date, format
// star rating system?
// add to collection button
// add to wishlist button
// image
// synopsis
// review button to go to a review page? or the review container?

// **be sure to add links to creator name so you can go to the detail page
// ***move the featuring characters from the comic list component to here. 
// ***make them links to the character detail page

import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    addComicToCollection, getComicById, getComics, addComicToWishlist,
    removeComicFromCollection, removeComicFromWishlist
} from "../../managers/ComicManager.js"
import { getCreators } from "../../managers/CreatorManager.js"
import { getCharacters } from "../../managers/CharacterManager.js"
import { getReviewsByUser } from "../../managers/ReviewManager.js"
import { BiBookAdd } from "react-icons/bi"
import { MdOutlineRemoveCircleOutline, MdOutlineRateReview } from "react-icons/md"
import { GiMagicLamp } from "react-icons/gi"

import './ComicDetails.css'

export const ComicDetail = () => {
    let { comicId } = useParams()
    const navigate = useNavigate()
    const [comic, setComic] = useState([])
    const [creators, setCreators] = useState([])
    const [characters, setCharacters] = useState([])
    const [collection, setCollection] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [review, setReviewDetails] = useState([])
    let userId = localStorage.getItem('userId')

    const getCurrentComicById = () => {
        getComicById(comicId).then(data => setComic(data))

    }

    useEffect(() => {
        getCurrentComicById()
        // getCreators().then(data => setCreators(data))
        getCharacters().then(data => setCharacters(data))
        getReviewsByUser({ comic: comicId }).then(data => setReviewDetails(data))
    }, [comicId])



    return (
        <article className="comics-detail">
            <section key={`comic--${comic.id}`} className="comic">
                {/* make the publisher a link to publisher page -- when that component is ready */}
                <header className="comic-header">
                    <figure class="image is-256x256 has-ratio">
                        <img src={comic.cover_image} /></figure>
                    <div className="comic__title">{comic.title} #{comic.issue_number}</div>
                    <div className="comic_publisher">{comic.publisher?.name} • {comic.sale_date}</div>
                    {/* make this a link to the creator page when that component is read */}
                    <section>
                        {comic.inCollection ? (
                            <button className="comic-button-collection-remove"
                                onClick={() =>
                                    removeComicFromCollection(comic).then(getCurrentComicById)
                                }
                            >
                                {/* these add and remove buttons i want to replace with icons and 
                        then add this text as a hover */}
                                <MdOutlineRemoveCircleOutline title='Remove from Collection'/>
                            </button>
                        ) : (
                            <button className="comic-button-collection-add"
                                onClick={() =>
                                    addComicToCollection(comic).then(getCurrentComicById)
                                }
                            >
                                <BiBookAdd title='Add to Collection'/>
                            </button>
                        )}
                        {comic.inWishlist ? (
                            <button className="comic-button-wishlist-remove"
                                onClick={() =>
                                    removeComicFromWishlist(comic).then(getCurrentComicById)
                                }
                            >
                                {/* these add and remove buttons i want to replace with icons and 
                        then add this text as a hover */}
                                <MdOutlineRemoveCircleOutline title='Remove from Wishlist'/>
                            </button>
                        ) : (
                            <button className="comic-button-wishlist-add"
                                onClick={() =>
                                    addComicToWishlist(comic).then(getCurrentComicById)
                                }
                            >
                                <GiMagicLamp title='Add to Wishlist'/>
                            </button>
                        )}


                        {
                            review.status
                                ? <button className="comic-button-update-review" onClick={
                                    () => {
                                        navigate(`/reviewupdate/${comic.id}/${review?.reviewId}`)
                                    }
                                }><MdOutlineRateReview title='Update Review'/></button>
                                :
                                <button className="comic-button-write-review" onClick={
                                    () => {
                                        navigate(`/reviewform/${comic.id}`)
                                    }
                                }><MdOutlineRateReview title='Write Review'/></button>
                        }

                    </section>
                </header>
                <hr className="divider"/>
                <section className="comic-info-area">

                <div className="info_box">
                    <div className="detail_header"><strong>Synopsis:</strong></div>
                    <p className="comic_info">{comic.synopsis}</p>
                </div>

                <div className="info_box">
                    <div className="comic__creators">
                        <ul className="detail_header"><strong>Creative Team:</strong>
                            {comic.credits?.map((credit, index) => (
                                <li key={index}>
                                    <h4 className="comic_info">{credit.name}</h4>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>

                <div className="info_box">
                    <div className="detail_header"><strong>Series:</strong></div>
                    <p className="comic_info">{comic.series}</p>
                </div>


                <div className="info_box">
                    <div className="detail_header">
                        <ul><strong>Featuring:</strong>
                            {comic.characters?.map((character, index) => (
                                <li key={index}>
                                    <h4 className="comic_info">{character.name}</h4>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>

                <div className="info_box">
                    <div className="detail_header"><strong>Format:</strong> </div>
                    <p className="comic_info">{comic.comic_type?.label}</p>
                </div>

                </section>
            </section>

        </article>
    )
}