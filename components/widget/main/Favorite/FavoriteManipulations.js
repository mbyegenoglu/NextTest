import React, { useState, useEffect } from 'react';

import Cookies from "universal-cookie";

export default function FavoriteManipulations( {favProduct} ) {

  if(favProduct != ""){
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
        fetch("https://orderapi.antremeta.com/CustomerFavourite/RemoveFavouriteProduct", requestOptions)
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

  return (

    <div>FavoriteManipulations</div>

  )
}
