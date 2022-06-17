import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import { getLink } from '../../../../redux/slices/linkSlice';

import {AiFillCalculator,AiOutlineHeart,AiOutlineEye,AiOutlineUserSwitch,AiOutlineTags,AiOutlineAntDesign,AiOutlineBell} from "react-icons/ai";


export default function UserMenu() {

  const dictionary = useSelector(getDictionary);
  const links = useSelector(getLink);
  const router = useRouter();
  const activeRouter = router.asPath.replace("/","");
  return (
    <div className="px py col-2 col-sm-12" id="UserLeftBar">
      <div className="fl col-12 Title">{dictionary["Web.UI.UserPanelLeftTitle"] == undefined ? "Web.UI.UserPanelLeftTitle" : dictionary["Web.UI.UserPanelLeftTitle"]}</div>
      <ul className="fl col-12">
        <li className="fl col-12">
          <Link href={links["MyOrder"]}>
            <a className={activeRouter == links["MyOrder"] ? "active" : ""}>
              <AiFillCalculator></AiFillCalculator>
              {dictionary["Web.UI.UserLinkOrder"] == undefined ? "Web.UI.UserLinkOrder" : dictionary["Web.UI.UserLinkOrder"]}
            </a>
          </Link>
        </li>
        <li className="fl col-12">
          <Link href={links["Favourites"] == undefined ? "#" : links["Favourites"]}>
            <a className={activeRouter == links["LastViewedProduct"] ? "active" : ""}>
              <AiOutlineHeart></AiOutlineHeart>
              {dictionary["Web.UI.UserLinkFavorite"] == undefined ? "Web.UI.UserLinkFavorite" : dictionary["Web.UI.UserLinkFavorite"]}
            </a>
          </Link>
        </li>
        <li className="fl col-12">
          <Link href={links["LastViewedProduct"] == undefined ? "#" : links["LastViewedProduct"]}>
            <a className={activeRouter == links["LastViewedProduct"] ? "active" : ""}>
              <AiOutlineEye></AiOutlineEye>
              {dictionary["Web.UI.UserLinkHistory"] == undefined ? "Web.UI.UserLinkHistory" : dictionary["Web.UI.UserLinkHistory"]}
            </a>
          </Link>
        </li>
        <li className="fl col-12">
          <Link href={links["MyCoupon"]}>
            <a className={activeRouter == links["MyCoupon"] ? "active" : ""}>
            <AiOutlineTags></AiOutlineTags>
              {dictionary["Web.UI.UserLinkCoupon"] == undefined ? "Web.UI.UserLinkCoupon" : dictionary["Web.UI.UserLinkCoupon"]}
            </a>
          </Link>
        </li>
        <li className="fl col-12">
          <Link href={links["Userinfo"]}>
            <a className={activeRouter == links["Userinfo"] ? "active" : ""}>
              <AiOutlineUserSwitch></AiOutlineUserSwitch>
              {dictionary["Web.UI.UserLinkUserInfo"] == undefined ? "Web.UI.UserLinkUserInfo" : dictionary["Web.UI.UserLinkUserInfo"]}
            </a>
          </Link>
        </li>


        <li className="fl col-12">
          <Link href={links["MyAddress"]}>
            <a className={activeRouter == links["MyAddress"] ? "active" : ""}>
              <AiOutlineAntDesign></AiOutlineAntDesign>
              {dictionary["Web.UI.UserLinkAddressInfo"] == undefined ? "Web.UI.UserLinkAddressInfo" : dictionary["Web.UI.UserLinkAddressInfo"]}
            </a>
          </Link>
        </li>



        <li className="fl col-12">
          <Link href={links["MyNotification"]}>
            <a className={activeRouter == links["MyNotification"] ? "active" : ""}>
              <AiOutlineBell></AiOutlineBell>
              {dictionary["Web.UI.UserLinkNotificationInfo"] == undefined ? "Web.UI.UserLinkNotificationInfo" : dictionary["Web.UI.UserLinkNotificationInfo"]}
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
