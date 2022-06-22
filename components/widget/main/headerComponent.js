/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';
import Modal from 'react-modal';

import { fillBasket, getBasket, postBasketData } from '../../../redux/slices/basketSlice';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import { getLanguage } from '../../../redux/slices/languageSlice';
import { getMenu } from '../../../redux/slices/menuSlice';
import { getMoney } from '../../../redux/slices/moneySlice';
import { getParam } from '../../../redux/slices/paramSlice';
import { getLink } from '../../../redux/slices/linkSlice';
import Cookies from 'universal-cookie';
import Dictionary from '../../../lib/dictionary';
import Cookiefactory from '../../../lib/cookiefactory';
import Link from 'next/link';
import Image from 'next/dist/client/image';
import MobilemenuComponent from './mobilemenuComponent';
import { AiOutlineShopping,AiOutlineHeart,AiOutlineUser,AiOutlinePhone,AiOutlineMenu,AiOutlineSearch } from "react-icons/ai";

export default function Header({ data }) {
  const [Head, getHead] = useState([]);
  const [culturModalIsOpen, setCultureIsOpen] = React.useState(false);
  const [mobileMenuIsOpen, setMenuIsOpen] = React.useState(false);
  const cookiefactory = new Cookiefactory();
  const cookies = cookiefactory.GetCookies();
  const req = null; const res = null;
  const dispatch = useDispatch();
  const token = cookiefactory.GetToken(req, res);
  const dictionary = useSelector(getDictionary);
  const param = new Dictionary(useSelector(getParam));
  const links = useSelector(getLink);
  const basket = useSelector(getBasket);
  const menus = useSelector(getMenu);
  const languages = useSelector(getLanguage);
  const moneys = useSelector(getMoney);

  useEffect(() => {
    let headerData = Object.assign({}, cookies);
    let token = cookiefactory.GetToken();
    if (token != null) {
      headerData.Authorization = "Bearer " + token;
    }
    dispatch(postBasketData({ headers: headerData }));
  }, []);

  function toggleCulture() {
    if (culturModalIsOpen) {
      setCultureIsOpen(false);
    }
    else {
      setCultureIsOpen(true);
    }
  }


  function changeLanguage(m) {
    console.log(m);
  }

  function changeMoney(m) {
    console.log(m);
  }

  function changeLocation(m) {
    console.log(m);
  }



  const getMenuList = function () {
    if (token == null) {
      return <ul className="fl col-12 noLoginList">
        <li className="px py col-12">
          <Link href={links["Login"]}>
            <a>{dictionary["Web.UI.LogInText"]}</a>
          </Link>
        </li>
      </ul>
    } else {
      return <ul className="fl col-12 noLoginList">
        <li className="px py col-12">
          <Link href={links["Userinfo"]}>
            <a>{dictionary["Web.UI.UserInfoMiniTitle"]}</a>
          </Link>
        </li>
        <li className="px py col-12">
          <Link href={links["MyOrder"]}>
            <a>{dictionary["Web.UI.UserLinkOrder"]}</a>
          </Link>
        </li>
        <li className="px py col-12">
          <Link href={links["MyAddress"]}>
            <a>{dictionary["Web.UI.UserAddressTitle"]}</a>
          </Link>
        </li>
        <li className="px py col-12">
          <Link href={links["MyCoupon"]}>
            <a>{dictionary["Web.UI.UserDiscountTitle"]}</a>
          </Link>
        </li>
        <li className="px py col-12">
          <Link href={links["MyNotification"]}>
            <a>{dictionary["Web.UI.UserLinkNotificationInfo"]}</a>
          </Link>
        </li>
      </ul>
    }
  }
  {/* Mobile Menu Start jQuery */ }
  const mobileMenuButton = () => {
    if ($(".mobileMenu").hasClass("show")) {
      $(".mobileMenu").removeClass("show").addClass("hidden");
      $("#mobileMenuButton").html('<i class="las la-bars"></i>');
      $("body").removeClass("Hidden");
    }
    else {
      $(".mobileMenu").addClass("show").removeClass("hidden");
      $("#mobileMenuButton").html('<i class="las la-times"></i>');
      $("body").addClass("Hidden");
    }

    if ($("#SearchWrap").hasClass("active")) {
      $("#SearchWrap").removeClass("active");
      $("#mobileSearchButton").html('<i class="las la-search"></i>');
    }
  }
  const searchButton = () => {
    if ($("#SearchWrap").hasClass("active")) {
      $("#SearchWrap").removeClass("active");
      $("#mobileSearchButton").html('<i class="las la-search"></i>');
    }
    else {
      $("#SearchWrap").addClass("active");
      $("#mobileSearchButton").html('<i class="las la-times"></i>');
    }
    if ($(".mobileMenu").hasClass("show")) {
      $(".mobileMenu").removeClass("show").addClass("hidden");
      $("#mobileMenuButton").html('<i class="las la-bars"></i>');
      $("body").removeClass("Hidden");
    }
  }
  {/* Mobile Menu Finish jQuery */ }

  const [genderModal, setgenderModal] = useState(false);

  useEffect(() => {
    const ss = new Cookies();
    if (ss.get('Gender') == undefined) {
      setgenderModal(true);
    }
  }, []);


  const changeGender = (a) => {
    setgenderModal(false);
    const ss = new Cookies();
    ss.set('Gender', a, {maxAge: 60 * 60 * 72});
  }


  return (
    <>
      <header>
        <div className="px col-12" id="Top">
          <div className="container">
            <div className='fl col-6 col-sm-4' id='currLang'>
              <ul className='fl col-12'>
                <li>
                  <span>{cookies.locale}</span>
                  <ul className='fl col-12' id='LocationList'>
                    <li><a onClick={() => changeLocation("LocationTag")}> AD - Andorra</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> AZ - Azerbaijan</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> CY - Cyprus</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> OM - Oman</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> SA - Saudi Arabia</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> TR - Türkiye</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> DE - Germany</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> NL - Netherlands</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> FR - France</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> AD - Andorra</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> AZ - Azerbaijan</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> CY - Cyprus</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> OM - Oman</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> SA - Saudi Arabia</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> TR - Türkiye</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> DE - Germany</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> NL - Netherlands</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> FR - France</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> AD - Andorra</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> AZ - Azerbaijan</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> CY - Cyprus</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> OM - Oman</a></li>
                    <li><a onClick={() => changeLocation("LocationTag")}> SA - Saudi Arabia</a></li>
                  </ul>
                </li>
                <li>
                  <span>{cookies.language}</span>
                  <ul className='fl col-12'>
                    {languages?.map((lItem, i) => {
                      return <li key={i}><a onClick={() => changeLanguage(lItem.symbol)}> {lItem.title}</a></li>
                    })}
                  </ul>
                </li>
                <li>
                  <span>{cookies.money}</span>
                  <ul className='fl col-12'>
                    {moneys?.map((mItem, i) => {
                      return <li key={i}><a onClick={() => changeMoney(mItem.symbol)}> {mItem.symbol} - {mItem.short} {mItem.long}</a></li>
                    })}
                  </ul>
                </li>
              </ul>
            </div>

            <div className='fl col-6 col-sm-8' id='TopContact'>
              <Link href='/siparis-takip-sayfasi'><a>Kargom Nerede ?</a></Link>
              <Link href={'tel:' + param.telno}><a> <AiOutlinePhone></AiOutlinePhone>{param.telno==undefined ? "Numara Yazın" : param.telno}</a></Link>
              <Link href='#'><a>{dictionary["Web.UI.SaleOnPatirti"]}</a></Link> 
            </div>
          </div>
        </div>
        <div className="px col-12" id="Middle">
          <div className="container">
            <div className="row">
              <div className="px py col-3 col-sm-4 mobile" id="UserWrap">
                <ul className="fl col-12" id="userLink">
                  <li><a id='mobileMenuButton' onClick={mobileMenuButton}><AiOutlineMenu></AiOutlineMenu></a></li>
                  <li><a id='mobileSearchButton' onClick={searchButton}> <AiOutlineSearch></AiOutlineSearch> </a></li>
                </ul>
              </div>

              <div className="px py col-3 col-sm-4" id="LogoWrap">
                <Link href={"/"}>
                  <a className="fl col-12" id="Logo"><Image height={60} width={200}  src={"https://img1ptrti.mncdn.com/content/images/thumbs/626cd59d0d79cd803ce43b67.png"} alt="Patırtı 2022"></Image></a>
                </Link>
              </div>

              <div className="px py col-6" id="SearchWrap">
                <form action="#" className="fl col-12" id="Search">
                  <input type="text" name="" id="SearchInput" className="fl col-12" placeholder={dictionary["Web.UI.SearchPlaceHolder "]}></input>
                  <button id="SearchBtn"><AiOutlineSearch></AiOutlineSearch></button>
                </form>
              </div>

              <div className="px py col-3 col-sm-4" id="UserWrap">
                <ul className="fl col-12" id="userLink">
                  <li>
                    <div className='Item'><AiOutlineUser></AiOutlineUser></div>
                    {getMenuList()}
                  </li>
                  <li>
                    <Link href="/Favoriler">
                    <a><AiOutlineHeart></AiOutlineHeart></a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"Sepet"}>
                      <a><AiOutlineShopping></AiOutlineShopping> <span className="cart-soft-count">{basket?.reduce((a, e) => a += e.amount, 0)}</span></a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="px col-12" id="Bottom">
          <div className="container">
            <ul className="fl col-12" id="mainMenu">
              {menus[1]?.map((linkItem, index) => {
                return <li key={index}>
                  
                  <Link href={linkItem.seoUrl}>
                    <a>{linkItem.label}</a>
                  </Link>
                  {linkItem.submenus.length > 1 && (
                    <div className="px py col-12 subMenu">
                      <div className="fl col-8 Link">
                        {linkItem.submenus?.map((lItem, index) => {
                          return <div className="px py subLinkWrap col-3" key={index}>
                            <Link href={lItem.seoUrl}>
                              <a className="fl col-12">{lItem.label}</a>
                            </Link>
                          </div>
                        })}

                      </div>
                      <div className="fl col-4 Image">
                        {linkItem.Banner?.map(bItem => {
                          return <div className="px py col-6" key={bItem.Id}>
                            <Link href={bItem.Url}>
                              <a className="fl col-12">
                                <Image
                                  src={bItem.Banner}
                                  alt={bItem.Title}
                                  className="fl col-12"
                                  height={300}
                                  width={300}
                                >

                                </Image>
                              </a>
                            </Link>
                          </div>
                        })}
                      </div>
                    </div>
                  )}
                </li>
              })}
            </ul>
          </div>
        </div>



        <Modal
          isOpen={culturModalIsOpen}
          onRequestClose={toggleCulture}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="modalOverlay Top"
        >
          <div className='modalTitle'>
            <h4>{dictionary["WEB.UI.CultureModal.Title"]}</h4>
            <button onClick={toggleCulture}><Image layout="fill" src={param["cdnhost"] + '/Assets/Img/Icons/close-line.svg'} alt={dictionary["WEB.UI.CultureModal.Close"]}></Image></button>
          </div>

          <div className='modalBody'>
            <div className='px py col-12 form-group'>
              <select>
                <option> Türkiye </option>
                <option> Almanya </option>
              </select>
            </div>

            <div className='px py col-12 form-group'>
              <select>
                {languages?.map(lng =>
                  <option key={lng.symbol} value={lng.symbol}>{lng.title}</option>

                )}
              </select>
            </div>

            <div className='px py col-12 form-group'>
              <select>
                {moneys?.map(m =>
                  <option key={m.short} value={m.short}>{m.long}</option>
                )}
              </select>
            </div>

          </div>

          <div className='modalFooter'>

            <button className='btn  applyBtn applyCulture'>{dictionary["WEB.UI.CultureModal.Accept"]}</button>


          </div>

        </Modal>



      </header>
      <MobilemenuComponent menu={menus[1]}></MobilemenuComponent>


      <Modal
        isOpen={genderModal}
        id="GenderModal"
        className={"GenderModal"}
        bodyOpenClassName={"GenderModalOpened"}
      >
        <h2 className='fl col-12'>{"Aradığınız her şey Patırtı'da!"}</h2>
        <p className='fl col-12'>Alışveriş deneyiminizi kolaylaştırmak için aşağıdaki seçeneklere bakabilirsiniz</p>

        <ul className='fl col-12'>
          <li onClick={(event) => changeGender(2)}>
            <Image height={300} width={300} alt='Kadın' src="https://cdn.dsmcdn.com/web/production/gender-popup-female.png"></Image>
            <span>KADIN</span>
          </li>
          <li onClick={(event) => changeGender(1)}>
            <Image  height={300} width={300} alt='Erkek' src="https://cdn.dsmcdn.com/web/production/gender-popup-male.png"></Image>
            <span>ERKEK</span>
          </li>
        </ul>

      </Modal>


    </>

  )

}




/*
{lItem.submenus.length > 1 &&(
  <ul className="fl col-12">
    {lItem.submenus?.map(llIem => {
      return <li className="fl col-12" key={llIem.seourl}><a href={llIem.seourl} className="fl col-12">{llIem.label}</a></li>
    })}

  </ul>
)}

*/