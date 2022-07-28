import React,{useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios';


const Cards = () => {
    const { api, activeMenu, isFiltered, newUpdateProduct } = useStateContext();

    const [cardList, setCardList] = useState([]);

    const keysfilteredData = Object.keys(isFiltered).filter((item) => isFiltered[item]);    
    const filteredData = Object.values(isFiltered).filter((item) => item !== '');
    let resultFilteredData = '';

    useEffect(() => {
        updateCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newUpdateProduct || isFiltered]);

    const updateCards = () => {
        if(filteredData.length > 0) {
            axios.get(`${api}/products?${keysfilteredData.map((item, index) => `${item}=${filteredData[index]}`).join('&')}`)
            .then(res => {
                setCardList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            axios.get(api + '/product')
            .then(res => {
                setCardList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className={`${activeMenu ? 'ml-72' : 'w-full'}`}>
            <p className={`ml-10 mt-10 text-left ${filteredData.length===0 && 'hidden'}`} >Filtered : {keysfilteredData.map((item, index) => {
                if(keysfilteredData.length>2){
                    if(index===keysfilteredData.length-1){
                        return ` & ${item}`
                    }
                    else{
                        return `${item}, `
                    }
                }
                else{
                    resultFilteredData = `${keysfilteredData.length===2 ? ' & ' : ''}${item}`
                    if(resultFilteredData[0]===' '&&index===0){
                        return resultFilteredData.slice(3)
                    }
                    else{
                        return resultFilteredData
                    }
                }
            })}
            </p>           
            <div className={`grid gap-5 ml-5 ${activeMenu ? `grid-cols-6` : `grid-cols-7`}`}>
                {cardList.map((item, index) => {
                    return (
                            <div className={`flex flex-col justify-start items-start rounded-xl border-2 ${filteredData.length===0 ? `mt-12` : `mt-2`}`} key={index}>
                                <div className="flex flex-col w-full h-full">
                                    <img src={item.image} alt={item.type} className="w-full h-4/5 rounded-t-xl object-fill"/>
                                    <div className="flex flex-col w-full h-1/5">
                                        <div className='flex flex-row w-full h-1/2'>
                                            {Object.keys(item).filter((item, index)=> index>=1 && index<4).map((key, index) => {
                                                return (
                                                    <p className="flex justify-center items-center text-m text-neutral-600 w-1/3 border-1 shadow-md" key={index}>{item[key]}</p>
                                                )}
                                            )}
                                        </div>
                                        <div className='flex flex-row w-full h-1/2'>
                                            {Object.keys(item).filter((item, index)=> index>=4 && index<6).map((key, index) => {
                                                return (
                                                    <p className={`flex justify-center items-center text-m text-neutral-600 border-1 shadow-md ${key==='price' ? `w-2/3` : `w-1/3`}`} key={index}>{item[key]}</p>
                                                )}
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cards