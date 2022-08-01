import React from 'react'

const InfoCard = (detailProduct) => {
  let product = detailProduct.detailProduct;
  let percentageTimeLeft = (new Date(product.date) - new Date())/(1000*60*60*24);
  let timeLeftDay = Math.floor(percentageTimeLeft);
  let timeLeftHour = Math.floor((percentageTimeLeft - timeLeftDay)*24);
  let timeLeftMinute = Math.floor(((percentageTimeLeft - timeLeftDay)*24 - timeLeftHour)*60);
  (timeLeftDay>0) ? timeLeftDay = timeLeftDay=timeLeftDay+' d ' : timeLeftDay = null;
  (timeLeftHour>0) ? timeLeftHour = timeLeftHour+' h ' : timeLeftHour = null;
  (timeLeftMinute>0) ? timeLeftMinute = timeLeftMinute+' m ' : timeLeftMinute = null;
  
  return (
    <section className='flex flex-col gap-1'>
      <p className='text-left ml-10 mt-3 text-5xl'>{product.type}</p>
      <section className='grid grid-cols-2 mx-8 my-3 py-4 bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col px-3 py-3 ml-14 w-full'>
          <p className='flex justify-start text-left text-gray-400'>Length</p>
          <span className='flex justify-start text-left mt-3 text-3xl'>{product.length}<span className='text-left ml-2 mt-1 text-xl'>cm</span></span>
        </div>
        <div className='flex flex-col px-3 py-3 w-2/3'>
          <p className='flex justify-start text-left text-gray-400'>Age</p>
          <span className='flex justify-start text-left mt-3 text-3xl'>Tosai</span>
        </div>
        <div className='flex flex-col px-3 py-3 ml-14 w-full'>
          <p className='flex justify-start text-left text-gray-400'>Gender</p>
          <span className='flex justify-start text-left mt-2 text-3xl'>{product.gender}</span>
        </div>
        <div className='flex flex-col px-3 py-3 w-2/3'>
          <p className='flex justify-start text-left text-gray-400'>Time Left</p>
          <span className='flex justify-start text-left mt-3 text-xl'> {timeLeftDay}{timeLeftHour}{timeLeftMinute}</span>
        </div>
      </section>
    </section>
  )
}

export default InfoCard