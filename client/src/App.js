import './pages/Home/Home.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import './main.scss'
import Footer from './components/footer/Footer';
import ItemPage from './pages/Items/ItemPage';
import Description from './pages/Description/Description';
import OrderConfimation from './pages/orderConfimation/OrderConfimation';
import Cart from './pages/Cart/Cart';
import Account from './pages/Account/Account';
import { useEffect, useState } from 'react';
import Register from './components/Register/Register';
import axios from 'axios';
import UseFetch from './hooks/UseFetch';
import SellerHome from './pages/SellerHome/SellerHome';
import OrderedItem from './components/Cards/orderdItem/OrderedItem';
import OrderItem from './components/Cards/orderItem/OrderItem';


function App() { 

  const [lightTheme, setTheme] = useState(true)
  const [isLogin, setLogin] = useState(false)
  const [userLogged, setUserLogged] = useState(false)
  const [isShop, setShop] = useState(false)
  const [viewLogin, setViewLogin] = useState(false)

  useEffect(() => {
    try {
      axios.get('auth/verifyToken')
      .then((response) => {
        console.log(response)
        if(response.data == "You are not authenticated!" || response.data === "Token is not valid!"){
          setUserLogged(false)
        }else{
          setUserLogged(true)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [userLogged])



  // useEffect(()=>{
  //   try {
  //     axios.get('category/')
  //     .then((response) => {
  //       console.log(response)
  //       setCategory(response.data)
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, Categories)

  useEffect(() => {
    const root = document.querySelectorAll("body *");
    root.forEach((element)=>{
      if(element.tagName !== "svg" && element.tagName !== "path"){
        element?.style.setProperty("background-color",lightTheme ? "#FFFFFF" : "#000000");
        element?.style.setProperty("color", lightTheme ? "#000000" : "#FFFFFF");
      }
    })
  }, [lightTheme]);


  
  console.log(viewLogin)
  
  return (

    <div className={lightTheme ? "root" : "root darkTheme"}  >
      <Navbar onThemeChange={() => setTheme(!lightTheme)} 
              onClickLogin={()=>{setLogin(true);setViewLogin(true)}} 
              onClickShop={()=>{setLogin(true);setShop(true);setViewLogin(true)}} 
              onClickRegister={()=>{setLogin(false);setViewLogin(true)}}
              userLogged={userLogged}
              onUserLogged={()=>setUserLogged(!userLogged)}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Items' element={<ItemPage/>}/>
          <Route path='/Description' element={<Description/>}/>
          <Route path='/OrderItem' element={<OrderItem/>}/>
          <Route path='/OrderedItem' element={<OrderedItem/>}/>
          <Route path='/OrderConfirmation' element={<OrderConfimation/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Account' element={<Account/>}/>
          <Route path='/SellerHome' element={<SellerHome/>}/>
        </Routes>
      <Register isLogin={isLogin} 
                viewLogin={viewLogin} 
                onChangeView={()=>setViewLogin(false)} 
                isShop={isShop} 
                onClickRegister={() => setLogin(!isLogin)}
                onUserLogged={()=>setUserLogged(!userLogged)} />
      <Footer/>
    </div>
  );
}

export default App;
