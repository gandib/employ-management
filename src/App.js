import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import useToken from "./hooks/useToken";
import routes from "./routes/routes";

function App() {
  const dispatch = useDispatch();
  const [token, setToken, setUser] = useToken();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user)
        dispatch(getUser(user?.email));
        await setUser(user?.email);
      } else {
        dispatch(toggleLoading());
      }
    });
  }, [dispatch, setUser]);
  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
