import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

export default function Register() {
    const [user, setUser] = useState({
        first_name:"", 
        last_name:"", 
        email:"", 
        password:"", 
        age:0,
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
          let baseUrl = "https://route-egypt-api.herokuapp.com/";
          let apiMethod = "signup";
          let {data} = await Axios.post(`${baseUrl}${apiMethod}`,user);
          console.log(data);
          if(data.message === "success"){ //Registeration Is Success
            //Navigation To Login Component
            // setIsLoading(false);
            navigate("/login");
          }else {
            //You Have Error In Registeration 
            setError(data.message);
            // setIsLoading(false);
          }
        }else {
            //   setIsLoading(false);
        }
     
    }

    function isEmpty(){
        let firstName = document.querySelector("#firstName");
        let lastName = document.querySelector("#lastNAme");
        let email = document.querySelector("#email");
        let age = document.querySelector("#age");
        let password = document.querySelector("#password");
        if (firstName.value === "" && lastName.value === "" && email.value === "" && age.value === "" && password.value === "")  {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }
    }

    function firstNameValidation(e) {
       let nameRegExp = /^[A-Z][-a-zA-Z]+$/;
       let nametxt = e.target.value;
       if (nameRegExp.test(nametxt)) {
        document.querySelector("#nameAlert").classList.add("d-none");
        document.querySelector("#nameAlert").classList.remove("d-block");
        return true;
       }else {
        document.querySelector("#nameAlert").classList.add("d-block");
        document.querySelector("#nameAlert").classList.remove("d-none");
        return false;
       }
    }

    function lastNameValidation(e) {
        let nameRegExp = /^[A-Z][-a-zA-Z]+$/;
       let nametxt = e.target.value;
       if (nameRegExp.test(nametxt)) {
        document.querySelector("#nameAlert").classList.add("d-none");
        document.querySelector("#nameAlert").classList.remove("d-block");
        return true;
       }else {
        document.querySelector("#nameAlert").classList.add("d-block");
        document.querySelector("#nameAlert").classList.remove("d-none");
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

    function ageValidation(e){
        let ageRegExp = /^\S[0-9]{0,3}$/;
       let agetxt = e.target.value;
       if (ageRegExp.test(agetxt)) {
        document.querySelector("#ageAlert").classList.add("d-none");
        document.querySelector("#ageAlert").classList.remove("d-block");
        return true;
       }else {
        document.querySelector("#ageAlert").classList.add("d-block");
        document.querySelector("#ageAlert").classList.remove("d-none");
        return false;
       }
    }


  return (
    <>
        <section id="register" className="py-5">
            <div className="container py-5">
                <form onSubmit={submitForm} className='form p-5 center text-white flex-column'>
                    <div className="user-name w-100 center">
                        <input type="text" onChange={getUserData} onKeyUp={firstNameValidation} placeholder='Enter Your First Name' name="first_name" id="firstName" className='w-50 mx-1 p-2'/>
                        <input type="text" onChange={getUserData} onKeyUp={lastNameValidation} placeholder='Enter Your Last Name' name="last_name" id="lastName" className='w-50 p-2'/>
                    </div>
                    <div id='nameAlert' className="alert alert-danger w-100 p-2 d-none">Enter Valid Name</div>
                    <input type="email" onChange={getUserData} onKeyUp={emailValidation} placeholder='Enter Your E-mail' name='email' id='email' className='w-100 p-2'/>
                    <div id='emailAlert' className="alert alert-danger w-100 p-2 d-none">Enter Valid E-mail</div>
                    <input type="number" onChange={getUserData} onKeyUp={ageValidation} placeholder='Enter Your Age' name='age' id='age' className='w-100 p-2'/>
                    <div id='ageAlert'  className="alert alert-danger w-100 p-2 d-none">Enter An Valid Age</div>
                    <input type="password" onChange={getUserData} onKeyUp={passValidation} placeholder='Enter Your password' name='password' id='password' className='w-100 p-2'/>
                    <div id='passAlert' className="alert w-100 alert-danger p-2 d-none">
                        Please Enter A Valid Password:
                        <ul>
                            <li>Password must contain at least eight characters</li>
                            <li>At least one number</li>
                            <li>And both lower and uppercase letters</li>
                            <li>And special characters</li>
                        </ul>
                    </div>
                    <div className="error text-danger">{error}</div>
                    <button type='submit' className='btn btn-main align-self-start'>Register</button>
                </form>
            </div>
        </section>
    </>
  )
}
