import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import BoardGameDashboard from "../boardgames/dashboard/BoardGameDashboard";
import BoardGameDetails from "../boardgames/details/BoardGameDetails";
import BoardGamesForm from "../boardgames/form/BoardGamesForm";
import NotFound from "../mainpage/NotFound";
import LoginForm from "../mainpage/LoginForm";
import ProfilePage from "../Profile/ProfilePage";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'boardgames', element: <BoardGameDashboard/>},
            {path: 'boardgames/:id', element: <BoardGameDetails />},
            {path: 'createBoardGame', element: <BoardGamesForm key='create' />},
            {path: 'manage/:id', element: <BoardGamesForm key='manage' />},
            {path: 'not-found', element: <NotFound />},
            {path: 'login', element: <LoginForm />},
            {path: '*', element: <Navigate replace to='/not-found' />},
            {path: 'profiles/:username', element: <ProfilePage />},
            
        ]
    }
]

export const router = createBrowserRouter(routes);