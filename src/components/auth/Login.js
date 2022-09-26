import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import { LongBoxdLogo } from "./Logo.js"
import { MdOutlineLogin } from "react-icons/md"
import "./Auth.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("lb_token", res.token)
                    localStorage.setItem("userId", res.userId)
                    navigate("/comics")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    {/* <div class="logo">
                        <span className="icon-is-small"><LongBoxdLogo size={'1rem'} /></span>
                    </div> */}
                    <div className="login-content">
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username address </label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <div className="pw-login">
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                        <button className="btn btn-1 btn-sep icon-send" type="submit"><MdOutlineLogin title='Sign In' /></button>
                        </div>
                    </fieldset>
                    </div>
                </form>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            </section>
        </main>
    )
}
