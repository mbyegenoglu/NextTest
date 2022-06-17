import React from 'react'

export default function mobileProductPrice({price}) {

    const Rate = ((price.salePrice*price.defaultPrice)/100).toFixed(0);
    const currentPrice = price.salePrice.toFixed(2);
    const oldPrice = price.defaultPrice.toFixed(2);
    
    return (
        <>
            {true && (
                <div className="px py col-5 priceSticky">
                    {price.defaultPrice > 0 && price.defaultPrice != price.salePrice && (
                        <>
                        <div className="productDiscount">% {price.discountRate == undefined ? Rate : price.discountRate}</div>
                        <div className="oldPrice">{oldPrice}</div>
                        </>
                    )}
                    <div className="currentPrice">{currentPrice} {price.moneySymbol}</div>
                </div>
            )}
        </>
    )
}



/*


        <div className='fl col-12 productPriceSection'>
              <div className="fl col-7 col-sm-12  Price">
                
                <>
                <div className="productDiscount"></div>
                <div className="oldPrice"></div>
                </>
                <div className="currentPrice"></div>
              </div>
            </div>
        
        */