import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./login/login";
import RegisterRoute from "./register/register";

export default function RoutesManager() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginRoute />} />
                <Route path="/register" element={<RegisterRoute />} />
            </Routes>
        </BrowserRouter>
    )
};