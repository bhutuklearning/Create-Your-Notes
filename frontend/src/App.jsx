import { useState } from "react";
import Preloader from "./components/PreloadedEffect/Preloader";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      {isLoading ? (
        <Preloader onFinish={() => setIsLoading(false)} />
      ) : (
        <div>
          <Navbar/>
          <Home/>
          <Footer/>
        </div>
      )}
    </main>
  );
}

export default App;
