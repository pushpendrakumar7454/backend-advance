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
import HomePage from "../shared/ui/pages/HomePage";
import ProductDetail from "../shared/ui/components/ProductDetail";
import Cart from "../shared/ui/components/Cart";
import Main from "../shared/ui/pages/Main";
import CategoryProducts from "../shared/ui/pages/CategoryProducts";
import AllProducts from "../shared/ui/components/AllProducts";
import About from "../shared/ui/components/About";
import GoogleCallback from "../shared/ui/pages/GoogleCallback";

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
              path: "",
              element: <Main/>,
            },
            {
              path: "product-detail/:id",
              element: <ProductDetail />,
            },
            {
              path: "cart",
              element: <Cart />,
            },{
              path:"category/:category",
              element: <CategoryProducts/>
            },{
              path:"all-products",
              element:<AllProducts/>
            },{
              path:"about",
              element:<About/>
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
        },{
          path:"/google/callback",
          element:<GoogleCallback/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRout;
