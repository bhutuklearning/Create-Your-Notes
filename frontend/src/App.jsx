import { useState } from "react";
import Preloader from "./components/PreloadedEffect/Preloader";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignInForm from "./components/Form/SignInForm";
import SignUp from "./components/Form/SignUp";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      {isLoading ? (
        <Preloader onFinish={() => setIsLoading(false)} />
      ) : (
        <div>
          <Navbar/>
          <SignInForm/>
          <SignUp/>
          <Home/>
          <Footer/>
        </div>
      )}
    </main>
  );
}

export default App;
