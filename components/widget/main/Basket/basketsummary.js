import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBasket } from '../../../../redux/slices/basketSlice';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';

import Dictionary from '../../../../lib/dictionary';

export default function Basketsummary({ data }) {

    const basket = useSelector(getBasket);
    const dictionary = useSelector(getDictionary);


    const currency = basket.reduce((a, v) => a = v.moneySymbol, "");
    const SubTotal = basket.reduce((a, v) => a += v.total, 0).toFixed(2);
    const NetTotal = basket.reduce((a, v) => a += v.netTotal, 0).toFixed(2);



    return (
        <div className="px py col-4 col-sm-12" id="cartWrapperRight">
            <div className="px py col-12 CartDetail">
                <div className="fl col-12 Title">{dictionary["Web.UI.CartOrderSummaryTitle"]}</div>
                <div className="fl col-12 Content">
                    <div className="fl col-12 CartDetailItem cart"><span>{dictionary["Web.UI.CartSubTotal"]}</span><b>{SubTotal} {currency}</b></div>

                    {(SubTotal-NetTotal) > 0 && (
                        <div className="fl col-12 CartDetailItem discount">
                            <span>{dictionary["Web.UI.CartDiscountTotal"] != undefined ? dictionary["Web.UI.CartDiscountTotal"]:"Web.UI.CartDiscountTotal"}</span>
                            <b>- {(SubTotal-NetTotal).toFixed(2)} {currency}</b>
                        </div>
                    )}


                    <div className="fl col-12 CartDetailItem total"><span>{dictionary["Web.UI.CheckoutGenelToplam"]}</span><b>{NetTotal} {currency}</b></div>
                </div>
            </div>

            <a href={"odeme"} className="fl col-12 ApplyCart">{dictionary["Web.UI.CartButtonTitle"]}</a>




            <div className="px py col-12 discountWrapper">
                <div className="fl col-12 Title">{dictionary["Web.UI.CartDiscountCodeTitle"]}</div>
                <div className="fl col-12 Content">
                    <div className="fl col-12 form-group">
                        <input type="text" name="discountCode" id="discountCode" placeholder={dictionary["Web.UI.CartDiscountCodeInput"]}></input>
                        <button className="btn btn-primary-outline">{dictionary["Web.UI.CartDiscountCodeButton"]}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}