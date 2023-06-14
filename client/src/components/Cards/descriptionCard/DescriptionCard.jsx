import React, { useState } from 'react'
import './DescriptionCard.scss'
import '../../../variables.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const DescriptionCard = (props) => {
    const navigate = useNavigate()

    const [price, setPrice] = useState(props.itemDetails.stock[0].itemPrice)
    const [shippingFee, setShippingFee] = useState(props.itemDetails.stock[0].shippingFee)
    const [qty, setQty] = useState(props.itemDetails.stock[0].stockQty > 0 ? 1 : 0);
    const [stockEnd, setStockEnd] = useState(props.itemDetails.stock[0].stockQty > 0 ? false: true)
    const [totalPrice, setTotal] = useState(price+shippingFee)

    console.log(props.itemDetails.stock[0].itemPrice+ "  price of item", props.itemDetails.stock[0].shippingFee)
    const changeQty = (type) =>{
        if(type === "i"){
            setQty(qty+1)
            setTotal(shippingFee + (price*(qty+1)))
        } else if(type === "d" && qty >1){
            setStockEnd(false)
            setQty (qty-1);
            setTotal(shippingFee + (price*(qty-1)))
        }
    }

    const orderConfirm = () => {
        navigate('/OrderConfirmation', {state:{itemDetails:props.itemDetails, price:totalPrice, totalQty:qty}})
    }

    return (
        <div className="descrption-container">
            <div className="photo-section">
                <div className="mainPhoto">
                    <img src={props.itemDetails.mainImg} alt="" className="mainIng" />
                </div>
                <div className="subImages">
                    <img src="https://static-01.daraz.lk/p/2698d521522f269a4b2b8dfee371eb03.jpg" alt="sub" className="subImg" />
                    <img src="https://static-01.daraz.lk/p/2698d521522f269a4b2b8dfee371eb03.jpg" alt="sub" className="subImg" />
                    <img src="https://static-01.daraz.lk/p/2698d521522f269a4b2b8dfee371eb03.jpg" alt="sub" className="subImg" />
                </div>
            </div>
            <div className="desc-section">
                <div className="name">{props.itemDetails.name}</div>
                <div className="desc">descrption goes here</div>
                <div className="reviews">
                    <div className="reviews">
                        <span className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfAlt} />
                        {props.itemDetails.rating}
                    </span>
                    </div>
                    <div className="comments">1 reviews</div>
                    <div className="solds">0 solds</div>
                </div>
                <hr className="descHr"/>
                <div className="costs">
                    <div className="cost">Rs.{price}</div>
                    <div className="originalCost">Rs. 1900</div>
                    <div className="salep">25%</div>
                </div>
                <div className="quantity">
                    <div className="qty">Quantity</div>
                    <div className="qtyFilter">
                        <button className="decrease" onClick={()=>changeQty("d")} >-</button>
                        <input type="number" min={0} disabled value={qty} className='number'/>
                        <button className="increase" onClick={()=>changeQty("i")} itemPrice disabled={qty>=props.itemDetails.stock[0].stockQty} >+</button>
                        <span style={{color:"red",fontSize:11}}>{stockEnd ? "Out of Stock" : ""}</span>
                    </div>
                </div>
                <div className="Fee">
                    <div className="feetype">Shipping Fee</div>
                    <div className="price">Rs. {shippingFee}</div>
                </div>
                <div className="Fee">
                    <div className="feetype">Total Price</div>
                    <div className="price total">Rs. {totalPrice}</div>
                </div>
                <div className="buttons">
                    <button className="button btncart" disabled={stockEnd} >Add to Card</button>
                    <button className="button btnbuy" disabled={stockEnd} onClick={orderConfirm}>Buy now</button>
                </div>
            </div>
        </div>
    )
}

export default DescriptionCard