import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';

const Shop=()=>{
    const [lowPrice, setLowPrice]=useState("");
    const [heighPrice, setHeighPrice]=useState("");
    const [showFilter, setShowFilter]=useState(true);
    const [mydata, setMydata]= useState([]);
    const dispatch= useDispatch();


    const loadData=()=>{
        let api="http://localhost:3000/shopping";
        let api2="http://localhost:3000/kids";
        let api3="http://localhost:3000/men"
        let api4="http://localhost:3000/women";
        axios.get(api,api2,api3,api4).then((res)=>{
            setMydata(res.data);
        })
     }

     const showData=()=>{
        let api="http://localhost:3000/shopping";
        let api2="http://localhost:3000/kids";
        let api3="http://localhost:3000/men"
        let api4="http://localhost:3000/women";
       
        axios.get(api,api2,api3,api4).then((res)=>{
            setShowFilter(false);
            setMydata(res.data);
        })
     }
    
     useEffect(()=>{
        loadData();
     }, []);
    
     useEffect(()=>{
        if (lowPrice=="" && heighPrice=="")
        {
            setShowFilter(true);
        }
     })

     const cartDataAdd=(id, name, price, categ, desc, myimg)=>{
      dispatch(addToCart({id:id, name:name, price:price, category:categ, description:desc, image:myimg, qnty:1}))
     }
    
    
    
     const ans=mydata.map((key)=>{
      
       
       return(
        <>
        <Card style={{width:"380px", marginTop:"10px"}}>
            <img src={key.image} style={{height:"300px"}}  />
          <Card.Body>
            <Card.Title> {key.name} for {key.category}</Card.Title>
            <Card.Text>
                {key.description} 
                <br/>
                <span style={{color:'red', fontWeight:'bold'}}>Price : Rs. {key.price}/-</span>  
            </Card.Text>
            <Button variant="primary" 
            onClick={()=>{cartDataAdd(key.id, key.name, key.price, key.category, key.description, key.image)}}>add to cart</Button>
          </Card.Body>
        </Card>
    
        
        </>
       )
      
     })


     const ans1=mydata.map((key)=>{
      
        if (key.price>=lowPrice && key.price<=heighPrice)
        {
       return(
        <>
        <Card style={{width:"380px", marginTop:"10px"}}>
            <img src={key.image} style={{height:"300px"}}  />
          <Card.Body>
            <Card.Title> {key.name} for {key.category}</Card.Title>
            <Card.Text>
                {key.description} 
                <br/>
                <span style={{color:'red', fontWeight:'bold'}}>Price : Rs. {key.price}/-</span>  
            </Card.Text>
            <Button variant="primary" 
            onClick={()=>{cartDataAdd(key.id, key.name, key.price, key.category, key.description, key.image)}}>add to cart</Button>
          </Card.Body>
        </Card>
    
        
        </>
       )
        }
     })


    return(
        <>
          <h1> My Shop Page</h1>

          <div id="shoppage">
            <div id="shopmenu">
          
            <h4> Filter data by Price</h4>
           
           Enter Low Price <input type="text" value={lowPrice}
           onChange={(e)=>{setLowPrice(e.target.value)}} />
           <br/>
            To 
            <br/>
          Enter High Price  <input type="text" value={heighPrice}
          onChange={(e)=>{setHeighPrice(e.target.value)}} />
            <br/>
            <button onClick={showData}> Show Data</button>



            </div>
             <div id="shopdata">
                  
             <div id="cardData">
                {showFilter?ans:ans1}      
            </div>

             </div>

          </div>
        </>
    )
}

export default Shop;