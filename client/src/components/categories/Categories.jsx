import React, { useEffect, useState } from 'react'
import './categories.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faChevronDown, faDownLong, faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Categories = ({isSmall}) => {
  const navigate = useNavigate()
  const [isClick, setIsClick] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    try {
      axios.get('category')
      .then((response) => {
        setCategories(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  },[])

  const viewCategoryItems = async () => {
    // navigate('/Items', {state:{itemDetails:props.itemDetails, price:totalPrice, totalQty:qty}})
    navigate('/Items')
  }

  return (
    <>
        {isSmall ?  
        <div className='smallCat'>
          <div className="titleWrapper" onClick={()=>setIsClick(!isClick)}>
            <FontAwesomeIcon icon={faList} className='list'/>
            <h1 className="title">Categories</h1>
            <FontAwesomeIcon icon={faChevronDown} className='down'/>
          </div> 
          {<div className="typesPopUp" style={{display: isClick? "flex" : "none"}}>
            { 
              categories.map((cate)=>(
                <p className="type" key={cate._id} onClick={viewCategoryItems}>{cate.category}</p>                    
              ))
            }
          </div>}
          </div>
        :
          <div className="category-container">
            <div className="titleWrapper">
                <FontAwesomeIcon icon={faList} className='list'/>
                <h1 className="title">Categories</h1>
            </div> 
            <div className="types">
              { 
                categories.map((cate)=>(
                  <p className="type" key={cate._id} onClick={viewCategoryItems}>{cate.category}</p>                    
                ))
              }
            </div>
          </div>
      }
      </>
  )
}

export default Categories