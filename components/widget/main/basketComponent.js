import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Basketinner from './Basket/basketinner';
import Basketsummary from './Basket/basketsummary';
import { getBasket } from '../../../redux/slices/basketSlice';

export default function BasketComponent({ props, children, data }) {


    const basket = useSelector(getBasket);

    const basketWraper = function() {
        if (basket.length > 0) {
            return <div className="px py col-12" id="cartPage">
            <div className="row">
                <div className="container">
                    <div id="cartWrapper" className="fl col-12">
                        <div className="row">
                            <Basketinner></Basketinner>
                            <Basketsummary data={data}></Basketsummary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        } else {
            return <div className="px py col-12" id="cartPage">
            <div className="row">
                <div className="container">
                    <div id="cartWrapperEmpty" className="fl col-12">
                       <div className='fl col-12 CartEmptyTitle'>
                           @Web.UI.CartEmpty
                       </div>
                    </div>
                </div>
            </div>
        </div>
        }
    }






    return (
        <>
            {basketWraper()}
        </>
        
    )

}