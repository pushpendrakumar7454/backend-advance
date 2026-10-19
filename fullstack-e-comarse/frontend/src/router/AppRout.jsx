import { createBrowserRouter, RouterProvider } from "react-router";

import Register from "../features/auth/ui/components/Register";
import Login from "../features/auth/ui/components/Login";

import { useEffect } from "react";

import { hydreadUser } from "../features/auth/api/useApi";

import { useDispatch } from "react-redux";

import { addUser } from "../features/auth/state/authSlice";

import ProtectedRoute from "./ProteectedRoute/ProtectedRoute";
import PublicProtectedRoute from "./Public/PublicProtectedRoute";

import HomeRedirect from "../shared/ui/components/HomeRedirect";

import SellerLayout from "../app/Layout/SellerLayout";
import UserLayout from "../app/Layout/UserLayout";

import ProductHero from "../shared/ui/components/ProductHero";
import ProductCard from "../shared/ui/components/ProductCard";
import HomePage from "../shared/ui/pages/HomePage";
import ProductDetail from "../shared/ui/components/ProductDetail";
import Cart from "../shared/ui/components/Cart";

const AppRout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await hydreadUser();

        dispatch(addUser(res.data.user));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,

      children: [
        {
          path: "/user-header",
          element: <UserLayout />,

          children: [
            {
              path:"",
              element: <HomePage/>,
            },
            {
                path:"product-detail/:id",
                element:<ProductDetail/>
            },{
              path:"cart",
              element:<Cart/>
            }
          ],
        },

        {
          path: "/seller-header",
          element: <SellerLayout />,

          children: [
            {
              index: true,
              element: <HomeRedirect />,
            },
          ],
        },
      ],
    },

    {
      element: <PublicProtectedRoute />,

      children: [
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRout;