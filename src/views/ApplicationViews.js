import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { ComicList } from "../components/comic/ComicList"
import { ReviewForm } from "../components/review/ReviewForm"
import { ComicDetail } from "../components/comic/ComicDetail"
import { ReviewDetails } from "../components/review/ReviewDetail"
import { ProfileDetails } from "../components/profile/Profile"
import { ReviewUpdate } from "../components/review/ReviewUpdate"
import { PublisherList } from "../components/publisher/PublisherList"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>

                <Route path="/comics" element={<ComicList />} />
                <Route path="/comics/:comicId" element={<ComicDetail />} />

                <Route path="/reviewform/:comicId" element={<ReviewForm />} />
                <Route path="/reviewdetails/:reviewId" element={<ReviewDetails />} />
                <Route path="/reviewupdate/:comicId/:reviewId" element={<ReviewUpdate />} />

                <Route path="/publishers" element={<PublisherList />} />



                <Route path="/collectors/:userId" element={<ProfileDetails />} />

            </Route>
        </Routes>
    </>
}
