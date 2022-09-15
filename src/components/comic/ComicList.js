import React, { useEffect, useState } from "react"
import { getComics } from "../../managers/ComicManager.js"

export const ComicList = (props) => {
    const [comics, setComics] = useState([])

    useEffect(() => {
        getComics().then(data => setComics(data))
    }, [])




    return (
        <article className="comics">
            {
                comics.map(comic => {
                    return <section key={`comic--${comic.id}`} className="comic">
                        <div className="comic_thumbnail">
                            <ul className="cover_image">
                                <li className="cover">
                                    <a href={comics.cover_image}>
                                        
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        
                        
                        
                        
                        {/* I need to add a conditional here for the number sign and number so that it only shows for actual issues
                        and then for TPB it can show "Vol. {issue_number}*/}
                        <div className="comic__title">{comic.title} #{comic.issue_number}</div>
                    </section>
                })
            }
        </article>
    )
}