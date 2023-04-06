import React from 'react'
import  axios  from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
let { id } = useParams();


let[myData,setData] = useState({})

 useEffect(()=>{
    getData()
 },[])
async function getData()
{
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setData(data.data)
}

  return (
    <>
    <div className="row align-items-center">
        <div className="col-md-3">
            <img src={myData.imageCover} className="w-100" alt="" />
        </div>
        <div className="col-md-9">
            <p>{myData.title}</p>
            <p className='text-muted'>{myData.description}</p>
            <b>{myData.price} EG</b>
            <p className='text-danger my-3'>{myData.category.name}</p>
             <button className='btn btn-success form-control my-4'>+Add</button>
        </div>
    </div>
    </>
  )
}
