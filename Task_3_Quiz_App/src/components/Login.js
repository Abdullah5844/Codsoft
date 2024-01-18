import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({setuser}) {

    const hist = useNavigate();
    useEffect(() => {
        let userr = localStorage.getItem("user")

        if(userr){
            hist("/")
        }
    }, [])
    const [username, setusername] = useState("")
    const [password, setpasswrod] = useState("")
    
    let login = ()=>{
        if(username!=='' && password!==''){
            let data = {
                username,
                password
            }
            console.log(data);
            fetch('http://localhost:3000/user/login' , {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then((res)=>
                res.json()
            ).then(data=>{
                if(data.success){
                    localStorage.setItem("user" , JSON.stringify(data.fuser))
                    localStorage.setItem("token" , JSON.stringify(data.token))
                    setuser(data.fuser)
                    hist("/")
                }
            })
        }
    }
  return (
    <>
        <h1>Login</h1>


        <input type="text" name={username} value={username} onChange={(e)=>setusername(e.target.value)} />
        <input type="text" name={password} value={password} onChange={(e)=>setpasswrod(e.target.value)} />

        <button onClick={login}>Signin</button>
    </>
  );
}
