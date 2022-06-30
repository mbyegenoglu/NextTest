import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import Cookiefactory from '../../../../lib/cookiefactory';


export const LastViewedProduct = () => {

    const req = null; const res = null;
    const cookiefactory = new Cookiefactory();
    const ss = new Cookies();
    const lastViewed = ss.get("lastViewed");

    const [productIds, setProductIds] = useState(lastViewed);

    const headerData = cookiefactory.GetCookies(req, res);
    headerData["Content-Type"] = "application/json";
    const requestGetAllOptions = {
        method: 'POST',
        headers: headerData,
        body: JSON.stringify(lastViewed)
    };

    fetch("http:api.antremeta.com/Product/GetLastViewedProducts", requestGetAllOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div>Ürünler Gelecek Api UPdate edilmedi</div>
  )
}
