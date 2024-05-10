// Component for user login

import React, {useState} from 'react';
import Header from '../Header/Header';
import './Login.css';

const Login = ({onClose}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [open,setOpen] = useState(true);

    let login_url = window.location.origin + "/djangoapp/login";

    const login = async (e) => {
        // Prevent default submission of the form and refreshing the page
        e.preventDefault();

        // fetch the user given username and password
        const res = await fetch(login_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userName": userName, 
                "password": password
            }),
            
        });

        const user = await res.json();

        //Check if the user is authenticated
        if (user.status !=null && user.status === "Authenticated") {
            sessionStorage.setItem("username", user.userName); // Set the username in the Header component
            setOpen(false);
        }
        else {
            alert("Sorry the user couldnot be authenticated!")
        }
    };

    if(!open) { // If login successfull,  redirects the user to the home page
        window.location.href = "/";
    };

    return (
        <div>
            <Header/>
            <div onClick={onClose}>
                <div
                    onClick={(e) => {
                    e.stopPropagation();
                    }}
                    className='modalContainer'
                >
                    <form className="login_panel" style={{}} onSubmit={login}>
                        <div>
                        <span className="input_field">Username </span>
                        <input type="text"  name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div>
                        <span className="input_field">Password </span>
                        <input name="psw" type="password"  placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>            
                        </div>
                        <div>
                        <input className="action_button" type="submit" value="Login"/>
                        <input className="action_button" type="button" value="Cancel" onClick={()=>setOpen(false)}/>
                        </div>
                        <a className="loginlink" href="/register">Register Now</a>
                    </form>
                </div>
            </div>            

        </div>
    );
};

export default Login;