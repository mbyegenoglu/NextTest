import React, { useEffect, useState } from 'react'

export default function ProductPrice({price}) {

  const Rate = ((price.salePrice*price.defaultPrice)/100).toFixed(0);
  const currentPrice = price.salePrice.toFixed(2);
  const oldPrice = price.defaultPrice.toFixed(2);

  return (
    <>
      
      {true && (
        <div className='fl col-12 productPriceSection'>
          <div className="fl col-7 col-sm-12  Price">
            {price.defaultPrice > 0 && price.defaultPrice != price.salePrice && (
            <>
            <div className="productDiscount">%{Rate}</div>
            <div className="oldPrice">{oldPrice} {price.moneySymbol}</div>
            </>)}
            <div className="currentPrice">{currentPrice} {price.moneySymbol}</div>
          </div>
        </div>
      )}


    </>




  )
}
