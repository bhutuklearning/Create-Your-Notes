import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./components/PreloadedEffect/Preloader";
import SignInForm from "./components/Form/SignInForm";
import SignUp from "./components/Form/SignUp";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Home from "./pages/Home/Home";
import EditorLayout from "./pages/TextEditor/EditorLayout";


function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return showPreloader ? (
    <Preloader onFinish={() => setShowPreloader(false)} />
  ) : (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/editor" element={<EditorLayout />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
