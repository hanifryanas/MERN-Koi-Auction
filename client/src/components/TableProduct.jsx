import React, {useState, useEffect} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios'

const TableProduct = () => {
    const [productList, setProductList] = ([])
    const [isEdit, setIsEdit] = useState(false)
    const [koiType, setKoiType] = useState('')
    const [koiSize, setKoiSize] = useState('')
    const [koiGender, setKoiGender] = useState('')
    const [koiPrice, setKoiPrice] = useState('')
    const [koiPicture, setKoiPicture] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/product/list')
        .then(res => {
            setProductList(res.data)
        }).catch(err => {
            console.log(err)
        })
    } , [])

    useEffect(() => {
        setKoiType(productList.type)
        setKoiSize(productList.size)
        setKoiGender(productList.gender)
        setKoiPrice(productList.price)
        setKoiPicture(productList.image)
    }, [productList])



    return (
        <div>TableProduct</div>
    )
}

export default TableProduct