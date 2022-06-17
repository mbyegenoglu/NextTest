import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBasket } from '../../../../redux/slices/basketSlice';



function Summary(props) {

    const summary = useSelector(getBasket);

    const cargoPrice = props.s.currentCargoPrice == undefined ? "0":props.s.currentCargoPrice;


    

    return (
        <>
           <div className="px py col-12" id="cInfo">
                    <div className="fl col-12 cInfoItem">
                        <span>Ara Toplam</span>
                        <b>{summary.reduce((a, v) => a += v.total, 0)} {summary.reduce((a, v) => a = v.moneySymbol, "")}</b>
                    </div>

                    <div className="fl col-12 cInfoItem">
                        <span>Teslimat / Kargo </span>
                        <b> {cargoPrice} {summary.reduce((a, v) => a = v.moneySymbol, "")}</b>
                    </div>


                    


                    <div className="fl col-12 cInfoItem">
                        <span>Vergi</span>
                        <b> {summary.reduce((a, v) => a += v.tax, 0)} {summary.reduce((a, v) => a = v.moneySymbol, "")}</b>
                    </div>

                    <div className="fl col-12 cInfoItem">
                        <span>Toplam</span>
                        <b> {summary.reduce((a, v) => a += v.netTotal, Number(cargoPrice)).toFixed(2)} {summary.reduce((a, v) => a = v.moneySymbol, "")}</b>
                    </div>
                </div>
        </>
    )
}


export default Summary


/*
<div className="fl col-12 cInfoItem discount">
                        <span>İndirim (Beklemede)</span>
                        <b> </b>
                    </div>

*/