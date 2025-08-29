import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TourProvider } from "./contexts/TourContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import configureStore from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import Index from "./pages/Index";
import Login from "./pages/Login";
import BuildVAIS from "./pages/BuildVAIS";
import VAISResults from "./pages/VAISResults";

// Create a simple NotFound component
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600">Page not found</p>
    </div>
  </div>
);

const queryClient = new QueryClient();
const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        forcedTheme="light"
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <TourProvider>
              <Toaster />
              <Sonner />
              <Loading />
              <ToastContainer autoClose={5000} limit={1} />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/build-vais"
                    element={
                      <ProtectedRoute>
                        <BuildVAIS />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/vais-results"
                    element={
                      <ProtectedRoute>
                        <VAISResults />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TourProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

// Handle HMR properly to avoid multiple createRoot calls
const container = document.getElementById("root")!;

// Check if we're in development and already have a root
let root: any;
if (import.meta.hot) {
  // Store root in hot module data to persist across reloads
  const hotData = import.meta.hot.data;
  if (hotData.root) {
    root = hotData.root;
  } else {
    root = createRoot(container);
    hotData.root = root;
  }
} else {
  // Production: create root normally
  root = createRoot(container);
}

root.render(<App />);
