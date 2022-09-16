import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const currentUserId = parseInt(localStorage.getItem('lb_token'))

    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="navbar__link" to={`/profiles/${currentUserId}`}>Profile</Link>
            </li>
            <li className="navbar__item">
            <Link className="navbar__link" to="/comics">Comics</Link>

            </li>
            <li className="navbar__item">
                Navigation link
            </li>
            {
                (localStorage.getItem("lb_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lb_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
