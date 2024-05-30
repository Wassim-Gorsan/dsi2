
import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const navigate= useNavigate();
    
    
    const [inpval, setinpval] = useState({
        name: "",
        email: "",
        password: "",
        cpassword:""
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

    const addUserData = async(e) => {
        e.preventDefault();                                // for get no refresh the page when you hit the submit button
        
        const {name,email,password,cpassword} = inpval;    // destructing here

        if(name === ""){
            alert("Please Enter Your Name");
        }else if(email === ""){
            alert("Please Enter Your Email");
        }else if(!email.includes("@")){
            alert(" Enter A Valid Email");
        }else if(password === ""){
            alert("Please Enter Your password");
        }else if(password.length < 6){
            alert("password must be 6 char");
        }else if(cpassword === ""){
            alert("enter your confirm Password");
        }else if(cpassword.length < 6){
            alert("password must be 6 char");
        }else if(password !== cpassword){
            alert("password and confirm password not match");
        }else{
            //console.log("User Registration successfully Done");

            const data = await fetch("http://localhost:8009/register", {       // connect react and nodejs app
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    name, email, password, cpassword
                })
            });

            const res = await data.json();
            //console.log(res.status);
            if(res.status == 201){
                // alert("user register done");
                setinpval({...inpval,name:"",email:"",password:"",cpassword:""});
                navigate("/")

            }
        }
    
    }

return (
    <>
    <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Sing Up</h1>
                    <p >
                        We are glad that you will be using Project Cloud to manage your <br />
                        tasks! We hope that you will get like it.
                    </p>
            </div>
            <form>
                        <div className="form_input">
                            <label htmlFor="text">Name</label>
                            <input type="text" onChange={setVal} value={inpval.name} name="name" id="name" placeholder='Enter Your Name ' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)} >
                                    {!passShow ? "Show" : "Hide"}                    
                                </div>
                            </div>
                            
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword}  name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)} >
                                    {!cpassShow ? "Show" : "Hide"}                    
                                </div>
                            </div>
                            
                        </div>
                        <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Already have an Account? <NavLink to="/">Log In</NavLink> </p>
            </form>
        </div>
    </section>
    </>
);
};

export default Register;
