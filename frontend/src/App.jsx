import { useState } from "react";
import Preloader from "./components/PreloadedEffect/Preloader";;
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignInForm from "./components/Form/SignInForm";
import SignUp from "./components/Form/SignUp";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Home from "./pages/Home/Home";
import Note from "./pages/Text Editor/Note";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      {/* {isLoading ? (
        <Preloader onFinish={() => setIsLoading(false)} />
      ) : (
        <div>
          <Navbar/>

          
          <Footer/>
        </div>
      )} */}
      {/* <Home/>
      <SignInForm/>
      <SignUp/>
      <Note/>
       <DashboardLayout />  */}
       
    </main>
  )
}

export default App;
