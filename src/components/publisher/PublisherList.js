import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPublishers } from "../../managers/PublisherManager.js"


export const PublisherList = (props) => {
    const [publishers, setPublishers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getPublishers().then(data => setPublishers(data))
    }, [])



    return (
        <article className="publishers">
            {
                publishers.map(publisher => {
                    return <section key={`publisher--${publisher.id}`} className="publisher">
                        <div className="publisher_thumbnail">
                            <ul className="cover_image">
                                <li className="cover" onClick={
                                    () => {
                                        navigate(`/publishers/${publisher.id}`)
                                    }
                                }>marvel!
                                    <a href={publisher.image}>

                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                })
            }
        </article>
    )
}