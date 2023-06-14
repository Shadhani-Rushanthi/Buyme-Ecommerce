import React from 'react'
import './Home.scss'
import Searchbar from '../../components/searchbar/Searchbar'
import Categories from '../../components/categories/Categories'
import Slider from '../../components/slider/Slider'
import SaleCard from '../../components/Cards/saleCard/SaleCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faTag } from '@fortawesome/free-solid-svg-icons'
import UseFetch from '../../hooks/UseFetch'

const Home = () => {
    
    const {data, loading, error} = UseFetch("item");
    
  return (
    <div className="mainContainer">
        <div className="header">
            <div className="right">
                <Categories isSmall={false}/>
            </div>
            <div className="left">
                <div className="searchWrapper">
                    <Searchbar/>
                </div>
                <div className="advertisment">
                    <Slider/>
                </div>
            </div>
        </div>
        <hr className='homeHr'/>
        <div className="FlashSale">
            <div className="titleSection">
                <div className='title'>
                    <FontAwesomeIcon icon={faBolt}/>
                    <h1>Flash Sale</h1>
                </div>
                <div className='more'>View more</div>
            </div>
            <div className="saleItems">
                {loading ? (<p>Loading</p>) : (
                    data.map((item)=>(
                        console.log(item),
                        console.log(item.name),
                        <SaleCard isSale={true} itemDetails={item}/>
                    ))
                )
                }
            </div>
        </div>

        <div className="JustForYou">
            <div className="titleSection">
                <div className='title'>
                    <FontAwesomeIcon icon={faTag}/>
                    <h1>Just For you</h1>
                </div>
                <div className='more'>View more</div>
            </div>
            <div className="justItems">
                {
                    data.map((item)=>(
                        <SaleCard isSale={false} itemDetails={item} key={item._id}/>
                    ))
                }
                {/* <SaleCard isSale={false}/>
                <SaleCard isSale={false}/>
                <SaleCard isSale={false}/>
                <SaleCard isSale={false}/>
                <SaleCard isSale={false}/>
                <SaleCard isSale={false}/>
                <SaleCard isSale={false}/>
                <SaleCard isSale={false}/> */}
            </div>
        </div>
    </div>
  )
}

export default Home 