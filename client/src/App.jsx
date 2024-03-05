import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";

import Left from "./components/left/Left";
import Right from "./components/right/Right";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ViewPost from "./pages/viewPost/ViewPost";
import "./style.scss";
import "./App.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeContext } from "./context/DarkModeContext";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import UserStory from "./pages/storyy/UserStory";
import Register_2 from "./pages/register/Register_2";
import FriendNav from "./pages/FRIENDSPAGE/friendnav/FriendNav";
import Friend from "./pages/FRIENDSPAGE/friend/Friend";
import Suggested from "./pages/FRIENDSPAGE/suggested/Suggested";
import FriendReq from "./pages/FRIENDSPAGE/friendReq/FriendReq";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div id="m" className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <Left />
            <div className="outlet">
              <Outlet />
            </div>
            <Right />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  // //FRIENDSHOME
  const FriendLayout = () => {
    return (
      <>
        <div className="friendPage">
          <FriendNav />
          <div className="friendPageOutlet">
            <Outlet />
          </div>
        </div>
      </>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },

        {
          path: "/user_story/:id",
          element: <UserStory />,
        },
        {
          path: "/post/:id",
          element: <ViewPost />,
        },

        {
          path: "/door/",
          element: <FriendLayout />,
          children: [
            {
              path: "friend",
              element: <Friend />,
            },
            {
              path: "suggested",
              element: <Suggested />,
            },
            {
              path: "friendreq",
              element: <FriendReq />,
            },
          ],
        },
      ],
    },
    ////FriendPage

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register_2 />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
