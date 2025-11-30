import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./login/login";
import RegisterRoute from "./register/register";
import ProfileRoute from "./profile/profile";
import UserRoute from "./user/user";
import EditProfileRoute from "./edit-profile/edit-profile";
import NewPostRoute from "./new-post/new-post";
import NewPageRoute from "./new-page/new-page";
import PostDetailRoute from "./post-detail/post-detail";
import EditPageRoute from "./edit-page/edit-page";
import PageProfileRoute from "./page-profile/page-profile";
import Error404 from "./error/error-404/error404";
import Error500 from "./error/error-500/error500";
import SearchRoute from "./search/search";
import FollowsRoute from "./follows/follows";
import MainRoute from "./main/main";
import NewEventRoute from "./new-event/new-event";
import AdminRoute from "./admin/admin";
import EditEventRoute from "./edit-event/edit-event";
import EditPostRoute from "./edit-post/edit-post";
import EventDetailRoute from "./event-detail/event-detail";
import NewReviewRoute from "./new-review/new-review";
import CalendarEventsRoute from "./calendar-events/calendar-events";
import NotificationsRoute from "./notifications/notifications";
import ChatRoute from "./chat/chat";

export default function RoutesManager() {
    return(
        <BrowserRouter>
            <Routes>
                {/* User routes */}
                <Route path="/login" element={<LoginRoute />} />
                <Route path="/register" element={<RegisterRoute />} />
                <Route path="/profile" element={<ProfileRoute />} />
                <Route path="/profile/edit" element={<EditProfileRoute />} />
                <Route path="/user/:id" element={<UserRoute />}/>
                <Route path="/edit-page" element={<EditPageRoute />} />
                <Route path="/profile" element={<ProfileRoute />} /> 
                <Route path="/search" element={<SearchRoute/>}/>
                <Route path="/main" element={<MainRoute/>}/>
                <Route path="/user/:id/:type" element={<FollowsRoute/>}/>
                <Route path="/user/:id/assistance" element={<CalendarEventsRoute />} />
                <Route path="/chat" element={<ChatRoute />} />
                                
                {/* Post routes*/}
                <Route path="/new-post" element={<NewPostRoute />} />
                <Route path="/post-detail/:id" element={<PostDetailRoute/>} />
                <Route path="/edit-post/:id" element={<EditPostRoute />} />

                {/* Page routes */}
                <Route path="/new-page" element={<NewPageRoute />} />
                <Route path="/page/:id" element={<PageProfileRoute />} />

                {/* Admin route */}
                <Route path="/admin" element={<AdminRoute/>} />

                {/* Event routes*/}
                <Route path="/new-event" element={<NewEventRoute />} /> 
                <Route path="/edit-event/:id" element={<EditEventRoute />} />
                <Route path="/event-detail/:id" element={<EventDetailRoute />} />
                
                {/* Review routes*/}
                <Route path="/user/:id/new-review" element={<NewReviewRoute/>} />

                {/* Notification routes */ }
                <Route path="/notifications" element={<NotificationsRoute />} />
                 
                {/* Default route */}
                <Route path="/" element={<MainRoute />} />

                <Route path="/error-500" element={<Error500/>}/>
                <Route path="/error-404" element={<Error404/>}/>
                
                {/*Catch-all del 404*/}
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    )
};