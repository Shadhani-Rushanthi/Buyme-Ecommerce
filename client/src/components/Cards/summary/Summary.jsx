import React from 'react'
import './Summary.scss'

const Summary = (props) => {
  return (
    <div className="summary-container">
        <div className="name">Order Summary</div>
        <div className="summaryItem">
            <div className="label">Total items</div>
            <div className="label leftlable">{props.totalQty}</div>
        </div>
        <div className="summaryItem">
            <div className="label">Total item cost</div>
            <div className="label leftlable">Rs. {props.price}</div>
        </div>
        <div className="summaryItem">
            <div className="label">Total delivery fee</div>
            <div className="label leftlable">Rs. {props.shippingFee}</div>
        </div>
        <div className="summaryItem">
            <div className="label">Saved</div>
            <div className="label leftlable">Rs. {props.salePrice}</div>
        </div>
        <hr className="summarthr" />
        <div className="summaryItem">
            <div className="label">Total costs</div>
            <div className="label leftlable">Rs. {props.subTotal}</div>
        </div>
        <button className="button btnbuy btnsummary">Buy now</button>
        <div className="label terms">Upon clicking 'Place Order', I confirm I have read and acknowledged all terms and policies.</div>


    </div>
  )
}

export default Summary