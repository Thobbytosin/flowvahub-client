import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(Home, {}),
    },
    {
        path: "/onboarding",
        element: _jsx(Onboarding, {}),
    },
    {
        path: "/auth",
        element: _jsx(Auth, {}),
    },
]);
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(GoogleOAuthProvider, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "", children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(RouterProvider, { router: router }), _jsx(Toaster, { richColors: true })] }) }) }));
