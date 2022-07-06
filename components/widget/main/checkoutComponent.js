import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Address from './Checkouts/Address.js'
import Cargo from './Checkouts/Cargo.js'
import Payment from './Checkouts/Payment.js'
import Summary from './Checkouts/Summary.js'
import Product from './Checkouts/Product.js'
import User from './Checkouts/User.js'
import { fillBasket, getBasket, postBasketData } from '../../../redux/slices/basketSlice';
import Cookiefactory from '../../../lib/cookiefactory.js';
import Link from 'next/link';
import Image from 'next/dist/client/image';

export default function CheckoutComponent({ props, children, data }) {
    
    const basket = useSelector(getBasket);
    const cookiefactory = new Cookiefactory();
    const cookies = cookiefactory.GetCookies();
    const dispatch = useDispatch();


    useEffect(() => {
        let headerData = Object.assign({}, cookies);
        let token = cookiefactory.GetToken();
        if (token != null) {
          headerData.Authorization = "Bearer " + token;
        }
        dispatch(postBasketData({ headers: headerData }));

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const [CheckoutInfo, setCheckout] = useState({
        step: data.step,
        currentAddress: data.currentAddress,
        currentCargo: data.currentCargo,
        currentCargoPrice : data.currentCargoPrice,
        currentPaymentType: data.currentPaymentType,
        currentPaymentChoose: data.currentPaymentChoose,
        currentCreditCardNumber : data.currentCreditCardNumber,
        currentCreditCardHolder : data.currentCreditCardHolder,
        currentCreditCardDate : data.currentCreditCardDate,
        currentCreditCardCvc : data.currentCreditCardCvc
    });
    const [AddressList, setAddressList] = useState([]);
    const [PaymentList, setPaymentList] = useState(data.paymentList);
    const [CargoList, setCargoList] = useState(data.shipmentList);
    const checkoutform = React.createRef();

    function chooseCargoCompany(e,m) {
        let temp = {};
        Object.assign(temp, CheckoutInfo);
        temp.currentCargo = e;
        temp.currentCargoPrice = m;
        setCheckout(temp);
        console.log(CheckoutInfo.currentCargo);
    }

    function changeAddress(e) {
        let temp = {};
        Object.assign(temp, CheckoutInfo);
        temp.currentAddress = e;
        setCheckout(temp);
    }
    function changePaymentMethod(e) {
        let temp = {};
        Object.assign(temp, CheckoutInfo);
        temp.currentPaymentType = e;
        setCheckout(temp);
        
    }

    function changeChooseMethod(e){
        let temp = {};
        Object.assign(temp, CheckoutInfo);
        temp.currentPaymentChoose = e;
        setCheckout(temp);
    }

    function changeCreditCard(e){
        let temp = {};
        Object.assign(temp, CheckoutInfo);
        temp.currentCreditCardNumber = e.cardNumber,
        temp.currentCreditCardHolder = e.cardHolderName,
        temp.currentCreditCardDate = e.cardDate,
        temp.currentCreditCardCvc = e.cardCVC
        setCheckout(temp);
    }

    function nextStep(m) {
        let temp = {};
        Object.assign(temp, CheckoutInfo);
        temp.step = Number(m) + 1;
        setCheckout(temp);
        
    }


    

    return (
        <>
            <form method="post" ref={checkoutform} encType="application/x-www-form-urlencoded">
                <input type="hidden" name="Step" value={CheckoutInfo.step+1} />
                <input type="hidden" name="currentAddress" value={CheckoutInfo.currentAddress} />
                <input type="hidden" name="currentCargo" value={CheckoutInfo.currentCargo} />
                <input type="hidden" name="currentCargoPrice" value={CheckoutInfo.currentCargoPrice} />
                <input type="hidden" name="currentPaymentType" value={CheckoutInfo.currentPaymentType} />
                <input type="hidden" name="currentPaymentChoose" value={CheckoutInfo.currentPaymentChoose} />
                <input type="hidden" name="currentCreditCardNumber" value={CheckoutInfo.currentCreditCardNumber} />
                <input type="hidden" name="currentCreditCardHolder" value={CheckoutInfo.currentCreditCardHolder} />
                <input type="hidden" name="currentCreditCardDate" value={CheckoutInfo.currentCreditCardDate} />
                <input type="hidden" name="currentCreditCardCvc" value={CheckoutInfo.currentCreditCardCvc} />
                <input type="hidden" name="UserId" value={"2ab66ffd-ce60-496b-a3c3-2261bb66cec3"} />
            </form>
            <div id="CheckoutWrapper" className="fl col-12">
                <div className="px py col-6 col-sm-12" id="CheckoutLeft">
                    <div className="fl col-12" id="CheckoutLeftWrap">
                        <div className="fl col-12 CheckoutTop">
                            <div className="fl col-6" id="CheckLogo">
                                <Link href={"/"}>
                                    <a className='fl col-12'>
                                        <Image 
                                            src={'https://img1ptrti.mncdn.com/content/images/thumbs/626cd59d0d79cd803ce43b67.png'} 
                                            alt="Patırtı" 
                                            height={45} 
                                            width={150}>
                                        </Image>
                                    </a>
                                </Link>
                            </div>
                            <User></User>
                        </div>
                        <div className="fl col-12 CheckoutSection">
                            <Address addressList={AddressList} checkOutForm={checkoutform} checkoutinfo={CheckoutInfo} changeAddress={changeAddress}></Address>
                            <Cargo cargoList={CargoList} checkOutForm={checkoutform} checkoutinfo={CheckoutInfo} changeCargo={chooseCargoCompany}></Cargo>
                            <Payment paymentlist={PaymentList} checkOutForm={checkoutform} checkoutinfo={CheckoutInfo} changePayment={changePaymentMethod} changeChoose={changeChooseMethod} changeCard={changeCreditCard}></Payment>
                        </div>
                    </div>
                </div>

                <div className="px py col-6 col-sm-12" id="CheckoutRight">
                    <div id="CheckoutRightWrap" className="fl col-12">
                        <Product pl={basket}></Product>
                        <Summary s={CheckoutInfo}></Summary>
                    </div>
                </div>
            </div>
        </>
    )

}
