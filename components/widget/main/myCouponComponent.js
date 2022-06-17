/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import UserProfileMenu from './User/UserProfileMenu'

export default function MyCouponComponent() {

    

  return (
    <div className="px py col-12" id="userDetail">
        <div className="row">
            <div className="container">
                <div id="userContent" className="fl col-12">
                    <div className="row">
                        <UserProfileMenu></UserProfileMenu>
                        <div className='px py col-10 col-sm-12'>
                          <div className="fl col-12" id="UserMiddleBar">
                            <div className="fl col-12 Title">@Web.UI.UserDiscountTitle</div>
                            <div className="fl col-12 Content">
                                <div className="fl col-12" id="DiscountList">
                                    <div className='alert alert-info'>
                                        Tarafınıza tanımlanmış herahngi bir indirim kuponu bulunmamaktar.

                                        (@Web.UI.NoCouponForUser)
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


