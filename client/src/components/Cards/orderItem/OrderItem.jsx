import React, { useState } from 'react'
import './OrderItem.scss'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

const OrderItem = (props) => {
  console.log(props)
  // const location = useLocation();
  // const [price, setPrice] = useState(props.itemDetails.stock[0].itemPrice)
  // const [shippingFee, setShippingFee] = useState(250)
  // const [qty, setQty] = useState(props.totalQty);
  // const [totalPrice, setTotal] = useState(price*qty)

  
  // console.log(location.state.itemDetails + "location")

  // const changeQty = (type) =>{
  //     if(type === "i"){
  //         setQty(qty+1)
  //         setTotal(price*(qty+1))
  //     } else if(type === "d" && qty >1){
  //         setQty (qty-1);
  //         setTotal(price*(qty-1))
  //     }
  // }
  return (
    <div className="itemContianer">
        {props.isMyOrder && <div className="select">
          <input type="checkbox" />
        </div>}
        <div className="orderitemImg">
          <img src="https://static-01.daraz.lk/p/c0d61a43f884c905309646e6da64485b.jpg" alt="" />
        </div>
        <div className="itemorderDetails">
          <div className="priceQty">
            <h1 className="cardname">{props.itemDetails.name}</h1>
            {props.isMyOrder &&<div className="delete">
              <FontAwesomeIcon icon={faHeart} className='favIcon'/>
              <FontAwesomeIcon icon={faTrash} className='deleteIcon'/>
            </div>}
          </div>
          <div className="desc">descrption goes here</div>
          <div className="priceQty">
            <div className="quantity">
              <div className="qtyFilter">
                <div className="decrease qtyChange" onClick={()=>props.onQtyChange("d")}>-</div>
                <input type="number" min={0} disabled value={props.totalQty} className='number'/>
                <div className="increase qtyChange" onClick={()=>props.onQtyChange("i")}>+</div>
              </div>
            </div>
              <h1 className="cardprice">Rs. {props.price}</h1>
          </div>
        </div>
    </div>
  )
}

export default OrderItem