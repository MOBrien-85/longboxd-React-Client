import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { ComicList } from "../components/comic/ComicList"
import { ReviewForm } from "../components/review/ReviewForm"
import { ComicDetail } from "../components/comic/ComicDetail"
import { ReviewDetails } from "../components/review/ReviewDetail"
import { ProfileDetails } from "../components/profile/Profile"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>

                <Route path="/comics" element={<ComicList />} />
                <Route path="/comics/:comicId" element={<ComicDetail />} />

                <Route path="/reviewform/:comicId" element={<ReviewForm />} />
                <Route path="/reviewform/:reviewId" element={<ReviewForm />} />
                <Route path="/reviewdetails/:reviewId" element={<ReviewDetails />} />
                <Route path="/reviewupdate/:comicId" element={<ReviewForm />} />

                
                <Route path="/profiles/:profileId" element={<ProfileDetails />} />

            </Route>
        </Routes>
    </>
}
