import React from 'react'
import {useNavigate} from 'react-router-dom'

const ProductItem = ({item}) => {
    // console.log('item', item)
    const nav= useNavigate()

    return (
        <div className='product-container' style={{width:'200px'}}
            onClick={()=>{nav(`/detail/${item.no}`)}}
        >
            <img src={item.src} width='100px'></img>
            <h3>{item.title}</h3>
            <p>{item.price}원</p>
        </div>
    )
}

export default ProductItem