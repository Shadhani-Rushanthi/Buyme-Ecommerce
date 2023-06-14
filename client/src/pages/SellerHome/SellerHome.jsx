import React, { useEffect, useState } from 'react'
import './SellerHome.scss'
import Categories from '../../components/categories/Categories'
import SaleCard from '../../components/Cards/saleCard/SaleCard'
import { FileUploader } from "react-drag-drop-files";
import { useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
// import fs from 'fs'
// import { Promise } from 'mongoose';

const SellerHome = () => {

    // const upload = (e) =>{
    //     document.getElementById("mainImage").scr =URL.createObjectURL(e.target.files[0])
    // }
    const inputRef = useRef()
    const [file, setFile] = useState();
    const [sectionType, setSectionType] = useState("Stock")
    const [categories, setCategories] = useState([])

    const [itemName, setItemName] = useState("")
    const [mainImage, setMainImg] = useState({myFile : ""})
    const [qty, setQty] = useState()
    const [price, setPrice] = useState()
    const [shippingFee, setShippingFee] = useState()
    const [selectedCategory, setselectedCategory] = useState()
    const [selectedType, setselectedType] = useState()
    const [types, setTypes] = useState([])
    const [errorMessage, setErrorMessage] = useState()

    const [isAddCate, setIsAddCate] = useState(false)
    const [isAddType, setIsAddType] = useState(false)

    const [newCategory, setNewCategory] = useState("")
    var newCategoryId =""
    const [newType, setNewType] = useState("")
    // const imageBuffer = fs.readFileSync('upload.png');
    
    const fileTypes = ["JPG", "PNG", "GIF"];

    const handleImageUpload = async (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])        
        console.log(file)        
        const base64 = await createBase64(e.target.files[0])
        console.log(base64)
        setMainImg({...mainImage, myFile: base64})
        console.log({...mainImage})
    };

    const handleClick =  () => {
        inputRef.current.click()
    }

    const createBase64 = async (file)=>{
        return await new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () =>{
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        } )
    }

    const saveItemData = async () => {
        try {
            setErrorMessage("")
            if(itemName !="" && 
                selectedCategory != "" && 
                selectedType != "" &&
                price != "" &&
                shippingFee != ""){
                var Item = {
                    name: itemName,
                    itemType: selectedType,
                    stock:{
                        stockQty: qty,
                        itemPrice: price, 
                        shippingFee: shippingFee,
                        soldOut: 0
                    },
                    totalSold: 0,
                    mainImg:mainImage.myFile,
                    isSale: {
                        status:false,
                        salePrice:0,
                        rate:0
                    },
                    ratings: 0
                }
                console.log(Item)
                axios.post('item', Item)
                .then((response)=>{
                    console.log(response)
                    setItemName("");setPrice();setShippingFee();setFile("")
                }).catch((error)=>{
                    console.log(error)
                })
            }
            else{
                setErrorMessage("Please fill all the details and main Image")
            }
        } catch (error) {
            console.log(error)
        }
    }

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

  const createNewCategories = async ()=>{
    setErrorMessage("")
    console.log(newCategory, newType)

    const Category = {
        category: newCategory,
        types: newType
    }
    if(newCategory != ""){
        axios.get('category/getcategorybyname/'+newCategory)
        .then((response) =>{
            if(response.data.length == 0){
                console.log(response)
                axios.post('category',Category)
                .then((response) =>{
                    console.log(response)  
                    setNewCategory("")
                    newCategoryId = response.data._id;
                    console.log(response.data._id)  
                }).catch((error)=>{
                    console.log(error)
                })
            }
            else{
                setErrorMessage("The category already has defined")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
  }

  const createNewType = async () => {
    setErrorMessage("")
    let categoryId;
    const Type = {
        types : [newType]
    }
    if(document.getElementById("category").value != ""){
        axios.get('category/getcategorybyname/'+document.getElementById("category").value)
        .then((response) =>{
            console.log(response)
            categoryId = response.data[0]._id;
            response.data[0].types.map(type =>{
                console.log(type)
                if(type == newType){
                    setErrorMessage("Type is already defined in the category")
                    return
                }
            })
            axios.put('category/addtypes/'+categoryId, Type)
            .then((response) =>{
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        }).catch((error)=>{
            console.log(error)
        })
    }else{
        setErrorMessage("Please select the category first")
    }
  } 

  return (
    <div className="mainContainer">
        <div className="otherDetails">
            <div className="sectionType">
              <div onClick={()=>setSectionType("Stock")} className={sectionType=== "Stock" ? "stockType active" : "stockType"}>Stock</div>
              <div onClick={()=>setSectionType("addItem")} className={sectionType=== "addItem" ? "addItem active" : "addItem"}>Add Item</div>
            </div>
            <div className="sectionContainer">
                {sectionType === "Stock" ? (
                    <>
                    <div className="stockContainer">
                        <div className="categories">
                            <Categories/>
                        </div>
                        <div className="stockItems">
                            {/* <SaleCard isSale={false}/> */}
                        </div>
                    </div>
                    </>
                ) :(
                    <>
                    <div className="addItemSection">
                        <div className="imageUploader" onClick={handleClick}>
                            <div className="mainImageInput">
                                <input 
                                type='file'
                                accept='.jpg, .png, .jpeg, .svg'
                                ref={inputRef}
                                onChange={handleImageUpload}
                                style={{display:"none"}}/>
                                {file ?
                                    <img src={URL.createObjectURL(file)} alt="" id='mainImage'/> 
                                :
                                    <img src={require("./upload.png")} alt="" id='mainImage'/> 
                                }
                            </div>
                        </div>
                        <div className="itemDetails">
                            <div className='input'>
                                <label htmlFor="">Category</label>
                                {!isAddCate ? (
                                    <>
                                    <select name="category" id="category" onChange={(e)=>{setselectedCategory(e.target.value)}}>
                                        <option value="" selected>--Select--</option>
                                        {
                                            categories.map(cat =>(
                                                <option value={cat.category} key={cat._id}>{cat.category}</option>
                                                ))
                                            }
                                    </select>
                                    <button  className='addCate' onClick={()=>{setIsAddCate(!isAddCate)}} title='Add new Category'><FontAwesomeIcon icon={faAdd}/></button>
                                    </>
                                    ) : (
                                    <>
                                        <input type="name" id='newCate' class="input" onChange={(e)=>{setNewCategory(e.target.value)}} placeholder='Add new Category name' required/>
                                        <button  className='addCate' onClick={()=>{setIsAddCate(!isAddCate);createNewCategories()}} title='Save new Category'><FontAwesomeIcon icon={newCategory !="" ? faCheck: faClose}/></button>
                                    </>
                                    )
                                }
                            </div>
                            <div className='input'>
                                <label htmlFor="">Type</label>
                                {isAddType ? (
                                    <>
                                    <input type="name" id='newType' class="input" onChange={(e)=>{setNewType(e.target.value)}} placeholder='Add new Type name' required/>
                                    <button  className='addCate' onClick={()=>{setIsAddType(!isAddType); createNewType()}} title='Save new Type'><FontAwesomeIcon icon={newType !="" ? faCheck: faClose}/></button>
                                    </>
                                    ) : (
                                    <>
                                    <select name="type" id="type" onChange={(e)=>{setselectedType(e.target.value)}}>
                                        <option value="" selected>--Select--</option>
                                        { categories &&
                                            categories.map(cat =>(
                                                cat.category === selectedCategory ? (
                                                    cat.types.map(type=>(
                                                        <option value={type}>{type}</option>
                                                        ))
                                                        )
                                                        : 
                                                        ""
                                                        ))
                                                    }
                                    </select>
                                    <button  className='addCate' onClick={()=>{setIsAddType(!isAddType)}} title='Add new type for the category'><FontAwesomeIcon icon={faAdd}/></button>
                                    </>
                                    )}
                            </div>
                            <div className='input'>
                                <label htmlFor="">Name</label>
                                <input type="name" id='name' onChange={(e)=>{setItemName(e.target.value)}} value={itemName} required/>
                            </div>
                            <div className='input'>
                                <label htmlFor="">Quantity</label>
                                <input type="number" id='qty' onChange={(e)=>{setQty(e.target.value)}} value={qty} required/>
                            </div>
                            <div className='input'>
                                <label htmlFor="">Item Price</label>
                                <input type="number" id='price' onChange={(e)=>{setPrice(e.target.value)}} value={price} required/>
                            </div>
                            <div className='input'>
                                <label htmlFor="">Shipping Fee</label>
                                <input type="number" id='shipping' onChange={(e)=>{setShippingFee(e.target.value)}} value={shippingFee} required/>
                            </div>
                            <span className='error'>{errorMessage}</span>
                            <input type="submit" value="Add Item" className='submit' onClick={saveItemData} />
                        </div>
                    </div>
                </>
                )}
                </div>
            </div>
    </div>
  )
}

export default SellerHome;