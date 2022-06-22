import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookiefactory from '../../../../lib/cookiefactory';
import { getBasket, setBasket } from '../../../../redux/slices/basketSlice';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import { getParam } from '../../../../redux/slices/paramSlice';

import Image from 'next/dist/client/image';
import Dictionary from '../../../../lib/dictionary';

import {AiOutlineDelete} from "react-icons/ai";


export default function Basketinner() {

    const basket = useSelector(getBasket);
    const param = new Dictionary(useSelector(getParam));
    const dictionary = useSelector(getDictionary);
    const dispatch = useDispatch();

    const updBasket = function(line, op, ct) {
        let newline = Object.assign({}, line);
        if (op == "plus") {
            newline.amount = 1;
        } else if (op == "minus") {
            if (newline.amount > 1) {
                newline.amount = -1;
            }
            else
            {
                return;
            }
        } else if (op == "del") {
            newline.amount = 0;
        } else if (op == "custom") {
            newline.amount = ct;
        }

        newline.total = newline.price * newline.amount;
        newline.tax = (newline.total * newline.taxRate) / 100;
        newline.netTotal = newline.total;
        newline.IsTotalAmount = true;
        let cookiefactory = new Cookiefactory();
        dispatch(setBasket({ basket: newline, cookies: cookiefactory.GetCookies(), token: cookiefactory.GetToken() }));
    }



    console.log(basket);
    


    return (
        <div className="px py col-8 col-sm-12" id="cartWrapperLeft">
            <div className="fl col-12 Title">{dictionary["Web.UI.CartTitle"]} ({basket.length} {dictionary["Web.UI.CartProduct"]})</div>
            <div className="fl col-12 CartItemList">
                {basket.map((e, i) => 
                <div className="px py col-12 CartItem" key={e.variantId} data-id={e.variantId}>
                    <div className="fl col-7 col-sm-12 CartItemInfo">
                        <div className="px col-3 CartItemImage">
                            <div className="image-wrapper fl col-12">
                                <span className="imgInner">
                                    <Image layout="fill" 
                                        src={"https://img.antremeta.com/"+e.stockCode+"_1.jpg"} 
                                        alt={e.name}>
                                    </Image>

                                </span>
                            </div>
                        </div>
                        <div className="px col-9 CartItemDesc">
                            <div className="fl col-12 CartItemName">
                                <b>{e.brand}</b>
                                {e.name}
                            </div>
                            <div className="fl col-12 CartVariantName">
                                {e != null && e.properties != null && Object.keys(e.properties).map(ee => 
                                    <div key={ee}>{ee} : {e.properties[ee]}</div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="fl col-5 col-sm-12 CartItemPriceQty">
                        <div className="px py col-4 QtyBox">

                            <div className="Qty">
                                <input type="button" value="-" className="minus" onClick={v => updBasket(e, "minus")}></input>
                                <input type="text" name="quantity" value={e.amount} onChange={v => updBasket(e, "custom", parseInt(v.target.value) - e.amount)}></input>
                                <input type="button" value="+" className="plus" onClick={v => updBasket(e, "plus")}></input>
                            </div>
                        </div>
                        <div className="px py col-5 PriceBpx">
                            {e.originalPrice > 0 && (
                                <div className="fl col-12 oldPrice">{(e.originalPrice * e.amount).toFixed(2)} {e.moneySymbol}</div>
                            )}
                            <div className="fl col-12 nowPrice">{(e.netTotal).toFixed(2)} {e.moneySymbol}</div>
                        </div>
                        <div className="px py col-3 DeleteBox" onClick={v => updBasket(e, "del")}>
                            <button className="CartItemDelete"><AiOutlineDelete></AiOutlineDelete></button>
                        </div>
                    </div>
                </div>
                )}

            </div>
        </div>
    );
}