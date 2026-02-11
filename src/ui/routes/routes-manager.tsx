import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./login/login";
import RegisterRoute from "./register/register";
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
import NewEventRoute from "./new-event/new-event";
import AdminRoute from "./admin/admin";
import EditEventRoute from "./edit-event/edit-event";
import EditPostRoute from "./edit-post/edit-post";
import EventDetailRoute from "./event-detail/event-detail";
import CalendarEventsRoute from "./calendar-events/calendar-events";
import NotificationsRoute from "./notifications/notifications";
import ChatWindowRoute from "./chat-window/chat-window";
import ChatRouteList from "./chat-list/chat-list";
import RecoverPasswordRoute from "./recover-password/recover-password";
import EditPasswordRoute from "./edit-password/edit-password";
import PostsRoute from "./posts/posts";
import EventsRoute from "./events/events";
import PagesRoute from "./pages/pages";
import HomeRoute from "./home/home";
import AssingRoleRoute from "./assign-role/assign-role";
import ManageCatalogRoute from "./manage-catalog/manage-catalog";
import ManagePostTypesRoute from "./manage-post-types/manage-post-types";
import NewPostTypeRoute from "./new-post-type/new-post-type";
import EditPostTypeRoute from "./edit-post-type/edit-post-type";
import ManagePageTypesRoute from "./manage-page-types/manage-page-types";
import NewPageTypeRoute from "./new-page-type/new-page-type";
import EditPageTypeRoute from "./edit-page-type/edit-page-type";
import ManageInstrumentsRoute from "./manage-instruments/manage-instruments";
import NewInstrumentRoute from "./new-instrument/new-instrument";
import EditInstrumentRoute from "./edit-instrument/edit-instrument";
import ManageStylesRoute from "./manage-styles/manage-styles";
import NewStyleRoute from "./new-style/new-style";
import EditStyleRoute from "./edit-style/edit-style";
import ManageModerationReasonsRoute from "./manage-moderation-reasons/manage-moderation-reasons";
import NewModerationReasonRoute from "./new-moderation-reason/new-moderation-reason";
import EditModerationReasonRoute from "./edit-moderation-reason/edit-moderation-reason";

export default function RoutesManager() {
    return (
        <BrowserRouter>
            <Routes>
                {/* User routes */}
                <Route path="/login" element={<LoginRoute />} />
                <Route path="/register" element={<RegisterRoute />} />
                <Route path="/profile/edit" element={<EditProfileRoute />} />
                <Route path="/user/:id" element={<UserRoute />} />
                <Route path="/search" element={<SearchRoute />} />
                <Route path="/user/:id/:type" element={<FollowsRoute />} />
                <Route path="/user/:id/assistance" element={<CalendarEventsRoute />} />
                <Route path="/chat/:receiverId" element={<ChatWindowRoute />} />
                <Route path="/reset-password" element={<RecoverPasswordRoute />} />
                <Route path="/edit-password/:token" element={<EditPasswordRoute />} />

                {/* Post routes*/}
                <Route path="/new-post" element={<NewPostRoute />} />
                <Route path="/post-detail/:id" element={<PostDetailRoute />} />
                <Route path="/edit-post/:id" element={<EditPostRoute />} />

                {/* Page routes */}
                <Route path="/new-page" element={<NewPageRoute />} />
                <Route path="/page/:id" element={<PageProfileRoute />} />
                <Route path="/edit-page/:id" element={<EditPageRoute />} />

                {/* Admin route */}
                <Route path="/admin" element={<AdminRoute />} />
                <Route path="/admin/assign-role" element={<AssingRoleRoute />} />
                <Route path="/admin/manage-catalog" element={<ManageCatalogRoute />} />
                               
                <Route path="/admin/manage-catalog/post-types" element={<ManagePostTypesRoute />} />               
                <Route path="/admin/manage-catalog/post-types/new-post-type" element={<NewPostTypeRoute />} />               
                <Route path="/admin/manage-catalog/post-types/edit-post-type/:id" element={<EditPostTypeRoute />} /> 

                <Route path="/admin/manage-catalog/page-types" element={<ManagePageTypesRoute />} />               
                <Route path="/admin/manage-catalog/page-types/new-page-type" element={<NewPageTypeRoute />} />               
                <Route path="/admin/manage-catalog/page-types/edit-page-type/:id" element={<EditPageTypeRoute />} />  

                <Route path="/admin/manage-catalog/instruments" element={<ManageInstrumentsRoute />} />               
                <Route path="/admin/manage-catalog/instruments/new-instrument" element={<NewInstrumentRoute />} />               
                <Route path="/admin/manage-catalog/instruments/edit-instrument/:id" element={<EditInstrumentRoute />} />  

                <Route path="/admin/manage-catalog/styles" element={<ManageStylesRoute />} />               
                <Route path="/admin/manage-catalog/styles/new-style" element={<NewStyleRoute />} />               
                <Route path="/admin/manage-catalog/styles/edit-style/:id" element={<EditStyleRoute />} />         

                <Route path="/admin/manage-catalog/moderation-reasons" element={<ManageModerationReasonsRoute />} />               
                <Route path="/admin/manage-catalog/moderation-reasons/new-moderation-reason" element={<NewModerationReasonRoute />} />               
                <Route path="/admin/manage-catalog/moderation-reasons/edit-moderation-reason/:id" element={<EditModerationReasonRoute />} />                 

                {/* Event routes*/}
                <Route path="/new-event" element={<NewEventRoute />} />
                <Route path="/edit-event/:id" element={<EditEventRoute />} />
                <Route path="/event-detail/:id" element={<EventDetailRoute />} />

                {/* Notification routes */}
                <Route path="/notifications" element={<NotificationsRoute />} />

                {/* Chat route */}
                <Route path="/chat" element={<ChatRouteList />} />

                {/* Default route */}
                <Route path="/" element={<HomeRoute />} />
                <Route path="/posts" element={<PostsRoute />} />
                <Route path="/events" element={<EventsRoute />} />
                <Route path="/pages" element={<PagesRoute />} />

                <Route path="/error-500" element={<Error500 />} />
                <Route path="/error-404" element={<Error404 />} />

                {/*Catch-all del 404*/}
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
};
