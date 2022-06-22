import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cookiefactory from '../../../../lib/cookiefactory';
import dictionarySlice from '../../../../redux/slices/dictionarySlice';
import paramSlice from '../../../../redux/slices/paramSlice';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import {AiOutlineHeart} from "react-icons/ai";
import Cookies from 'universal-cookie';

export default function ProductBox({ item, param, dictionary }) {

    const [pItem, setPItem] = useState();
    useEffect(() => {
        setPItem(item);
      }, []);

    const req = null; const res = null;
    var Grid = "productItem px py col-2-5 col-xl-3 col-lg-4 col-md-6";
    var myHeaders = new Headers();
    const cookiefactory = new Cookiefactory();
    const headerData = cookiefactory.GetCookies(req, res);
    const token = cookiefactory.GetToken(req, res);
    if (!!token) {
        headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);
    }
    var requestOptions = {
        method: 'GET',
        headers: headerData
    };

    const getOldPrice = function () {
        if (pItem?.defaultPrice == pItem?.salePrice) {
            return <></>
        } else {
            return <span className="oldPrice">{pItem?.defaultPrice} {pItem?.moneySymbol}</span>
        }
    }

    const getDiscountRate = function () {
        if (pItem?.defaultPrice == "Mami") {
            return <span className="discount">-{Rate}%</span>
        }
    }

    const getTags = function () {
        if (pItem?.defaultPrice == "Mami") {
            return <div className='productTags'>
                <span className='productTag'><Image layout="fill" src='https://cdn.dsmcdn.com//indexing-sticker-stamp/moon/e68c3d96-a877-4e49-923b-ca420419ab40.png' alt="Deneme"></Image></span>
                <span className='productTag'><Image layout="fill" src='https://cdn.dsmcdn.com//indexing-sticker-stamp/moon/aa7816f3-395f-43b0-a9fc-0b806f923a6a.png' alt="Deneme"></Image></span>
                <span className='productTag'><Image layout="fill" src='https://cdn.dsmcdn.com///marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png' alt="Deneme"></Image></span>
            </div>
        }
    }

    const addToFav = (favProduct) => {
        const req = null; const res = null;
        const cookiefactory = new Cookiefactory();
        const headerData = cookiefactory.GetCookies(req, res);
        const token = cookiefactory.GetToken(req, res);
        if (!!token) {
            headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);
        }
        const ss = new Cookies();
        const cacheFavoriteList = ss.get('FavoriteList');
        var raw = JSON.stringify({
          "productId": favProduct,
        });
        var requestaddToFavOptions = {
            method: 'POST',
            headers: headerData,
            body: raw,
            redirect: 'follow'
        };   
        if(cacheFavoriteList == undefined  || cacheFavoriteList == [] || cacheFavoriteList == ""){
          fetch("https://orderapi.antremeta.com/CustomerFavourite/AddFavouriteProduct", requestaddToFavOptions)
          .then(response => response.text())
          .then(result => {
              const jResult = JSON.parse(result.text);
              if(jResult.status){
                const replaceList = [];
                replaceList.push(favProduct);
                ss.set('FavoriteList', replaceList ,{maxAge: 60 * 60 * 72});   
              }
          })
          .catch(error => console.log('error', error));
        }
        else{
          const replaceList = ss.get('FavoriteList');
          if(favProduct == replaceList.find(e => e === favProduct)){
            fetch("https://orderapi.antremeta.com/CustomerFavourite/RemoveFavouriteProduct", requestaddToFavOptions)
            .then(response => response.text())
            .then(result => {
                const jResult = JSON.parse(result.text);
                if(jResult.status){
                  replaceList.splice(replaceList.indexOf(favProduct),1);
                  ss.set('FavoriteList', replaceList ,{maxAge: 60 * 60 * 72});  
                }
            })
            .catch(error => console.log('error', error));
          }
          else{
            fetch("https://orderapi.antremeta.com/CustomerFavourite/AddFavouriteProduct", requestaddToFavOptions)
            .then(response => response.text())
            .then(result => {
                const jResult = JSON.parse(result.text);
                if(jResult.status){
                  replaceList.push(favProduct);
                  ss.set('FavoriteList', replaceList ,{maxAge: 60 * 60 * 72});   
                }
            })
            .catch(error => console.log('error', error));
     
          }
        }
    }

    function changeThisColor(e) {
        var id = e;
        fetch("https://gw.antremeta.com/Product/GetVariant?id=" + id, requestOptions)
        .then(response => response.text())
        .then(result => {
            setPItem(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div className={Grid}>
            <a href={pItem?.seoUrl == null ? "#" : "/" + pItem?.seoUrl} className='fl col-12'>
                <div className="image-wrapper fl col-12">
                    <span className="imgInner">
                        <Image layout="fill" key={1} src={"https://img.antremeta.com/"+ pItem?.stockCode +"_1.jpg"} alt={pItem?.productName}></Image>
                    </span>
                    {getDiscountRate()}
                    {getTags()}
                </div>
            </a>

            <div className='fl col-12 productOtherColor'>
                <ul>
                {pItem?.productLinks?.map((pL,i) =>
                    <li onClick={(event) => changeThisColor(pL.refId)} 
                        key={i+"pl"+pL.refId} 
                        data-id={i+"pl"+pL.refId} 
                        className={pItem.refId == pL.refId ? "active":""}
                        >
                            {pL.propertyValues.value}
                     </li>
                )}



                    
                   
                </ul>
            </div>

            <div className="fl col-12 productItemPrice">
                {getOldPrice()}
                <span className="currentPrice">{pItem?.salePrice} {pItem?.moneySymbol}</span>
                <button className="productListFavBtn" onClick={(event) => addToFav(pItem?.refId)}><AiOutlineHeart></AiOutlineHeart></button>
            </div>


            <div className="fl col-12 productItemInfo">
                <span className="name">{pItem?.productBrandName}</span>
                {pItem?.productName}
            </div>
        </div>
    )

}

