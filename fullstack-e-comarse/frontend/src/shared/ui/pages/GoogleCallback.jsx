
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  addUser,
  setAccessToken,
} from "../../../features/auth/state/authSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = () => {
      const params = new URLSearchParams(window.location.search);

      const accessToken = params.get("accessToken");
      const userString = params.get("user");

      try {
        // Check whether token and user are present
        if (!accessToken || !userString) {
          navigate("/login", { replace: true });
          return;
        }

        // Parse user data received from backend
        const user = JSON.parse(userString);

        // Save authentication data in Redux
        dispatch(setAccessToken(accessToken));
        dispatch(addUser(user));

        // Redirect to user header after successful login
        navigate("/user-header", { replace: true });
      } catch (error) {
        console.error("Google login failed:", error);
        navigate("/login", { replace: true });
      }
    };

    handleGoogleCallback();
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-xl bg-white p-8 text-center shadow-md">
        <p className="text-lg font-semibold text-gray-800">
          Logging you in with Google...
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we redirect you.
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
