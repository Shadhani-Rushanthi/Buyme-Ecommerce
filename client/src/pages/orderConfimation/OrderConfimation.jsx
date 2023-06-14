import React, { useState } from 'react'
import './OrderConfimation.scss'
import Categories from '../../components/categories/Categories'
import Searchbar from '../../components/searchbar/Searchbar'
import OrderItem from '../../components/Cards/orderItem/OrderItem'
import Summary from '../../components/Cards/summary/Summary'
import { useLocation } from 'react-router-dom'


const OrderConfimation = ({options}) => {
    
  const location = useLocation()

  const [price, setPrice] = useState(location.state.itemDetails.stock[0].itemPrice)
  const [shippingFee, setShippingFee] = useState(location.state.itemDetails.stock[0].shippingFee)
  const [qty, setQty] = useState(location.state.totalQty);
  const [salePrice, setSalePrice] = useState(location.state.itemDetails.isSale[0].salePrice)
  const [totalPrice, setTotal] = useState(location.state.itemDetails.stock[0].itemPrice*qty)
  const [subTotal, setSubTotal] = useState(totalPrice+shippingFee-salePrice)

  const [toName, setToName] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [payment, setPayment] = useState("")


  const changeQty = (type) =>{
      if(type === "i"){
          setQty(qty+1)
          setTotal(price*(qty+1))
      } else if(type === "d" && qty >1){
          setQty (qty-1);
          setTotal(price*(qty-1))
      }
      setSubTotal(totalPrice+shippingFee-salePrice)
  }

  return (
    <div className="mainContainer">
        <div className="topWrapper">
            <div className="category">
                <Categories isSmall={true}/>
            </div>
            <div className="searchbar">
                <Searchbar/>
            </div>
        </div>
        <div className="orderconfirmation-wrapper">
            <div className="details">
                <div className="delivery-details">
                    <div className="heading">
                        <div className="name">Delivery</div>
                        <hr className='headingHr'/>
                    </div>
                    <div className="detail">
                        <div className="label">To : </div>
                        <input type="text" />
                    </div>
                    <div className="detail">
                        <div className="label">Address : </div>
                        <input type="text" />
                    </div>
                    <div className="detail">
                        <div className="label">Contact Number : </div>
                        <input type="number" maxLength={10}/>
                    </div>
                    <div className="detail">
                        <div className="label">email : </div>
                        <input type="email" />
                    </div>
                </div>
                <div className="payment-details">
                    <div className="heading">
                        <div className="name">Payment Option</div>
                        <hr className='headingHr'/>
                    </div>
                    <div className="paymentOptions">
                        <div className="option">
                            <input type="radio" id='payment1' name='payment' className="radio" />
                            <div className="label">Visa</div>
                            {/* <FontAwesomeIcon icon={faVisaCre}/> */}
                            {/* <FontAwesomeIcon icon={solid("cc-visa")} /> */}
                        </div>
                        <div className="option">
                            <input type="radio" id='payment2' name='payment' className="radio" />
                            <div className="label">Master</div>
                        </div>
                        <div className="option">
                            <input type="radio" id='payment3' name='payment' className="radio" />
                            <div className="label">Cash on delivery</div>
                        </div>
                    </div>
                </div>
                <div className="item-details">
                    <OrderItem isMyOrder={false} itemDetails={location.state.itemDetails} totalQty={qty} price={totalPrice}
                    onQtyChange={(type)=>changeQty(type)}/>
                </div>
            </div>
            <div className="summary">
                <Summary  totalQty={qty} price={totalPrice} shippingFee={shippingFee} subTotal={subTotal} salePrice={salePrice}/>
            </div>
        </div>
    </div>
  )
}

export default OrderConfimation