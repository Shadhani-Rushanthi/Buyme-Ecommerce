import * as React from 'react'
import './SaleCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const SaleCard = (props) => {

  const navigate = useNavigate()

  const navigateToItemDescription = async () => {
    let details = props.itemDetails;
    navigate('/Description', {state:{itemDetails:details}})
  }

  return (
    <div className="card-container" style={{width: props.isSale ? "200px" : "150px"}} onClick={navigateToItemDescription}>
        <div className="cardImg">
            {/* <img src='https://static-01.daraz.lk/p/2698d521522f269a4b2b8dfee371eb03.jpg' alt="img" className='itemImg' style={{width: (props.isSale ? "200px" : "150px"),height: (props.isSale ? "200px" : "150px")}}/> */}
            <img src={props.itemDetails.mainImg}
               alt="img" className='itemImg' style={{width: (props.isSale ? "200px" : "150px"),height: (props.isSale ? "200px" : "150px")}}/>
        </div>
        <div className="cardDesc">
            <h1 className="cardname">{props.itemDetails.name}</h1>
            <h1 className="cardprice">Rs. {props.itemDetails.stock.map(st => (st.itemPrice))}</h1>
            {props.isSale && <span className="sale">Rs. 1800</span>}
            <span className="rating">
                <FontAwesomeIcon className="startIcon" icon={faStar} />
                <FontAwesomeIcon className="startIcon" icon={faStar} />
                <FontAwesomeIcon className="startIcon" icon={faStar} />
                <FontAwesomeIcon className="startIcon" icon={faStarHalfAlt} />
                   4.9
            </span>
        </div>
    </div>
  )
}

export default SaleCard