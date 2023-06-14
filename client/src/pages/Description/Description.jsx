import React, { useState } from 'react'
import DescriptionCard from '../../components/Cards/descriptionCard/DescriptionCard'
import Categories from '../../components/categories/Categories'
import Searchbar from '../../components/searchbar/Searchbar'
import './Description.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faMessage, faPlus, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import SaleCard from '../../components/Cards/saleCard/SaleCard'
import Pagination from '../../components/pagination/Pagination'
import { useLocation } from 'react-router-dom'

const Description = ({options}) => {
  const [sectionType, setSectionType] = useState("description")
  const location = useLocation()
  console.log(location.state.itemDetails)
  
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
        <DescriptionCard itemDetails={location.state.itemDetails} />
        <div className="descriptionSection">
          <div className="shopDetails">
            <div className="shop">
              <h1 className="title">Shop name</h1>
              <div className="shopDesc">2K Followers</div>
              <div className="shopDesc">96% positive reviews</div>
              <div className="contact">
                <FontAwesomeIcon icon={faMessage}/>
                <span>contact</span>
              </div>
              <div className="follow-visit">
                <div className="follow"><FontAwesomeIcon icon={faPlus}/> Follow</div>
                <div className="visit">Visit</div>
              </div>
            </div>
            <div className="shopCategories">
              <div className="title">Shop Categories</div>
              <div className="types">
                <p className="type">Women’s Fashion</p>
                <p className="type">Men’s Fashion</p>
                <p className="type">Phones & Telecommunincations</p>
                <p className="type">Computer, Office & security</p>
                <p className="type">Consumer Electronics</p>
                <p className="type">Jewelry & Watches</p>
                <p className="type">Jewelry & Watches</p>
                <p className="type">Jewelry & Watches</p>
                <p className="type">Jewelry & Watches</p>
                <p className="type">Home, Pet & Appliances</p>
                <p className="type">Bags & Shoes</p>
                <p className="type">Toys, Kids & Babies</p>
                <p className="type">Beauty</p>
            </div>
            <div className="shopTopSales">
              <div className="title">Top Sale</div>
              {/* <SaleCard isSale={false}/>
              <SaleCard isSale={false}/>
              <SaleCard isSale={false}/>
              <SaleCard isSale={false}/> */}
            </div>
          </div>
          </div>
          <div className="otherDetails">
            <div className="sectionType">
              <div onClick={()=>setSectionType("description")} className={sectionType=== "description" ? "descType active" : "descType"}>Description</div>
              <div onClick={()=>setSectionType("review")} className={sectionType=== "review" ? "ReviewType active" : "ReviewType"}>Customer Reviews</div>
            </div>
            <div className="sectionContainer">
              {sectionType === "description" ? (
                <>
                  <div className="itemDescription">
                    <div className="descriptionSection">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sed sapiente explicabo perferendis natus eveniet necessitatibus. Soluta, dignissimos quos aliquid obcaecati id molestiae amet consectetur!
                      Lorem ipsum dolor sit amet consectetur <br/>adipisicing elit. Beatae, sed sapiente explicabo perferendis natus eveniet necessitatibus. Soluta, dignissimos quos aliquid obcaecati id molestiae amet consectetur!
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sed sapiente explicabo perferendis natus eveniet necessitatibus. Soluta, dignissimos quos aliquid obcaecati id molestiae amet consectetur!
                    </div>
                    <div className="descImgSection">
                      <img src="https://static-01.daraz.lk/p/c0d61a43f884c905309646e6da64485b.jpg" alt="" className="descImg" />
                      <img src="https://static-01.daraz.lk/p/2698d521522f269a4b2b8dfee371eb03.jpg" alt="" className="descImg" />
                    </div>
                  </div>
                </>
              ) :(
                <>
                <div className="reviewSection">
                  <div className="review">
                    <div className="cusName">
                      <div className="customer-name">A***Z</div>
                      <div className="flag"><FontAwesomeIcon icon={faFlag}/></div>
                    </div>
                    <span className="rating">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                    </span>
                    <div className="descriptionSection">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sed sapiente explicabo perferendis natus eveniet necessitatibus. Soluta, dignissimos quos aliquid obcaecati id molestiae amet consectetur!
                      </div>
                  </div>
                  <div className="review">
                    <div className="cusName">
                      <div className="customer-name">A***Z</div>
                      <div className="flag"><FontAwesomeIcon icon={faFlag}/></div>
                    </div>
                    <span className="rating">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                    </span>
                    <div className="descriptionSection">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sed sapiente explicabo perferendis natus eveniet necessitatibus. Soluta, dignissimos quos aliquid obcaecati id molestiae amet consectetur!
                      </div>
                  </div>
                  <div className="review">
                    <div className="cusName">
                      <div className="customer-name">A***Z</div>
                      <div className="flag"><FontAwesomeIcon icon={faFlag}/></div>
                    </div>
                    <span className="rating">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                    </span>
                    <div className="descriptionSection">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sed sapiente explicabo perferendis natus eveniet necessitatibus. Soluta, dignissimos quos aliquid obcaecati id molestiae amet consectetur!
                      </div>
                  </div>
                  <div className="review">
                    <div className="cusName">
                      <div className="customer-name">A***Z</div>
                      <div className="flag"><FontAwesomeIcon icon={faFlag}/></div>
                    </div>
                    <span className="rating">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                    </span>
                    <div className="descriptionSection">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sed sapiente explicabo perferendis natus eveniet necessitatibus. Soluta, dignissimos quos aliquid obcaecati id molestiae amet consectetur!
                      </div>
                  </div>
                  <Pagination/>
                </div>
              </>
              )}
            </div>
          </div>
          </div>
    </div>
  )
}

export default Description