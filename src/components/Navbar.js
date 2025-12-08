import React from "react";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate(); 
    // <button onClick={() => navigate("/signup")}>Go to Sign Up</button>
    
     return (
        <div className = "navSection">
            <div className="title">
                <h2>E-Mart</h2>
            </div>
            <div className="search">
                <input type="text" placeholder="search..."></input> 
            </div>
            <div className="user">
                <div className="user-detail"> <button onClick={() => navigate("/signIn")}>Go to Sign In</button></div>
                <div className="user-detail"> <button onClick={() => navigate("/signup")}>Go to Sign Up</button></div>
                <div className="cart" onClick={() => navigate("/cart")} style={{cursor:"pointer"}}> Cart</div>
            </div>
        </div>
        
     )
     
}

export default Navbar