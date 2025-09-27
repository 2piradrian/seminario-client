import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./login/login";
import RegisterRoute from "./register/register";
import ProfileRoute from "./profile/profile";
import UserRoute from "./user/user";
import EditProfileRoute from "./edit-profile/edit-profile";
import Error404 from "./error/error404";
import Error500 from "./error/error500";

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
                
                {/* Default route */}
                <Route path="/" element={<ProfileRoute />} />

                {/*Catch-all del 404*/}
                <Route path="*" element={<Error404/>}/>

                <Route path="/500" element={<Error500/>}/>
            </Routes>
        </BrowserRouter>
    )
};