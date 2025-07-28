
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Feed from './components/Feed.jsx';
import Profile from './components/Profile.jsx';
import Projects from './components/Projects.jsx';
import Friends from './components/Friends.jsx';
import UserImages from './components/UserImages.jsx';
import Comments from './components/Comments.jsx';
import AuthLayout from './components/AuthLayout.jsx'
import UserState from './context/UserState.jsx';
import CreatePost from './components/CreatePost.jsx';
import AnotherUserProfile from './components/AnotherUserProfile.jsx';
import EditPost from './components/EditPost.jsx';
import EditProfile from './components/EditProfile.jsx';
import Chat from './components/Chat.jsx';
import  { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />

  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/signup",
    element:
      <Signup />
  },
  {
    path: "/feed",
    element:
      <AuthLayout authentication>
        <Feed />
      </AuthLayout>,
  },
  {
    path: "/project",
    element:
      <AuthLayout authentication>
        <Projects />,
      </AuthLayout>,

  },

  {
    path: "/friends",
    element:
      <AuthLayout authentication> <Friends /> </AuthLayout>,
  },
  {
    path: "/photos",
    element:
      <AuthLayout authentication> <UserImages /> </AuthLayout>,
  },
  {
    path: "/comments/:id",
    element:
      <AuthLayout authentication> <Comments /> </AuthLayout>,
  },
  {
    path: "/createpost",
    element:
      <AuthLayout authentication> <CreatePost /> </AuthLayout>,
  },
  {
    path: "/anotherUserProfile/:username",
    element:
      <AuthLayout authentication> <AnotherUserProfile /> </AuthLayout>,
  },
  {
    path: "/editpost/:id",
    element:
      <AuthLayout authentication> <EditPost /> </AuthLayout>,
  },
  {
    path: "/editprofile",
    element: <AuthLayout authentication> <EditProfile /> </AuthLayout>,
  },
  {
    path: "/chat/:username/:id",
    element:
      <AuthLayout authentication> <Chat /> </AuthLayout>,
  }
]);

function App() {
  return (
    <UserState>
      <div className="overflow-x-hidden no-scrollbar bg-[#000000]">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </UserState>
  )
}

export default App