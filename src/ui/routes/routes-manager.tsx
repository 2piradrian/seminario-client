import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./login/login";

export default function RoutesManager() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginRoute />} />
            </Routes>
        </BrowserRouter>
    )
};