import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./login/login";
import RegisterRoute from "./register/register";
import ProfileRoute from "./profile/profile";
import UserRoute from "./user/user";
import EditProfileRoute from "./edit-profile/edit-profile";
import NewPostRoute from "./new-post/new-post";
import PostItemRoute from "./post-item/post-item";

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
                <Route path="/new-post" element={<NewPostRoute />}/>
                <Route  path="/post-item" element={<PostItemRoute />}/>
                
                {/* Default route */}
                <Route path="/" element={<ProfileRoute />} />
            </Routes>
        </BrowserRouter>
    )
};