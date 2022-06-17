import React from 'react'
import ProductLeft from './Product/productLeft'
import ProductRight from './Product/productRight';
import ProductAttr from './Product/ProductAttr';

export default function ProductComponent({ data }) {

  

    const Product = { data };

    function GoogleProductDetail (Product) {
        dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        dataLayer.push({
          'event': 'productClick',
          'ecommerce': {
            'click': {   // Optional list property.
              'products': [{
                'name': productObj.productName,                      // Name or ID is required.
                'id': productObj.refId,
                'price': productObj.defaultPrice,
                'brand': productObj.brandName,
                //'category': productObj.cat,
                'variant': productObj.variants,
                'position': productObj.productType
               }]
             }
           },
           'eventCallback': function() {
             //document.location = productObj.url
           }
        });
        console.log("Ürünün Kategorisi ve Url kısmı eksik.");
      }

    return (

        <div className="px py col-12" id="productDetail">
            <div className="row">
                <div className="container">
                    <div id="productContent" className="fl col-12">
                        <div className="row">
                            <ProductLeft images={data.images}> </ProductLeft>
                            <ProductRight data={data}></ProductRight>
                            <ProductAttr Attr={data}></ProductAttr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
