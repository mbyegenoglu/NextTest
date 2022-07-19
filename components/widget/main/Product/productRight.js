/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookiefactory from '../../../../lib/cookiefactory';
import { setBasket } from '../../../../redux/slices/basketSlice';
import { getParam } from '../../../../redux/slices/paramSlice';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import ProductPrice from './productPrice';
import $ from 'jquery';
import { RiTruckLine } from 'react-icons/ri'
import { GrClose } from 'react-icons/gr'
import Modal from 'react-modal';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import Cookies from "universal-cookie";
import mobileProductPrice from "./mobileProductPrice";
import Dictionary from '../../../../lib/dictionary';
import {
    AiFillStar,
    AiOutlineStar,
    AiOutlineHeart,
    AiOutlineShareAlt,
    AiOutlineWhatsApp,
    AiOutlineFacebook,
    AiFillBoxPlot,
    AiOutlineTwitter
} from "react-icons/ai";
import MobileProductPrice from './mobileProductPrice';
import FavoriteManipulations from '../Favorite/FavoriteManipulations';


export default function ProductRight({ data }) {
    const dispatch = useDispatch();
    const dictionary = useSelector(getDictionary);
    const Product = data;
    const [sVariant, setSVariant] = useState(null);
    const [sPrice, setSPrice] = useState({ defaultPrice: Product.defaultPrice, salePrice: Product.salePrice, moneySymbol: Product.moneySymbol, priceId: Product.priceId });
    const param = new Dictionary(useSelector(getParam));
    const [sizeChartModalIsOpen, setSizeChartModal] = useState(false);

    const setVariant = function (v) {
        setSVariant(v);
        $(".addToCartNotification").removeClass("active");
    }

    const addBasket = function () {

        if (sVariant != null) {
            let cookiefactory = new Cookiefactory();
            dispatch(
                setBasket({ basket: 
                    {   productId: Product.refId, 
                        variantId: sVariant.refId, 
                        lineType: 0, 
                        price: sPrice.salePrice, 
                        originalPrice: sPrice.defaultPrice, 
                        amount: 1, 
                        total: sPrice.salePrice, 
                        taxRate: 18, 
                        tax: sPrice.salePrice * 18 / 100, 
                        netTotal: sPrice.salePrice, 
                        moneySymbol: sPrice.moneySymbol, 
                        brand: Product.brandName, 
                        name: Product.productName, 
                        deliveryTime: Product.deliveryTime, priceId: sPrice.priceId }, cookies: cookiefactory.GetCookies(), token: cookiefactory.GetToken() }));

            $(".AddToCart button.addToCart").css("background", "#2ecc71");
            $(".AddToCart button.addToCart").text("Sepete Eklendi.");

            setTimeout(function () {
                $(".AddToCart button.addToCart").css("background", "#ff4200");
                $(".AddToCart button.addToCart").text("Sepete Ekle");
            }, 2000);
        }
        else {
            $(".addToCartNotification").addClass("active");
        }
    }



    const onMouseforBigColorImage = (e) => {
        $("#OtherColorWrap").addClass("active");
        $("#OtherColorWrap img").attr("src", e.target.src);
    }

    const offMouseforBigColorImage = () => {
        $("#OtherColorWrap").removeClass("active")
    }

    function openSizeChartModal() {
        if (sizeChartModalIsOpen) {
            setSizeChartModal(false)
        } else {
            setSizeChartModal(true)
        }

    }


    const [currentFavoriteProductId, setcurrentFavoriteProductId] = useState("");

    const addFavorite = function (e) {
        setcurrentFavoriteProductId(e);
    }



    return (

        <div className="px col-6 col-sm-12" id="prodctRight">
            
            <FavoriteManipulations favProduct={currentFavoriteProductId} ></FavoriteManipulations>

            <div className="fl col-12 productDetailWithOut">
                <div className="fl col-12 Top">
                    <h2 id="productBrand" className="fl col-12">
                        {Product.brandName == undefined ? "Patırtı" : Product.brandName}
                        <button className='Title Like'><AiOutlineHeart></AiOutlineHeart></button>
                        <div className='shareBtn'>
                            <button className='Title Share'><AiOutlineShareAlt></AiOutlineShareAlt></button>
                            <ul className='shareList'>
                                <li><a href={'https://wa.me/?text=' + Product.productName}><AiOutlineWhatsApp></AiOutlineWhatsApp></a></li>
                                <li><a href={'https://www.facebook.com/sharer/sharer.php?u' + Product.productName}><AiOutlineFacebook></AiOutlineFacebook></a></li>
                                <li><a href={'http://twitter.com/share?text=' + Product.productName}><AiOutlineTwitter></AiOutlineTwitter></a></li>
                            </ul>
                        </div>

                    </h2>
                    <h1 id="productName" className="fl col-12">
                        {Product.productName}
                    </h1>
                    <div id='productStockCode' className='fl col-12'>{Product.stockCode}</div>
                    <div className="fl col-12 productComment">
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiFillStar></AiFillStar>
                        <AiOutlineStar></AiOutlineStar>
                        <span>13</span>
                    </div>
                </div>

                <ProductPrice price={sPrice}></ProductPrice>

                <div className="fl col-12 SubWrapper">
                    {Product.linkeds.lenght > 0 && (
                        <div className="fl col-12 subSection subOne">
                            <div className="fl col-12 Title">{dictionary["Web.UI.ChooseVariantOne"]}</div>
                            <ul className="fl col-12">
                                {Product.linkeds?.map((Color, i) => {
                                    return <li className="fl col-1" key={i}>
                                        <a href={Color.url} data-src={'https://cdn.dsmcdn.com/ty134/product/media/images/20210618/14/102146071/188127939/1/1_org_zoom.jpg'} className="fl col-12" onMouseOver={onMouseforBigColorImage} onMouseOut={offMouseforBigColorImage}>
                                            <div className="image-wrapper fl col-12">
                                                <span className="imgInner">
                                                    <Image layout="fill" src={'https://cdn.dsmcdn.com//ty134/product/media/images/20210618/14/102146071/188127939/1/1_org.jpg'} alt={Product.productName + "_" + i.toString()}></Image>
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                })}
                            </ul>
                        </div>
                    )}





                    <div className="fl col-12 subSection subTwo">
                        <div className="fl col-12 Title">{dictionary["Web.UI.ChooseVariantTwo"]}  <button onClick={openSizeChartModal}> <AiFillBoxPlot></AiFillBoxPlot>{dictionary["Web.UI.SizeTable"]}</button></div>
                        <ul className="fl col-12">
                            {Product.variants?.map(v => {
                                return v.properties.filter(p => p.isUseVariant).map(Size => {
                                    if (v.stock == 0) {
                                        return <li key={Size.refId}><div className='passive'>{Size.value}</div></li>
                                    } else {
                                        return <li key={Size.refId}><div className={sVariant?.refId == v.refId ? "selected" : ""} data-id={Size.refId} onClick={e => setVariant(v)}>{Size.value}</div></li>
                                    }
                                });
                            })}
                        </ul>
                        <div className='fl col-12 addToCartNotification'>{dictionary["Web.UI.SizeAlert"] == undefined ? "Web.UI.SizeAlert": dictionary["Web.UI.SizeAlert"]}</div>
                    </div>
                </div>


                <div className="fl col-12 AddToCart">
                    <button className="addToCart" onClick={e => addBasket()}>{dictionary["Web.UI.AddToCart"]}</button>
                    <a href="#" className="AddToWp">{dictionary["Web.UI.Whatsapp2Cart"]}</a>
                    <button className={"addToFav"}  onClick={e => addFavorite(Product.refId)}><AiOutlineHeart></AiOutlineHeart></button>
                </div>

                <div className="fl col-12 AddToCartSticky">
                    <MobileProductPrice price={sPrice}></MobileProductPrice>
                    <div className="fl col-7 cartSticky">
                        <a href="#" onClick={e => addBasket()} className="AddToWp">{dictionary["Web.UI.AddToCart"]}</a>
                    </div>
                </div>


                <div className="fl col-12 productMiniInfo">
                    {Product.deliveryTime != null && (
                        <div className='Item Cargo'>
                            <RiTruckLine></RiTruckLine> <b>{dictionary["Web.UI.ProductDetailDeliveryTitle"]}</b>
                            <span>{Product.deliveryTime} gün içinde kargoda</span>
                        </div>
                    )}
                    <div className="Item"><AiOutlineHeart></AiOutlineHeart> 123 {dictionary["Web.UI.ProductDetailFavoriteCalculate"]}</div>
                </div>






            </div>

            <div className="px py col-12" id="mobileContactSale">
                <a href="#" className="mobileWhaBtn">
                    {dictionary["@Web.UI.WhatsappToCart"] != null ? dictionary["@Web.UI.WhatsappToCart"] :"@Web.UI.WhatsappToCart"}
                </a>
                <a href="#" className="mobilePhoBtn">
                    {dictionary["@Web.UI.PhoneToCart"] != null ? dictionary["@Web.UI.PhoneToCart"] :"@Web.UI.PhoneToCart"}
                </a>
            </div>

            <div className="fl col-12 productDetail">
                <div className="fl col-12 Title">{dictionary["Web.UI.ProductDetailTitle"]}</div>
                <div className="fl col-12 Content" dangerouslySetInnerHTML={{ __html: Product.primaryContent }}>

                </div>
            </div>
            <Modal
                isOpen={sizeChartModalIsOpen}
                onRequestClose={openSizeChartModal}
                className="sizeChartModal"
                overlayClassName={"sizeChartOverlay"}
            >
                <button onClick={openSizeChartModal} className="closeModel"><GrClose></GrClose></button>
                <div className='fl col-12 SizeChartContent'>
                    <div className='SizeChartSide'>
                        <h2>ÖLÇÜ TABLOSU</h2>
                        <div className='fl col-12 Accordion'>
                            <h3>GİYİM</h3>
                            <div className='AccordionContent'>
                                <ul>
                                    <li><span>TRİKO</span></li>
                                    <li><span>KAZAK</span></li>
                                    <li><span>GÖMLEK</span></li>
                                    <li><span>PANTOLON</span></li>
                                    <li><span>CEKET</span></li>
                                    <li><span>HIRKA</span></li>
                                    <li><span>DIŞ GİYİM</span></li>
                                    <li><span>YELEK</span></li>
                                    <li><span>POLO</span></li>
                                    <li><span>T-SHIRT</span></li>
                                    <li><span>İÇ GİYİM</span></li>
                                    <li><span>ŞORT</span></li>
                                    <li><span>MAYO</span></li>
                                </ul>
                            </div>
                            <h3>AKSESUAR</h3>
                            <div className='AccordionContent'>
                                <ul>
                                    <li><span>ÖRGÜ KRAVAT & MENDİL</span></li>
                                    <li><span>MASKE</span></li>
                                    <li><span>ÇORAP</span></li>
                                    <li><span>KEMER</span></li>
                                    <li><span>ATKI & BERE</span></li>
                                </ul>
                            </div>
                            <h3>AYAKKABI</h3>
                            <div className='AccordionContent'>
                                <ul>
                                    <li><span>KLASİK AYAKKABI</span></li>
                                    <li><span>SPOR AYAKKABI</span></li>
                                    <li><span>BOT</span></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
        
            

        </div>


    )
}
