import React from 'react'
import './OrderedItem.scss'
import { useLocation } from 'react-router-dom';

const OrderedItem = (props) => {


  return (
    <div className="orderdItem-wrapper">
      <div className="top-container">
        <div className="orderId">
          Order <span className="id">#23451232</span>
        </div>
        <div className="date">29 March 2023 12:23.14</div>
      </div>
      <div className="bottom-container">
        <div className="orderItemImg">
            <img src='https://static-01.daraz.lk/p/2698d521522f269a4b2b8dfee371eb03.jpg' alt="img" className='itemImg'/>
        </div>
        <div className="orderDesc">
            <h1 className="cardname">Shoes</h1>
            <h1 className="orderdShop">from shop name</h1>
            <div className="status-wrapper">
              <div className="status">Deliverd</div>
              <div className="date">29 March 2023 12:23.14</div>
            </div>
            <div className="price-wrapper">
              <div className="qty">Qty 0</div>
              <div className="price">Rs. 1250</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OrderedItem