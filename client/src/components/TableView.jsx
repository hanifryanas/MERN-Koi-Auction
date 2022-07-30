import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios'
import { FiEdit3, FiTrash2, FiX } from 'react-icons/fi';

const TableView = () => {
    const { api, newUpdateProduct, setNewUpdateProduct, mainView } = useStateContext();

    const [productList, setProductList] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editProductById, setEditProductById] = useState('')

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

    const handleSetUpdateProduct = (item) => {
        document.getElementById('updateType').value = item.type;
        document.getElementById('updateLength').value = item.length;
        document.getElementById('updateGender').value = item.gender;
        document.getElementById('updatePrice').value = item.price;
        document.getElementById('updateRange').value = item.range;
        setIsEdit(true);
        setEditProductById(item._id);
    }

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        let dataType = document.getElementById('updateType').value;
        let dataLength = document.getElementById('updateLength').value;
        let dataGender = document.getElementById('updateGender').value;
        let dataPrice = document.getElementById('updatePrice').value
        let dataRange = document.getElementById('updateRange').value
        let dataDate = document.getElementById('updateDate').value
        let dataImage = document.getElementById('newUpdateImage').files[0];
        const newData = new FormData();
        dataType!==null && newData.append('type', dataType);
        dataLength!==null && newData.append('length', dataLength);
        dataGender!==null && newData.append('gender', dataGender);
        dataPrice!==null && newData.append('price', dataPrice);
        dataRange!==null && newData.append('range', dataRange);
        dataDate!=='' && newData.append('date', dataDate);
        dataImage!==undefined && newData.append('image', dataImage);

        axios.put(`${api}/product/${editProductById}`, newData, {
        })
        .then(res => {
            console.log(res)
            alert('Update Success!')
            setNewUpdateProduct(Date.now())
            setIsEdit(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleDeleteProduct = (item) => {
        axios.delete(`${api}/product/${item._id}`)
        .then(res => {
            console.log(res)
            alert('Delete Success!')
            setNewUpdateProduct(Date.now())
        })
        .catch(err => {
            console.log(err)
        })
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
                                    <button className="mx-2" onClick={()=>handleSetUpdateProduct(item)}><FiEdit3/></button>
                                    <button className="mx-2" onClick={()=>handleDeleteProduct(item)}><FiTrash2/></button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            <form className={`flex flex-col w-1/5 h-1/2 px-2 border-2 border-slate-700 rounded-lg items-center ${isEdit===false && `hidden`}`} onSubmit={handleUpdateProduct}>
                <div className='absolute right-40 text-3xl text-red-800 hover:cursor-pointer' onClick={()=>setIsEdit(false)}><FiX/></div>
                <h1 className='my-4 text-xl'>Update Product</h1>
                <div className='flex flex-row gap-5'>
                    <div className='flex flex-col items-start my-1'>
                        <label className='fKohakuusKohakustart text-sm'>Type</label>
                        <select id='updateType' className='w-full px-2 py-1 border-2 border-slate-700 rounded-lg'>
                            <option hidden>Select</option>
                            <option value='Kohaku'>Kohaku</option>
                            <option value='Shiro'>Shiro</option>
                            <option value='Showa'>Showa</option>
                            <option value='Sanke'>Sanke</option>
                        </select>
                    </div>
                    <div className='flex flex-col items-start my-1'>
                        <label className='flex justify-start text-sm'>Length</label>
                        <input type='number' className='rounded-md w-20 h-9 p-2 border-2 border-slate-700' id='updateLength'/>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div className='flex flex-col items-start my-1'>
                        <label className='flex justify-start text-sm'>Gender</label>
                        <select id='updateGender' className='w-24 px-2 py-1 border-2 border-slate-700 rounded-lg'>
                            <option hidden>Select</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Unknown'>Unknown</option>
                        </select>
                    </div>
                    <div className='flex flex-col items-start my-1'>
                        <label className='flex justify-start text-sm'>Bid Range</label>
                        <select id='updateRange' className='w-full px-2 py-1 border-2 border-slate-700 rounded-lg'>
                            <option hidden>Select</option>
                            <option value={50000}>50K</option>
                            <option value={100000}>100K</option>
                            <option value={500000}>500K</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col items-start my-1'>
                    <label className='flex justify-start text-sm'>Price</label>
                    <input type='number' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updatePrice'/>
                </div>
                <div className='flex flex-col items-start my-1'>
                    <label className='flex justify-start text-sm'>New Due Date</label>
                    <input type='datetime-local' className='rounded-md w-full h-8 p-2 border-2 border-slate-700' id='updateDate' min={new Date().toISOString().slice(0, -8)}/>
                </div>
                <div className='flex flex-col items-center my-1'>
                    <label className='flex justify-start text-sm'>New Image</label>
                    <input type='file' className='rounded-md w-2/3 h-7 border-2 border-slate-700 text-sm' id='newUpdateImage'/>
                </div>
                <button className='flex justify-center items-center bg-slate-700 text-white rounded-md w-1/2 h-12 p-2 my-4' type='submit'>Update</button>
            </form>    
        </div>
    )
}

export default TableView