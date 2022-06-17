import React, { useEffect, useState } from 'react';
import $ from 'jquery';

export default function Payment(props) {

    const [CheckoutInfo, setCheckoutInfo] = useState(props.checkoutinfo);
    const [Payment, setPayment] = useState(props.paymentlist);


    function ChangePaymentMethod (e){
        props.changePayment(e);
    }

    function ChangePaymentChoose (e){
        props.changeChoose(e);
    }

    function changeCreditCard(e){
        props.changeCard(e);
    }


    function completeOrder() {
        if(props.checkoutinfo.currentPaymentType != ""){
            if(props.checkoutinfo.currentPaymentType == 8){
                var e = {
                    cardNumber : $("#cardnumber").val(),
                    cardHolderName : $("#cardHolderName").val(),
                    cardDate : $("#cardLastDate").val(),
                    cardCVC : $("#cvc").val()
                }
                changeCreditCard(e);
                _ => checkOutForm.current.submit();
            }
            else{
                props.checkOutForm.current.submit();
            }
        }
        else{
            alert("Lütfen bir ödeme adımı seçin");
        }
        
    }


    return (
        <>
            <div className={"fl col-12 SectionItem" + (props.checkoutinfo.step == 3 ? " active" : "")} id="CheckPayment">
                <div className="fl col-12 SectionItemTitle">
                    <div className="No">3</div>
                    Ödeme
                </div>
                <div className="fl col-12 SectionItemContent">
                    <div id="paymentSystem" className="px py col-12">
                        <ul className="fl col-12 paymentList">
                            <li className={'fl col-12 PaymentItem' + (props.checkoutinfo.currentPaymentType == 8 ? " active":"")} onClick={(e) => ChangePaymentMethod(8)}>Kredi Kartı ile Öde</li>
                            <li className={'fl col-12 PaymentItem' + (props.checkoutinfo.currentPaymentType == 20 ? " active":"")} onClick={(e) => ChangePaymentMethod(20)}>Kapıda Ödeme</li>
                            <li className={'fl col-12 PaymentItem' + (props.checkoutinfo.currentPaymentType == 32 ? " active":"")} onClick={(e) => ChangePaymentMethod(32)}>Havale / EFT</li>
                        </ul>
                        <div className={'fl col-12 PaymentContent' + (props.checkoutinfo.currentPaymentType == 8 ? " active":"")} id="T1">

                            <div className="fl col-12" id="CardWrapper">
                                <div className="fl col-12 paymentTitle">Kredi Kartı</div>
                                <div className="fl col-12 paymentContent">Burada kredi kartı ile ilgili açıklamalar falan gelecek.</div>
                                <div className="fl col-12 form-group">
                                    <input type="text" name="cardnumber" id="cardnumber" placeholder="Kart Numarası"></input>
                                </div>
                                <div className="fl col-12 form-group">
                                    <input type="text" name="ccname" id="cardHolderName" placeholder="Kart Üzerindeki İsim"></input>
                                </div>
                                <div className="fl col-6 form-group">
                                    <input type="text" name="ccname" id="cardLastDate" placeholder="Ay / Yıl"></input>
                                </div>
                                <div className="fl col-6 form-group">
                                    <input type="text" name="cvc" id="cvc" placeholder="CVC"></input>
                                </div>
                            </div>



                        </div>
                        <div className={'fl col-12 PaymentContent' + (props.checkoutinfo.currentPaymentType == 20 ? " active":"")} id="T2">


                            <div className="fl col-12" id="DoorWrapper">
                                <div className="fl col-12 paymentTitle">Kapıda Ödeme</div>
                                <div className="fl col-12 paymentContent">Burada Kapıda Ödeme ile ilgili açıklamalar falan gelecek.</div>
                                <div id="DoorWrapperList" className="fl col-12">
                                    <div className={'fl col-12 DoorWrapperItem' + (props.checkoutinfo.currentPaymentChoose == "KNO" ? " active":"")}  onClick={(e) => ChangePaymentChoose("KNO")}>
                                        <span>Kapıda Nakit Ödeme</span>
                                        <b>+ 5.00 ₺</b>
                                    </div>
                                    <div className={'fl col-12 DoorWrapperItem' + (props.checkoutinfo.currentPaymentChoose == "KKO" ? " active":"")}  onClick={(e) => ChangePaymentChoose("KKO")}>
                                        <span>Kapıda Kredi Kartı ile Ödeme</span>
                                        <b>+ 15.00 ₺</b>
                                    </div>
                                </div>
                            </div>

                            


                        </div>
                        <div className={'fl col-12 PaymentContent' + (props.checkoutinfo.currentPaymentType == 32 ? " active":"")} id="T3">
                            <div className="fl col-12 paymentTitle">Havale / EFT ile Ödeme</div>
                            <div className="fl col-12 paymentContent">Burada Havale / EFT ile ilgili açıklamalar falan gelecek.</div>

                            <div id="BankPaymentList" className="fl col-12">
                                <div className={'fl col-12 BankPaymentItem' + (props.checkoutinfo.currentPaymentChoose == "HB" ? " active":"")} onClick={(e) => ChangePaymentChoose("HB")}>
                                    <div className="fl col-12 Iban">TR45 0006 2585 2933 1464 8246 28</div>
                                    <div className="fl col-12 Name"><b>HALKBANK</b> - PATIRTI TEKSTİL A.Ş.</div>
                                    <button>Kopyala</button>
                                </div>
                                <div className={'fl col-12 BankPaymentItem' + (props.checkoutinfo.currentPaymentChoose == "ZB" ? " active":"")}  onClick={(e) => ChangePaymentChoose("ZB")}>
                                    <div className="fl col-12 Iban">TR45 0006 2585 2933 1464 8246 28</div>
                                    <div className="fl col-12 Name"><b>ZIRAAT BANKASI</b> - PATIRTI TEKSTİL A.Ş.</div>
                                    <button>Kopyala</button>
                                </div>
                                <div className={'fl col-12 BankPaymentItem' + (props.checkoutinfo.currentPaymentChoose == "IB" ? " active":"")} onClick={(e) => ChangePaymentChoose("IB")}>
                                    <div className="fl col-12 Iban">TR45 0006 2585 2933 1464 8246 28</div>
                                    <div className="fl col-12 Name"><b>İŞ BANKASI</b> - PATIRTI TEKSTİL A.Ş.</div>
                                    <button>Kopyala</button>
                                </div>
                            </div>


                            
                        </div>
                    </div>
                    

                    <div className="fl col-12 SectionItemApply" onClick={completeOrder}>Siparişi Tamamla !</div>
                </div>
            </div>
        </>
    )
}



/*


<div id="paymentSystem" className="px py col-12">
                        <ul className="fl col-12 paymentList">
                            {Payment?.map(paymentItem =>
                                <li className={"fl col-12 PaymentItem " + (CheckoutInfo.currentPaymentType == paymentItem.id ? "active" : "")} key={paymentItem.id}  data-id={paymentItem.id} onClick={(e) => ChangePaymentMethod(e)}>{paymentItem.name}</li>
                            )}
                        </ul>



                        {Payment?.map(paymentItem => 
                        <div className={"fl col-12 PaymentContent" + (CheckoutInfo.currentPaymentType == paymentItem.id ? "active" : "")} key={paymentItem.id} onClick={_ => props.changePayment(paymentItem.id)}>
                            <div className="fl col-12 paymentTitle">{paymentItem.name}</div>
                            <div className="fl col-12 paymentContent">{paymentItem.description}</div>
                        </div>
                        )}
                    </div>



*/