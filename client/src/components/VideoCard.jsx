import React from 'react'

const VideoCard = (detailProduct) => {
  let product = detailProduct.detailProduct;

  return (
    <section className='flex align-middle w-full h-full rounded-lg pr-6 pt-16 pb-9 mt-3'>
      <img className='w-full h-full rounded-lg shadow-xl' src={product.image} />
    </section>
  )
}

export default VideoCard