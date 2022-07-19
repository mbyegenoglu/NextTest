import React from 'react';
import Link from 'next/link';
import Image from 'next/dist/client/image';


function Product(props) {

    const ProductList = props.pl;

    return (
        <>
            <div className="px py col-12" id="cProducts">
                    {ProductList?.map(product => 
                        {
                            return <div key={product.productId} className="fl col-12 cProductItem">
                                <div className="Image">
                                    <div className="image-wrapper fl col-12">
                                        <span className="imgInner">
                                        <Image layout="fill" key={1} src={"https://img.antremeta.com/"+ product?.stockCode +"_1.jpg"} alt={product?.productName}></Image>
                                        </span>
                                    </div>
                                </div>
                                <div className="Txt">
                                    <div className="fl col-12 Name">{product.name}</div>
                                    <div className="fl col-12 Qty">Adet: {product.amount}</div>
                                    <div className="fl col-12 Price">{product.moneySymbol} {product.price}</div>
                                </div>
                            </div>
                        })}
                    
                    
                </div>
        </>
    )
}


export default Product