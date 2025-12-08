import React, {useState, useEffect} from "react";


const SignIn = () => {
    const  [data, setdata] = useState({
        username:'',
        password:''
    })
    const {username,password} = data;
    const changeHandler = e => {
        setdata({...data,[e.target.name]:[e.target.value ]})
    }
    const submitHandler = e =>{ 
        e.preventDefault() 
        console.log(data)
    }

    return(
        <div>
            <center>
               <form onSubmit={submitHandler}>
                <input type="text" name="username" value={username} onChange={changeHandler} placeholder="Username"/>
                <input type="password" name="password" value={password} onChange={changeHandler} placeholder="Password"/> 
                <input type="submit" name="submit" />
               </form>
            </center>
        </div>
    )
     
}

export default SignIn