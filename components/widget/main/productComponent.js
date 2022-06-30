import React from 'react'
import Cookies from 'universal-cookie';
import Cookiefactory from '../../../lib/cookiefactory';
import ProductLeft from './Product/productLeft'
import ProductRight from './Product/productRight';
import ProductAttr from './Product/ProductAttr';
import { useEffect } from 'react';
import { LastViewedProduct } from './Product/LastViewedProduct';


export default function ProductComponent({ data }) {

  const req = null; const res = null;
  const cookiefactory = new Cookiefactory();
  const headerData = cookiefactory.GetCookies(req, res);

  const Product = { data };

  useEffect(() => {
    const ss = new Cookies();

    if (ss.get("lastViewed") == undefined || ss.get("lastViewed") == "undefined") {
      ss.set('lastViewed', [data.refId], { maxAge: 60 * 60 * 72 });
    } else {
      var lastViewed = ss.get("lastViewed");

      if(lastViewed.indexOf(data.refId) < 0){
        lastViewed.push(data.refId);
      }
      ss.set('lastViewed', lastViewed, { maxAge: 60 * 60 * 72 });
    }
  },[data]);


  return (

    <div className="px py col-12" id="productDetail">
      <div className="row">
        <div className="container">
          <div id="productContent" className="fl col-12">
            <div className="row">
              <ProductLeft images={data.images} stockCode={data.stockCode}> </ProductLeft>
              <ProductRight data={data}></ProductRight>
              <ProductAttr Attr={data}></ProductAttr>

              <LastViewedProduct></LastViewedProduct>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
