import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [data, setdata] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''

    })
    const {username,email,password,confirmPassword} = data;
    const changeHandler = e =>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const submitHandler= e =>{
        e.preventDefault()
        if(password === confirmPassword)
        console.log(data)

    }

<Link to="/signup">Sign Up</Link>

    return(
        <div>
            <center>
                <form>
                    <input type="text" name="username" value={username} onChange={changeHandler} placeholder="Username"/> <br/>
                    <input type="email" name="email" value={email} onChange={changeHandler} placeholder="email..."/> <br/>
                    <input type="password" name="password" value={password} onChange={changeHandler} placeholder="password"/> <br/>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={changeHandler} placeholder="ConfirmPassword"/> <br/>
                    <input type="submit" name="submit"/> <br/>
                </form>
            </center>
        </div>
    )
}

export default SignUp