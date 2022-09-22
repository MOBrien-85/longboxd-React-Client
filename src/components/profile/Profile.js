import React, { useEffect } from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getSingleProfile } from "../../managers/ProfileManager"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaUserCircle } from 'react-icons/fa'
import "./Profile.css"



export const ProfileDetails = () => {
    const { userId } = useParams()
    const [profile, setProfile] = useState([])
    const [openTab, setOpenTab] = useState(1)
    const navigate = useNavigate()


    useEffect(() => {
        getSingleProfile(userId).then(data => setProfile(data))

    }, [userId])

    // const [newImg, setImg] = useState("")

    // const createImageString = (event) => {
    //     getBase64(event.target.files[0], (base64ImageString) => {
    //         setImg(base64ImageString)
    //     });
    // }

    // const getBase64 = (file, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(file);
    // }






    return (

        <article className="profiles">
            <header className="profile-header">
                <section key={`profile--${profile.id}`} className="profile">
                    {/* <header>
                    {
                        profile.profile_image_url === ""
                            ? <figure className="media-left">
                                <span className="icon is-large">
                                    <FaUserCircle size={'3rem'} />
                                </span></figure>

                            : <img className="image" src={`http://localhost:8000${profile.profile_image_url}`} />
                    }

                </header> */}
                    <div className="profile__username">@{profile?.user?.username}</div>
                    <div className="profile__fullName">{profile?.user?.first_name} {profile?.user?.last_name}</div>

                    <div className="profile__email">{profile?.user?.email}</div>
                </section>
            </header>
            <hr />

            <div class="tabs is-centered is-boxed">
                <ul>
                    <li class={openTab == 1 ? "tablinks is-active" : "tab-links"} onClick={() => {
                        setOpenTab(1)
                    }}>
                        <a className="tab">
                            <span className="tab_title">Reviews</span>
                        </a>
                    </li>
                    <li class={openTab == 2 ? "tablinks is-active" : "tab-links"} onClick={() => {
                        setOpenTab(2)
                    }}>
                        <a className="tab">
                            <span className="tab_title">Collection</span>
                        </a>
                    </li>
                    <li class={openTab == 3 ? "tablinks is-active" : "tab-links"} onClick={() => {
                        setOpenTab(3)
                    }}>
                        <a className="tab">
                            <span className="tab_title">Wishlist</span>
                        </a>
                    </li>
                </ul>
            </div>



            {openTab == 1 ?
                <div id="reviews" class="tabcontent">
                    <article className="reviews">
                        {
                            profile.reviews?.map(review => {
                                return <section key={`review--${review.id}`} className="review-list">
                                    <div className="comic-box">
                                            <figure class="image">
                                                <img src={review?.issue?.cover_image} /></figure>
                                        
                                    {/* </div> */}
                                        <footer>
                                            {review?.issue?.title}
                                        </footer>
                                        </div>
                                </section>
                            })
                        }
                    </article>
                </div> : <></>
            }

            {openTab == 2 ?
                <div id="collection" class="tabcontent">
                    <article className="collection">
                        {
                            profile.collection?.map(collection => {
                                return <section key={`collection--${collection.id}`} className="comic-collection">
                                    <div className="comic-box" onClick={
                                        () => {
                                            navigate(`/comics/${collection?.id}`)
                                        }}>
                                        <header>
                                            <figure class="image">
                                                <img src={collection?.cover_image} /></figure>
                                        </header>
                                        <footer>
                                            {collection.title}
                                        </footer>
                                    </div>
                                </section>
                            })
                        }
                    </article>
                </div> : <></>
            }

            {openTab == 3 ?
                <div id="wishlist" class="tabcontent">
                    <article className="wishlist">
                        {
                            profile.wishlist?.map(wishlist => {
                                return <section key={`wishlist--${wishlist.id}`} className="comic-wishlist">
                                     <div className="comic-box" onClick={
                                        () => {
                                            navigate(`/comics/${wishlist?.id}`)
                                        }}>
                                            <figure class="image">
                                                <img src={wishlist?.cover_image} /></figure>
                                        
                                        <footer>
                                            {wishlist.title}
                                        </footer>
                                    </div>
                                </section>
                            })
                        }
                    </article>
                </div> : <></>
            }
        </article>
    )
}