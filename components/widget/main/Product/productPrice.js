import React, { useEffect, useState } from 'react'

export default function ProductPrice({price}) {



  


  return (

    <>
      
      {true && (
        <div className='fl col-12 productPriceSection'>
          <div className="fl col-7 col-sm-12  Price">
            {price.defaultPrice > 0 && price.defaultPrice != price.salePrice && (
            <>
            <div className="productDiscount">{price.discountRate == "" ? (price.salePrice*price.defaultPrice)/100: price.discountRate}</div>
            <div className="oldPrice">{price.defaultPrice}</div>
            </>)}
            <div className="currentPrice">{price.salePrice} {price.moneySymbol}</div>
          </div>
        </div>
      )}


    </>




  )
}
