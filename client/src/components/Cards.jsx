import React,{useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios';


const Cards = () => {
    const { api, activeMenu, setActiveMenu, isAdmin, isFiltered, newUpdateProduct } = useStateContext();

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
            axios.get(`${api}/product?${keysfilteredData.map((item, index) => `${item}=${filteredData[index]}`).join('&')}`)
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

    const toggleMenuAdmin = () => {
        setActiveMenu(false);
    }

    const handleFormatTime = (date) => {
        let time = new Date(date);
        let hours = time.getHours();
        let minutes = time.getMinutes();
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    const handleFormatDate = (date) => {
        let time = new Date(date);
        let day = time.getDate();
        let month = time.getMonth();
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return `${monthNames[month]} ${day}`;
    }

    const handleFormatLength = (size) => {
        return size + ' cm';
    }

    const handleFormatPrice = (price) => {
        return ('Rp '+ price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    }

    const handleFormatRange = (value) => {
        return value.toString().slice(0, -3) + 'K'
    }

    return (
        <div className={`${isAdmin ? toggleMenuAdmin : activeMenu ? 'ml-52' : 'w-full'}`}>
            <p className={`ml-10 text-left ${filteredData.length===0 && 'hidden'}`}> Filtered : {keysfilteredData.map((item, index) => {
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
            <div className={`grid grid-rows-2 grid-cols-8 ml-5 w-full h-full
            ${activeMenu ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7' : 'md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8'}`}>
                {cardList.map((item, index) => {
                    return (
                        <div className={`relative w-44 h-72 justify-start items-start rounded-xl border-2 mt-6`} key={index} id='cardItem'>
                            <div className="flex justify-end align-middle">
                                <div className= 'absolute bg-blue-100 opacity-50 text-red-700 text-sm rounded-tr-lg rounded-bl-lg text-right px-1'>{handleFormatTime(item.date)}<br/>{handleFormatDate(item.date)}</div>
                            </div>
                            <div className="flex flex-col w-full h-full">
                                <img src={item.image} alt={item.type} className="w-full h-4/5 rounded-t-lg"/>
                                <div className="flex flex-col w-full h-1/5">
                                    <div className='flex flex-row w-full h-1/2'>
                                        {Object.keys(item).filter((item)=> item==='length' || item==='type' || item==='gender' ).sort((a,b)=>a===b ? 0 : a<b ? 1 : -1).map((key, index) => {
                                            return (
                                                <p className="flex justify-center items-center text-sm text-neutral-600 w-1/3 border-1 shadow-md" key={index}>{(key==='length') ? handleFormatLength(item[key]) : item[key]}</p>
                                                )}
                                            )
                                        }
                                    </div>
                                    <div className='flex flex-row w-full h-1/2'>
                                        {Object.keys(item).filter((item)=> item==='price' || item==='range').map((key, index) => {
                                            return (
                                                <p className={`flex justify-center items-center text-sm text-neutral-600 border-1 shadow-md ${key==='price' ? `w-2/3` : `w-1/3`}`} key={index}>{(key==='price') ? handleFormatPrice(item[key]) : handleFormatRange(item[key])}</p>
                                                )}
                                            )
                                        }
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