import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { InfoCard, ActionCard, OthersCard, TopBidder, VideoCard } from '/'
import axios from 'axios'


const DetailCard = () => {
   const { api, activeMenu, setActiveMenu, isAdmin, isFiltered, newUpdateProduct } = useStateContext();
   const [detailProduct, setDetailProduct] = useState({})

    useEffect(() => {
        updateDetailProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newUpdateProduct]);

    const updateDetailProduct = () => { 
        const params = new URLSearchParams(window.location.search).get('id');
        axios.get(`${api}/product/${params}`)
        .then(res => {
            setDetailProduct(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

return (
    <div className={`flex flex-row h-720 rounded-lg ${activeMenu ? 'ml-52' : 'ml-10'}`}>
        <div className="flex flex-col w-2/3">
            <div className='flex flex-col w-full h-2/3'>
                <div className='w-full h-2/3'> 
                    <InfoCard detailProduct={detailProduct} />
                </div>
                <div className='w-full h-1/3 bg-slate-100'> 
                    <ActionCard detailProduct={detailProduct}/>
                </div>
            </div>
            <div className='flex flex-col w-1500 h-1/3 bg-blue-200'>
                <OthersCard/>
            </div>
        </div>
            <div className='w-1/3 h-2/3 bg-green-300'>
                <VideoCard/>
            </div>
        <div className='flex flex-col w-1/3 h-full bg-slate-800'>
            <TopBidder/>
        </div>
    </div>
  )
}

export default DetailCard