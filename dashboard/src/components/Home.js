

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      
      if (!cookies.token) {
        window.location.href = "http://127.0.0.1:3000/login";
        return;
      }

      try {
        const { data } = await axios.post(
          "http://127.0.0.1:3002", 
          {},
          { withCredentials: true }
        );

        const { status, user } = data;

        if (status) {
          setUsername(user);
          toast(`Hello ${user}`, { position: "top-right" });
        } else {
          
          removeCookie("token");
          window.location.href = "http://localhost:3000/login";
        }
      } catch (error) {
       
        console.error("Verification failed", error);
        window.location.href = "http://localhost:3000/login";
      }
    };
    verifyCookie();
  }, [cookies.token, removeCookie]); 

  const Logout = () => {
    removeCookie("token");
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <>
      <div className="home_page">
        <h4>Welcome <span>{username}</span></h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;