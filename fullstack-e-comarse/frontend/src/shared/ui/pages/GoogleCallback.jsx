import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser, setAccessToken } from "../../state/auth";


const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const userString = params.get("user");

    try {
      if (!accessToken || !userString) {
        navigate("/login", { replace: true });
        return;
      }

      const user = JSON.parse(userString);

      dispatch(setAccessToken(accessToken));
      dispatch(addUser(user));

      navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Google login failed:", error);
      navigate("/login", { replace: true });
    }
    
  }, [dispatch, navigate]);

  return <p>Logging you in with Google...</p>;
};

export default GoogleCallback;
