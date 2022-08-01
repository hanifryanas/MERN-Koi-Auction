import React from 'react'
import axios from 'axios'
import { useStateContext } from '../contexts/ContextProvider'

const ActionCard = (detailProduct) => {
  const { api, user, setNewUpdateProduct } = useStateContext()

  let product = detailProduct.detailProduct;
  
  const handlePriceValue = (value) => {
    let bidPrice = value.price + value.range;
    return 'Rp ' + bidPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleRangeValue = (value) => {
    let bidRange = value.range + 0;
    return bidRange.toString().slice(0, -3) + 'K';
  }

  const handleBidOrder = (product) => {
    let bidPrice = document.getElementById('bidPriceOrder').value;
    bidPrice = parseInt(bidPrice.replace(/[^0-9]/g, ''));

    axios.put(`${api}/product/${product._id}/price`, {
      price: bidPrice
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

    setNewUpdateProduct(Date.now());

    axios.post(`${api}/order`, {
      user: user._id,
      username : user.username,
      product: product._id,
      price: bidPrice,
      status: 'pending'
    })
    .then(res => {
      console.log(res);
      alert('Bid Order Success');
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section className='flex flex-row justify-start items-center h-4/5 mx-8 my-2 bg-white rounded-lg shadow-lg'>
      <div className='flex flex-col h-full w-1/4 ml-16 justify-center'>
        <label className='flex justify-start text-gray-400'>Bid Price </label>
        <input type="text" id='bidPriceOrder' readOnly className='h-1/3 text-3xl' value={handlePriceValue(product)}/>
      </div>
      <div className='flex flex-col w-1/6 h-full ml-28 justify-center'>
        <label className='flex justify-start text-gray-400'>Bid Range</label>
        <input type="text" readOnly className='h-1/3 text-2xl' value={handleRangeValue(product)}/>
      </div>
      <div className='flex flex-col mx-5 w-1/6 h-full justify-center'>
        <button onClick={()=>handleBidOrder(product)} className='bg-slate-200 ml-16 h-1/3 w-full rounded-lg text-xl hover:bg-gray-400 hover:text-white'>Bid Now</button>
      </div>
    </section>
  )
}

export default ActionCard