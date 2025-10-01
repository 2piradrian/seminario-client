import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./login/login";
import RegisterRoute from "./register/register";
import ProfileRoute from "./profile/profile";
import UserRoute from "./user/user";
import EditProfileRoute from "./edit-profile/edit-profile";
import NewPostRoute from "./new-post/new-post";
import NewPageRoute from "./new-page/new-page";
import PostDetailRoute from "./post-detail/post-detail";

export default function RoutesManager() {
    return(
        <BrowserRouter>
            <Routes>
                {/* User routes */}
                <Route path="/login" element={<LoginRoute />} />
                <Route path="/register" element={<RegisterRoute />} />
                <Route path="/profile" element={<ProfileRoute />} />
                <Route path="/profile/edit" element={<EditProfileRoute />} />
                <Route path="/user" element={<UserRoute />}/>

                {/* Post routes*/}
                <Route path="/new-post" element={<NewPostRoute />} />
                <Route path="/new-page" element={<NewPageRoute />} />
                <Route path="/post-detail" element={< PostDetailRoute/>} /> 

                {/* Default route */}
                <Route path="/" element={<ProfileRoute />} />
            </Routes>
        </BrowserRouter>
    )
};