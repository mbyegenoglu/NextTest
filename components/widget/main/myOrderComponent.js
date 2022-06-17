import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import UserProfileMenu from './User/UserProfileMenu';

export default function MyOrderComponent() {


  const dictionary = useSelector(getDictionary);
  return (
    <div className="px py col-12" id="userDetail">
        <div className="row">
            <div className="container">
                <div id="userContent" className="fl col-12">
                    <div className="row">
                        <UserProfileMenu></UserProfileMenu>
                        <div className='px py col-10 col-sm-12'>
                          <div className="fl col-12" id="UserMiddleBar">
                              <div className="fl col-12 Title">{dictionary["Web.UI.UserOrderTitle"]}</div>
                              <div className="fl col-12 Content">
                                  
                                  <div id="orderList" className="fl col-12">
                                      <div className="fl col-12 orderItem">
                                          <div className="col-2-5 col-sm-6 Date">
                                              <b className="fl col-12">{dictionary["Web.UI.UserOrderDetailDate"]}</b>
                                              <span className="fl col-12">11 Mart 2022 - 09:31</span>
                                          </div>
                                          <div className="col-2-5 col-sm-6 Summary">
                                              <b className="fl col-12">{dictionary["Web.UI.UserOrderDetailSummary"]}</b>
                                              <span className="fl col-12">
                                                4 {dictionary["Web.UI.UserOrderDetailDelivery"] == undefined? "Web.UI.UserOrderDetailDelivery": dictionary["Web.UI.UserOrderDetailDelivery"]}, 
                                                4 {dictionary["Web.UI.UserOrderDetailProduct"] == undefined? "Web.UI.UserOrderDetailProduct": dictionary["Web.UI.UserOrderDetailProduct"]}</span>
                                          </div>
                                          <div className="col-2-5 col-sm-6 Customer">
                                              <b className="fl col-12">{dictionary["Web.UI.UserOrderDetailCustomer"]}</b>
                                              <span className="fl col-12">MUHAMMED YEGENOGLU</span>
                                          </div>
                                          <div className="col-2-5 col-sm-6 Amount">
                                              <b className="fl col-12">{dictionary["Web.UI.UserOrderDetailAmount"]}</b>
                                              <span className="fl col-12">560,44 TL</span>
                                          </div>
                                          <div className="col-2-5 col-sm-6 Detail">
                                              <a className='fl col-12' href={"/OrderDetail"}>{dictionary["Web.UI.UserOrderDetailLink"]}</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


/*
<div id="orderNavigation" className="fl col-12">
    <ul className="fl col-12">
        <li><a href="Boş" className="fl col-12 active">{dictionary["Web.UI.UserOrderNavAll"] == undefined? "Web.UI.UserOrderNavAll": dictionary["Web.UI.UserOrderNavAll"]}</a></li>
    </ul>
</div>

*/