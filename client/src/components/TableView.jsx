import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios'
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

const TableView = () => {
    const { api, newUpdateProduct, mainView } = useStateContext();

    const [productList, setProductList] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        updateProductList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newUpdateProduct]);

    const updateProductList = () => {
        axios.get(api + '/product')
        .then(res => {
            setProductList(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleUpdateProduct = () => {
    }

    return (
        <div className='flex flex-row justify-evenly mt-10'>
            <table className="table-auto ml-10 mb-10 rounded-lg border-2 border-slate-700 border-separate border-spacing-2">
                <thead > 
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Length</th>
                        <th>Gender</th>
                        <th>Price</th>
                        <th>Bid Range</th>
                        <th>Due Date</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.length}</td>
                                <td>{item.gender}</td>
                                <td>{item.price}</td>
                                <td>{item.range}
                                </td>
                                <td>{item.date}</td>
                                <td><img src={item.image} alt={item.name} className='w-10 h-10' /></td>
                                <td>
                                    <button className="mx-2" onClick={() => setIsEdit(true)}><FiEdit3/></button>
                                    <button className="mx-2"><FiTrash2/></button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            {/* create update product */}
                    <div className='flex flex-col w-1/5 h-1/2 px-2 border-2 border-slate-700 rounded-lg items-center'>
                        <h1 className='my-4 text-xl'>Update Product</h1>
                        <div className='flex flex-col items-start my-1'>
                            <label className='flex justify-start text-sm'>Type</label>
                            <input type='text' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updateType' />
                        </div>
                        <div className='flex flex-col items-start my-1'>
                            <label className='flex justify-start text-sm'>Length</label>
                            <input type='number' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updateLength'/>
                        </div>
                        <div className='flex flex-col items-start my-1'>
                            <label className='flex justify-start text-sm'>Gender</label>
                            <input type='text' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updateGender'/>
                        </div>
                        <div className='flex flex-col items-start my-1'>
                            <label className='flex justify-start text-sm'>Price</label>
                            <input type='number' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updatePrice'/>
                        </div>
                        <div className='flex flex-col items-start my-1'>
                            <label className='flex justify-start text-sm'>Bid Range</label>
                            <input type='number' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updateRange'/>
                        </div>
                        <div className='flex flex-col items-start my-1'>
                            <label className='flex justify-start text-sm'>Due Date</label>
                            <input type='datetime-local' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='udpateDate'/>
                        </div>
                        <div className='flex flex-col items-start my-1'>
                            <label className='flex justify-start text-sm'>Current URL Image</label>
                            <input type='text' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updateImage'/>
                        </div>
                        <div className='flex flex-col items-center my-1'>
                            <label className='flex justify-start text-sm'>New Image</label>
                            <input type='file' className='rounded-md w-2/3 h-8 border-2 border-slate-700 text-sm' id='newUpdateImage'/>
                        </div>
                        <button className='flex justify-center items-center bg-slate-700 text-white rounded-md w-1/2 h-12 p-2 my-4' onClick={handleUpdateProduct}>Update</button>
                    </div>
                        
        </div>
    )
}

export default TableView