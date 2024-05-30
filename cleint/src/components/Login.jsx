import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./mix.css";

const Login = () => {
    const [passShow, setpassShow] = useState(false);
     const navigate=useNavigate()
    const [inpval, setinpval] = useState({       
        email: "",
        password: "",
    });
    

    const setVal = (e) => {
        //console.log(e.target.value);
        const {name, value} = e.target;
        setinpval(() => {
            return {
                ...inpval,
                [name]:value                             // this function setVal take the setInpVal function and return all the object inpVal name and value
            }
        })
    };


    const LoginUser = async(e) => {
        e.preventDefault(); 

        const {email, password} = inpval;
        if(email === ""){
            alert("Please Enter Your Email");
        }else if(!email.includes("@")){
            alert(" Enter A Valid Email");
        }else if(password === ""){
            alert("Please Enter Your password");
        }else if(password.length < 6){
            alert("password must be 6 char");
        }else{
            //console.log("Log In successful ");
            const data = await fetch("http://localhost:8009/login", {       // connect react and nodejs app
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            console.log("res.data",res.result.userValid.email);
            if(res.status == 201){
                localStorage.setItem("usersdatatoken", res.result.token)    //setItem this method allows you to store values in the localStorage object.
                setinpval({...inpval,email:"",password:""});
                switch (res.result.userValid.email){
                    case "admin@gmail.com" :
                        navigate("/admin") 
                        break;
                    default:  
                    navigate("/classes")
                } 
                
            }
        }

    }
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setpassShow(!passShow)} >
                                    {!passShow ? "Show" : "Hide"}                     
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={LoginUser} >Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink>  </p>
                    </form>
                    
                </div>
            </section>
        </>
    );
}

export default Login;
