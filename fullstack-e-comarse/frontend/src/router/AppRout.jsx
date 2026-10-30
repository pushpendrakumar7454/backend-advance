
import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../features/auth/ui/components/Register";
import Login from "../features/auth/ui/components/Login";
import { useEffect } from "react";
import { hydreadUser } from "../features/auth/api/useApi";
import { useDispatch } from "react-redux";
import { addUser, setAuthLoading } from "../features/auth/state/authSlice";
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
import ChatPage from "../shared/ui/pages/ChatPage";
import Order from "../shared/ui/components/Order";

const AppRout = () => {

    const dispatch = useDispatch();

    // Check logged-in user
    useEffect(() => {

        const checkUser = async () => {

            try {

                const res = await hydreadUser();

                dispatch(addUser(res.data.user));

            } catch (error) {

                console.log("User not logged in:", error);

                dispatch(addUser(null));

            } finally {

                dispatch(setAuthLoading(false));

            }
        };

        checkUser();

    }, [dispatch]);

    const router = createBrowserRouter([

        // Root Route
        {
            path: "/",
            element: <HomeRedirect />
        },

        // Protected Routes
        {
            element: <ProtectedRoute />,

            children: [

                // User Routes
                {
                    path: "/user-header",
                    element: <UserLayout />,

                    children: [
                        {
                            index: true,
                            element: <Main />
                        },
                        {
                            path: "product-detail/:id",
                            element: <ProductDetail />
                        },
                        {
                            path: "cart",
                            element: <Cart />
                        },
                        {
                            path: "category/:category",
                            element: <CategoryProducts />
                        },
                        {
                            path: "all-products",
                            element: <AllProducts />
                        },
                        {
                            path: "about",
                            element: <About />
                        },
                        {
                            path: "help-chat",
                            element: <ChatPage />
                        },
                        {
                            path: "order",
                            element: <Order />
                        }
                    ]
                },

                // Seller Routes
                {
                    path: "/seller-header",
                    element: <SellerLayout />,

                    children: [
                        {
                            index: true,
                            element: <HomePage />
                        }
                    ]
                }
            ]
        },

        // Public Routes
        {
            element: <PublicProtectedRoute />,

            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                {
                    path: "/google/callback",
                    element: <GoogleCallback />
                }
            ]
        }

    ]);

    return <RouterProvider router={router} />;
};

export default AppRout;
