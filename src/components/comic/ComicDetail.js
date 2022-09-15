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
import { useParams } from "react-router-dom"
import { getComicById } from "../../managers/ComicManager.js"


export const ComicDetail = () => {
    let { comicId } = useParams()
    const [comic, setComic] = useState([])
    const [creators, setCreators] = useState([])

    useEffect(() => {
        getComicById(comicId).then(data => setComic(data))
    }, [comicId])



    return (
        <article className="comics">
            <section key={`comic--${comic.id}`} className="comic">
                {/* make the publisher a link to publisher page -- when that component is ready */}
                <div className="comic_publisher">{comic.publisher?.name} released {comic.sale_date}</div>
                <div className="comic__image">{comic.cover_image}</div>
                <div className="comic__title">{comic.title} #{comic.issue_number}</div>
                {/* make this a link to the creator page when that component is read */}
                <div className="comic__creators">
                    <ul>Creators:
                        {comic.credits.map((credit, index) => (
                            <li key={index}>
                                <h4>{credit.name}</h4>
                            </li>
                        )
                        )}
                    </ul>
                </div>
                <div className="comic__type">Format: {comic.comic_type?.label}</div>
                <div className="comic__series">Series: {comic.series}</div>

                <br />
                {/* Review button in line with add to wishlist and collection here */}
                <div className="comic__synopsis">{comic.synopsis}</div>
                <div className="comic__characters">
                    <ul>Featuring:
                        {comic.characters.map((character, index) => (
                            <li key={index}>
                                <h4>{character.name}</h4>
                            </li>
                        )
                        )}
                    </ul>
                </div>
            </section>

        </article>
    )
}