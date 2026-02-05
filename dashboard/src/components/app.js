import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Home from "./Home"; 

function App() {
  useEffect(() => {
    const verifyUser = async () => {
      try {
        
        const { data } = await axios.post(
          "http://127.0.0.1:3002", 
          {}, 
          { withCredentials: true }
        );

        if (!data.status) {
         
          window.location.href = "http://127.0.0.1:3000/login";
        }
      } catch (error) {
        
        window.location.href = "http://127.0.0.1:3000/login";
      }
    };
    verifyUser();
  }, []);

  return (
    <div className="App">
      <Routes>
        {}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;