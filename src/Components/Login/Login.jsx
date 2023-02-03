import React , {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

export default function Login(props) {

    const [user, setUser] = useState({
        email:"", 
        password:"", 
      });
    const [error,setError] = useState("");

    let navigate = useNavigate();


    function getUserData(e){
        let myUser = {...user}; //Copy Of State
        myUser[e.target.name] = e.target.value; //To Get Property Dynamically
        setUser(myUser);
        console.log(myUser);
    }

    async function submitForm(e){
        e.preventDefault();
        // setIsLoading(true);

    
        if(isEmpty){
          let baseUrl = "https://route-movies-api.vercel.app/";
          let apiMethod = "signin";
          let {data} = await Axios.post(`${baseUrl}${apiMethod}`,user);
          console.log(data);
          if(data.message === "success"){ //Login Is Success
            //Save The Token In Local Storage
            localStorage.setItem("Token", data.token);
            // setIsLoading(false);
            props.saveUserData();
            //Navigation To Home Component
            navigate("/home");
          }else {
            //You Have Error In Registeration 
            setError(data.message);
            // setIsLoading(false);
          }
        }else {
            //   setIsLoading(false);
        }
     
    }

    useEffect(()=>{
        if (localStorage.getItem("Token")){
        navigate("/home");
        }
    }, []);

    function isEmpty(){
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        if (email.value === "" && password.value === "")  {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }
    }

    function emailValidation(e){
        let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       let emailtxt = e.target.value;
       if (emailRegExp.test(emailtxt)) {
        document.querySelector("#emailAlert").classList.add("d-none");
        document.querySelector("#emailAlert").classList.remove("d-block");
        return true;
       }else {
        document.querySelector("#emailAlert").classList.add("d-block");
        document.querySelector("#emailAlert").classList.remove("d-none");
        return false;
       }
    }

    function passValidation(e){
        let passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
       let passtxt = e.target.value;
       if (passRegExp.test(passtxt)) {
        document.querySelector("#passAlert").classList.add("d-none");
        document.querySelector("#passAlert").classList.remove("d-block");
        return true;
       }else {
        document.querySelector("#passAlert").classList.add("d-block");
        document.querySelector("#passAlert").classList.remove("d-none");
        return false;
       }
    }

  return (
    <>
    <section id="login" className="py-5">
        <div className="container">
            <form onSubmit={submitForm} className='form p-5 center text-white flex-column'>
                <input type="email" onChange={getUserData} onKeyUp={emailValidation} placeholder='Enter Your E-mail' name='email' id='email' className='w-100 p-2'/>
                <div id='emailAlert' className="alert alert-danger w-100 d-none p-2">Please Enter A Valid E-mail</div>
                <input type="password" onChange={getUserData} onKeyUp={passValidation} placeholder='Enter Your password' name='password' id='password' className='w-100 p-2'/>
                <div id='passAlert' className="alert d-none w-100 alert-danger p-2">
                    Please Enter A Valid Password:
                    <ul>
                        <li>Password must contain at least eight characters</li>
                        <li>At least one number</li>
                        <li>And both lower and uppercase letters</li>
                        <li>And special characters</li>
                    </ul>
                </div>
                <div className="error text-danger">{error}</div>
                <button type='submit' className='btn btn-main align-self-start'>Login</button>
            </form>
        </div>
    </section>
</>
  )
}
