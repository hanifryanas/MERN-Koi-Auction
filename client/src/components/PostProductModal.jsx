import React, {useState} from 'react'
import axios from 'axios'
import { useStateContext } from '../contexts/ContextProvider'
import { biddingData } from '../data/Template'

const PostProductModal = () => {
    const [rangeValue, setRangeValue] = useState(0)
    const { api, popUp, setPopUp, setNewUpdateProduct } = useStateContext()

    const handleCloseModal = (e) => {
        e.target.id === 'outsideModal' && setPopUp(null)
    }

    const onChangeRangeValue = (e) => {
        setRangeValue(e.target.value)
    }

    const handlePostProduct = (e) => {
        e.preventDefault();
        let dataType = document.getElementById('koiType').value;
        let dataSize = document.getElementById('koiSize').value;
        let dataGender = document.getElementById('koiGender').value;
        let dataPrice = document.getElementById('koiPrice').value;
        let dataImage = document.getElementById('koiPicture').files[0];
        if (dataType === null || dataSize === null || dataGender === null || dataPrice === null || rangeValue===0 || dataImage === undefined) {
            alert('Please fill all the fields') 
        }
        else {
            const newData = new FormData()
            newData.append('type', dataType)
            newData.append('size', dataSize)
            newData.append('gender', dataGender)
            newData.append('price', dataPrice)
            newData.append('range', rangeValue)
            newData.append('image', dataImage)
            
            axios.post(`${api}/product`, newData, {
            }).then(res => {
                console.log(res)
                setPopUp(null)
                alert('Post Success!')
                setNewUpdateProduct(Date.now())
            }).catch(err => {
                console.log(err)
            })
        }
    }
    
    return (
    <div className={`${popUp==='post' && 'bg-zinc-200 opacity-95 fixed inset-0 z-50'}`} onClick={handleCloseModal}>
            <div id='outsideModal' className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-white border-4 border-gray-500 rounded-xl w-1/6">
                    <p className='mb-4 mt-4 text-2xl'>Add Koi</p>
                    <form className='flex flex-col justify-center items-center' onSubmit={handlePostProduct}> 
                        <div className='flex flex-col justify-start w-3/4'>
                            <p className='flex text-left'>Type</p> <input type='text' placeholder='ex. Kohaku, Shiro, etc' className='w-full border-2 border-gray-500 rounded-lg mb-4' id='koiType'/>
                        </div>
                        <div className='flex flex-col justify-start w-3/4'>
                            <p className='flex text-left'>Size (cm)</p> <input type='number' placeholder='ex. 51' className='w-full border-2 border-gray-500 rounded-lg mb-4' id='koiSize'/>
                        </div>
                        <div className='flex flex-col justify-start w-3/4'>
                            <p className='flex text-left'>Gender</p> 
                            <select className='w-full border-2 border-gray-500 rounded-lg mb-4' id='koiGender'>
                                <option hidden>Select</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Unknown'>Unknown</option>
                            </select>
                        </div>
                        <div className='flex flex-col justify-start w-3/4'>
                            <p className='flex text-left'>Start Price (IDR)</p> <input type='number' placeholder='ex. 2500000' className='w-full border-2 border-gray-500 rounded-lg mb-4' id='koiPrice'/>
                        </div>
                        <div className='flex flex-col justify-start w-3/4'>
                            <p className='flex text-left'>Bidding range (IDR)</p> 
                            <div className='flex flex-row justify-between mb-3 text-sm'>
                                {biddingData.map((data, index) => {
                                    return(
                                        <div key={index} className='flex flex-row justify-center items-center space-x-1'>
                                            <input type='radio' name='koiBiddingRange' value={data.value} id={`biddingRange${index}`} onChange={onChangeRangeValue}/>
                                            <label htmlFor={`biddingRange${index}`}>{data.label}</label>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col justify-start w-3/4'>
                            <p className='flex text-xs text-left'>Picture (max. 5MB - jpeg/png)</p> <input type='file' className='w-full border-2 border-gray-500 rounded-lg mb-6' id='koiPicture' accept='image/png, image/jpeg'/>
                        </div>
                        <button className='w-2/3 h-12 border-2 border-gray-500 rounded-lg mb-4'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostProductModal