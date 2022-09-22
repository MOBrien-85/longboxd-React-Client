import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getComics } from "../../managers/ComicManager.js"
import './Comic.css'

export const ComicList = (props) => {
    const [comics, setComics] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getComics().then(data => setComics(data))
    }, [])






    return (
        <article className="comics">
            <div className="comics-list">
            {
                comics.map(comic => {
                    return <section key={`comic--${comic.id}`} className="comic">

                        {/* <figure class="image is-3by5">
                            <img src={comic.cover_image} /></figure> */}
                        <div className="comic-box" onClick={
                            () => {
                                navigate(`/comics/${comic.id}`)
                            }
                        }>
                            <figure class="image is-128x128">
                                <img src={comic.cover_image} /></figure>
                            {comic.title} #{comic.issue_number}</div>

                        {/* I need to add a conditional here for the number sign and number so that it only shows for actual issues
                        and then for TPB it can show "Vol. {issue_number}*/}

                        {/* this is a placeholder until i get images displaying -- then, i'll use the commented out code below to display 
                        title and issue number */}
                        {/* <div className="comic__title">>{comic.title} #{comic.issue_number}</div> */}
                    </section>
                })
            }
            </div>
        </article>
    )
}