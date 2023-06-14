import React, { useEffect, useState } from 'react'
import './Register.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Register = ({isLogin, viewLogin,onChangeView, isShop, onClickRegister, onUserLogged}) => {

  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMsg] = useState("")
  const [user, setUser] = useState([])
  
  const navigate = useNavigate()

  // const {data} = UseFetch("user/getbyemail/"+email);
  useEffect(()=>{
    console.log(viewLogin)
    if(viewLogin){
      document.getElementById("registerContainer").style.display="flex"
    }else{
      document.getElementById("registerContainer").style.display="none"
    }
  }, [viewLogin])

  const handleUserRegistration =async (e)=> {
    setErrorMsg("")
    if(password !== conPassword){
      setErrorMsg("Passwords are not matching");
    }else{
      let user, url;
      if(!isShop) {
        url = 'auth/register';
        user = {
          username:username,
          email: email,
          password: password
        }
      }else{
        url = 'shop/register';
        user = {
          username:username,
          email: email,
          password: password,
          address: address,
          description:description
        }
      }
      axios.post(url,user)
      .then((response) => {
        setUser(response);
        if(response.data === "User has been created"){
          setUserName("");setEmail("");setPassword("");conPassword("");setDescription("");setAddress("");
          onUserLogged()
          onChangeView(false)
        }
      }).catch(error => {
        console.log(error);
      })
      console.log(user)
    }
  }

  const handleUserLogin = async (e) => {
    if(email !== "" && password !== "")
    {
      let url = isShop ? 'shop/login/'+email+'/'+password : 'auth/checkLogin/'+email+'/'+password
      axios.get(url)
      .then((response) => {
        console.log(response)
        if(response.data === "Invalid User" || response.data === "Incorrect Password"){
          setErrorMsg(response.data)
        }else{
          console.log(response)
          setEmail("");setPassword("");
          onUserLogged()
          onChangeView(false)
          if (isShop){
            navigate("/SellerHome")
          }
        }
      }).catch(error=> {
        console.log(error)
      })
    }
  }

  return (
    <div className="registerContainer" id="registerContainer" on>
        <div className="form-container">
            <FontAwesomeIcon icon={faClose} className='iconClose'onClick={onChangeView}/>
            <div className="registerImg">
                {/* <img src='/loginImg.jpg' alt="" /> */}
            </div>
            <div className="form-section">
                <button className="auth-btn"><FontAwesomeIcon icon={faGoogle} />   Sign in with Google</button>
                <span className="loginhr">or</span>
                <div className="form">
                {isLogin ? (
                  <>
                  <div className='input'>
                    <label htmlFor="">Email</label>
                    <input type="email" id='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
                  </div>
                  <div className='input'>
                    <label htmlFor="">Password</label>
                    <input type="Password" id='pwd' onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
                  </div>
                  <span className='error'>{errorMessage}</span>
                  <input type="submit" value="Login" className='submit' onClick={(e)=>{handleUserLogin(e)}} />
                  <p>Don't have an account? <span className='change' onClick={onClickRegister}>create Account</span></p>
                  </>
                ) : (
                  !isShop ? (
                    <>
                      <div className='input' action="">
                        <label htmlFor="">Name</label>
                        <input type="text" id='Name' onChange={(e)=>{setUserName(e.target.value)}} value={username} />
                      </div>
                      <div className='input'>
                        <label htmlFor="">Email</label>
                        <input type="email" id='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
                      </div>
                      <div className='input'>
                        <label htmlFor="">Password</label>
                        <input type="Password" id='pwd' onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
                      </div>
                      <div className='input'>
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" id='conpwd' onChange={(e)=>{setConPassword(e.target.value)}} value={conPassword} required/>
                      </div>
                      <span className='error'>{errorMessage}</span>
                      <input type="submit" value="Create Account" className='submit' onClick={(e)=>{handleUserRegistration(e)}} />
                      <p>Already have an account? <span className='change' onClick={onClickRegister}>Login</span></p>
                    </>
                  ) : (
                    <>
                      <div className='input' action="">
                        <label htmlFor="">Name</label>
                        <input type="text" id='Name' onChange={(e)=>{setUserName(e.target.value)}} value={username} />
                      </div>
                      <div className='input'>
                        <label htmlFor="">Email</label>
                        <input type="email" id='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
                      </div>
                      <div className='input'>
                        <label htmlFor="">Password</label>
                        <input type="Password" id='pwd' onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
                      </div>
                      <div className='input'>
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" id='conpwd' onChange={(e)=>{setConPassword(e.target.value)}} value={conPassword} required/>
                      </div>
                      <div className='input' action="">
                        <label htmlFor="">Address</label>
                        <input type="text" id='Name' onChange={(e)=>{setAddress(e.target.value)}} value={address} />
                      </div>
                      <div className='input' action="">
                        <label htmlFor="">Description</label>
                        <input type="text" id='Name' onChange={(e)=>{setDescription(e.target.value)}} value={description} />
                      </div>
                      <span className='error'>{errorMessage}</span>
                      <input type="submit" value="Create Account" className='submit' onClick={(e)=>{handleUserRegistration(e)}} />
                      <p>Already have an account? <span className='change' onClick={onClickRegister}>Login</span></p>
                    </>
                  )
                )}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Register;