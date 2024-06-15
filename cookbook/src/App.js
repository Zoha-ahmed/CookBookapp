import "../src/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Developer from "./pages/Developer";
import SignUp from "./pages/SignUp";
import Recipes from "./pages/Recipes";
import UploadRecipe from "./pages/Upload";
import Cart from "./pages/Cart";
import Notepad from "./pages/Notepad";
function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="developer" element={<Developer />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="upload" element={<UploadRecipe />} />
            <Route path="cart" element={<Cart />} />
            <Route path="notepad" element={<Notepad />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
