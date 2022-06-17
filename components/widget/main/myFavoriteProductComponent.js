import { data } from 'jquery';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux';
import Cookiefactory from '../../../lib/cookiefactory';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import { getParam } from '../../../redux/slices/paramSlice';
import ProductBox from './Product/productBox'
import ProductTop from './Product/productTop';

export default function myFavoriteProductComponent() {
  const param = useSelector(getParam);
  const dictionary = useSelector(getDictionary);
  const [productItems, setProductItems] = useState([]);

  const req = null; const res = null;
  const cookiefactory = new Cookiefactory();
  const headerData = cookiefactory.GetCookies(req, res);
  const token = cookiefactory.GetToken(req, res);
  if (!!token) {
    headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);
  }

  var requestOptions = {
    method: 'GET',
    headers: headerData,
    redirect: 'follow'
  };

  useEffect(() => {
    fetch("https://orderapi.antremeta.com/CustomerFavourite/Products", requestOptions)
      .then(response => response.text())
      .then(result => {
        var myData = JSON.parse(result);
        setProductItems(myData.data);
      })
      .catch(error => console.log('error', error));
    }, []);
    
  var Grid = "productItem px py col-2-5 col-xl-3 col-lg-4 col-md-6";

  return (
    <div className='px py col-12' id='FavoriteList'>
      <div className='container'>
      <ProductTop title={"Favori Ürünler"} type={false}></ProductTop>
        <div className='fl col-12' id='FavoriteProductList'>
          {productItems?.map((e, i) => {
              return <ProductBox item={e} key={i} param={param} dictionary={dictionary}></ProductBox>
            })}
        </div>
      </div>
    </div>
  )
}