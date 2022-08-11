import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Route , Routes , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function App() {

  let navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  function saveUser(){
    let encodedToken = localStorage.getItem("Token");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }
  // To Handle Reload 
  useEffect(()=> {
    if (localStorage.getItem("Token")){
      saveUser();
    }
  }, []);

  function logOut(){
    setUserData(null);
    localStorage.removeItem("Token");
    navigate("/login");
  }
 

  return (
    <>
      <Navbar logOut={logOut} userData={userData}/>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="login" element={<Login saveUserData={saveUser}/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>
  );
}

export default App;
