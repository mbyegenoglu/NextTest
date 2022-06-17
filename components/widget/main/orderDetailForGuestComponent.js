import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import Cookiefactory from '../../../lib/cookiefactory';
import Link from 'next/link';
import Image from 'next/dist/client/image';


export default function OrderDetailForGuestComponent() {

    var myHeaders = new Headers();
    const cookiefactory = new Cookiefactory();
    const req = null; const res = null;
    const headerData = cookiefactory.GetCookies(req, res);
    const token = cookiefactory.GetToken(req, res);

    var requestOptions = {
        method: 'GET',
        headers: headerData
    };

    const dictionary = useSelector(getDictionary);
    const [isOrder, setIsOrder] = useState();
    const [order, setOrder] = useState();


    const getOrder = () => {

        console.log(orderDetailInput);


        fetch("https://gw.antremeta.com/Order/"+orderDetailInput.OrderCode+"?mail="+orderDetailInput.Email , requestOptions)
            .then(response => response.text())
            .then(result => {
                var orderStatus = JSON.parse(result);
                console.log(orderStatus);
                setOrder(JSON.parse(result));
                if (orderStatus.status) {
                    setIsOrder(true)
                } else {
                    setIsOrder(false)
                }
            })
            .catch(error => console.log('error', error));
    }

    const [orderDetailInput, setOrderDetailInput] = useState({
        Email: "",
        OrderCode: "",
      });
      const handleOrderInput = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setOrderDetailInput({ ...orderDetailInput, [name]: value });
      }





    return (

        <>
            <div className='fl col-12' id='OrderDetailInput'>
                <div className='container'>
                    <div className='Inner'>
                        <div className='fl col-12 Title'>Sipariş Takibi</div>
                        <div className='py form-group col-12'>
                            <input type={"email"} name={"Email"} onChange={handleOrderInput} placeholder="Mail Adresiniz"></input>
                        </div>
                        <div className='py form-group col-12'>
                            <input type={"text"} name={"OrderCode"} onChange={handleOrderInput} placeholder="Sipariş Numarası"></input>
                        </div>
                        <div className='py form-group col-12'>
                            <button type='submit' className='btn btn-primary' onClick={() => getOrder()} >SORGULA</button>
                        </div>
                    </div>
                </div>
            </div>

            {isOrder && (
                <div className='fl col-12' id='OrderDetail'>
                    <div className='container'>
                        <div className='fl col-12' id='OrderDetailTop'>
                            <div className='fl col-3 OrderDetailTopTitle'>
                                {dictionary["Web.UI.OrderDetailTopTitle"] == undefined ? "Web.UI.OrderDetailTopTitle":dictionary["Web.UI.OrderDetailTopTitle"]}
                            </div>
                            <div className='fl col-6 col-sm-12  OrderTopMiddle'>
                                <div>
                                    <b>Sipariş Tarihi</b>
                                    <span>{order?.data.orderDate}</span>
                                </div>
                                <div>
                                    <b>Sipariş No</b>
                                    <span>{order?.data.orderNr}</span>
                                </div>
                                <div>
                                    <b>Sipariş Özeti</b>
                                    <span>{order?.data.orderPackageItems.length} Teslimat, {order?.data.products.length} Ürün</span>
                                </div>
                            </div>

                            <div className='fl col-3 col-sm-12  OrderDateCargo'>
                                <span className='OrderResult success'>{order?.data.orderPackageItems.length} Teslim</span>
                            </div>

                        </div>

                        <div className='fl col-12' id='OrderDetailProducts'>
                            <div className='row'>

                            {order?.data.products.map(pItem => {
                                return <div className='px py col-6 col-sm-12' key={pItem.id}>
                                    <div className='fl col-12 OrderDetailProductItem'>
                                        <div className='OrderDetailProductItemImage'>
                                            <div className="image-wrapper fl col-12">
                                                <span className="imgInner">
                                                    <Image layout="fill" src={pItem.image} alt="BALIKÇI YAKA ERKEK KAZAK"></Image>
                                                </span>
                                            </div>
                                        </div>
                                        <div className='OrderDetailProductItemTxt'>
                                            <div className='fl col-12 OrderDetailProductItemName'>{pItem.productName}</div>
                                            <div className='fl col-12 OrderDetailProductItemVariant'>Seçim : {pItem.productProperty[0]} - Adet : {pItem.amount}</div>
                                            <div className='fl col-12 OrderDetailProductItemQty'><b>{pItem.price} {pItem.moneySymbol}</b></div>
                                            <div className='fl col-12 OrderDetailProductStatus'>Teslim Edildi</div>
                                        </div>
                                    </div>
                                </div>   
                            })}
                                

                            </div>
                        </div>
                        <div className='fl col-12' id='OrderDetailBottom'>
                            <div className='fl col-6 col-sm-12 Item' id='OrderDetailAddress'>
                                <div className='fl col-12 Title'>Teslimat ve Fatura Bilgileri</div>
                                <div className='fl col-12 Content'>
                                    <p className='fl col-12'>{order?.data.customerFullName}</p>
                                    <p className='fl col-12'>Orhaniye Mah 119. Sk Gökkuşağı evleri A Blok D:23 Kat :3</p>
                                    <p className='fl col-12'>Menteşe 48000 / Muğla</p>
                                </div>
                            </div>
                            <div className='fl col-6 col-sm-12 Item' id='OrderDetailSummary'>
                                <div className='fl col-12 Title'>Ödeme Bilgileri</div>
                                <div className='fl col-12 Content'>
                                    <ul className='fl col-12'>
                                        <li>    <span>Ürün Toplamı</span>               <b>{order?.data.orderTotal} {order?.data.moneySymbol}</b>                            </li>
                                        <li>    <span>{order?.data.shipMethodName}</span>     <b>{order?.data.shippingPrice} {order?.data.moneySymbol}</b>                        </li>
                                        <li>    <span>Toplam</span>                     <b>{order?.data.orderTotal + order?.data.shippingPrice} {order?.data.moneySymbol}</b>        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {isOrder == false &&(
                <div className='fl col-12' id='OrderError'>
                    <div className='error'>Kayıt Bulunamadı</div>
                </div>
            )}

            

        </>
    )
}


/*

                        <div className='fl col-12' id='OrderDetailProgress'>
                            <ul className='fl col-12'>
                                <li><span>Onaylandı</span></li>
                                <li><span>Hazırlanıyor</span></li>
                                <li><span>Kargoya Verildi</span></li>
                                <li><span>Dağıtımda</span></li>
                                <li><span>Teslim Edildi</span></li>
                            </ul>
                        </div>



 */