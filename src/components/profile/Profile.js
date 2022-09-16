import React, { useEffect } from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getSingleProfile } from "../../managers/ProfileManager"
import { FaUserCircle } from 'react-icons/fa';
import { getReviewsByUser } from "../../managers/ReviewManager";

export const ProfileDetails = (userId) => {
    const { profileId } = useParams()
    const [profile, setProfile] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getSingleProfile(profileId).then(data => setProfile(data))
        getReviewsByUser(profileId).then(data => setReviews(data))
    }, [profileId])

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
                <div className="profile__fullName">{collector?.first_name} {collector?.last_name}</div>
                {/* <div className="profile__collectorname">{collector?.collectorname}</div>
                <div className="profile__email">{collector?.email}</div> */}
                {/* <div className="profile__creationDate">{profile.user?.date_joined}</div>
                <h3>Choose Profile Image:</h3>
                <input type="file" id="game_image" name="action_pic" onChange={createImageString} />
                <input type="hidden" name="game_id" value={profile.id} />
                <button onClick={() => {
                    editUserImage(profile, newImg)
                        .then(() => getSingleProfile(profileId).then(data => setProfile(data)))
                }}>Upload</button><br /> */}


{/* this review area -- each review can be hovered over...the image of the comic will shift and/or create a drop
shadow and you can click it to go see the review details */}
                <section className="section">
                    <div>{profile.user?.first_name}'s Reviews</div>
                    <article className="reviews">
                        {
                            reviews.map(review => {
                                return <section key={`review--${review.id}`} className="review">
                                    <div className="card">
                                        <header className="card-header is-justify-content-center">
                                            {/* comic image */}
                                        </header>
                                        <footer>
                                            {/* star rating */}
                                        </footer>
                                    </div>
                                </section>
                            })
                        }
                    </article>
                </section>

            </section>
        </article>
    )

}