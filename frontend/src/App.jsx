import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/PreloadedEffect/ProtectedRoute";
import Preloader from "./components/PreloadedEffect/Preloader";
import SignInForm from "./components/Form/SignInForm";
import SignUp from "./components/Form/SignUp";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Home from "./pages/Home/Home";
import EditorLayout from "./pages/TextEditor/EditorLayout";
import Note from "./pages/notes/Note";
import Profile from "./pages/Dashboard/Profile";

// Component to handle smooth scroll to top on route changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);
  
  return null;
};

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return showPreloader ? (
    <Preloader onFinish={() => setShowPreloader(false)} />
  ) : (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <main>
            <Routes>
              {/* Public routes - no authentication required */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignInForm />} />

              {/* Protected routes - authentication required */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editor"
                element={
                  <ProtectedRoute>
                    <EditorLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes/:slug"
                element={
                  <ProtectedRoute>
                    <Note />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
