import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cookiefactory from '../../../lib/cookiefactory';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import { getLink } from '../../../redux/slices/linkSlice';
import { getList } from '../../../redux/slices/listSlice';
import { getParam } from '../../../redux/slices/paramSlice';
import ReactModal from 'react-modal';
import Dictionary from '../../../lib/dictionary';
import $ from 'jquery';
import LoginInner from './Login/LoginInner';
import SocialInner from './Login/SocialInner';
import RegisterInner from './Login/RegisterInner';
export default function LoginComponent({ props, children, data }) {

  const dictionary = useSelector(getDictionary);
  const [authType, setAuthType] = useState(true);
  const changeType = () => {
    if (authType) {
      setAuthType(false);
    } else {
      setAuthType(true);
    }
  }

  return (
    <div className='px py col-12'>
      <div className='container'>
        <div className='fl col-12 NewLoginPage'>
          <div className='NewLoginPageInner'>
            <div className='fl col-12 NormalLogin'>
              <ul className='fl col-12'>
                <li className={authType ? "active" : "passive"} onClick={changeType}>Giriş Yap</li>
                <li className={authType ? "passive" : "active"} onClick={changeType}>Üye Ol</li>
              </ul>
              <LoginInner authType={authType}></LoginInner>
              <RegisterInner authType={authType}></RegisterInner>
            </div>
            <SocialInner></SocialInner>
          </div>
        </div>
      </div>







      <ReactModal
        isOpen={false}
        closeTimeoutMS={0}
        contentLabel={"Example Modal"}
        portalClassName={"ReactModalPortal"}
        overlayClassName={"ReactModal__Overlay"}
        id={"some-id"}
        className={"ReactModal__Content"}
        bodyOpenClassName={"ReactModal__Body--open"}
        htmlOpenClassName={"ReactModal__Html--open"}
        ariaHideApp={true}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        role={"dialog"}
        preventScroll={false}
        aria={{ labelledby: "heading", describedby: "full_description" }}
        data={{ background: "green" }}
        testId={""}
      >
        <p>Modal Content</p>
      </ReactModal>










    </div >
  )
}
