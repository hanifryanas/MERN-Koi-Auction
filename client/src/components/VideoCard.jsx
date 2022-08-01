import React from 'react'

const VideoCard = (detailProduct) => {
  let product = detailProduct.detailProduct;

  return (
    <section className='flex align-middle w-full h-full rounded-lg px-7 py-16 mt-6'>
      <img className='w-full h-full rounded-lg' src={product.image} />
    </section>
  )
}

export default VideoCard