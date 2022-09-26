import { Link, useNavigate } from "react-router-dom"
import { Logo } from "./NavLogo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaMask, FaBook } from "react-icons/fa"
import { MdOutlineLogout } from "react-icons/md"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    // const userId = parseInt(localStorage.getItem('lb_token'))
    let userId = localStorage.getItem('userId')

    


    return (<>
        <ul className="navbar-menu">
        <div class="logo">
            <span className="icon-is-small"><Logo size={'1rem'}/></span>
        </div>
            <li className="navbar__item">
            <Link className="navbar__link" to={`/collectors/${userId}`}><FaMask title='Profile'/></Link>
            </li>
            <li className="navbar__item">
            <Link className="navbar__link" to="/comics"><FaBook title='Comics'/></Link>

            </li>
            <li className="navbar__item">
            {/* <Link className="navbar__link" to="/publishers">Publishers</Link> */}

            </li>
            {
                (localStorage.getItem("lb_token") !== null) ?
                    <li className="navbar-item">
                        <button className="nav-link-logout fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lb_token")
                                navigate('/login')
                            }}
                        ><MdOutlineLogout title='Logout'/></button>
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
    </>
    )
}
