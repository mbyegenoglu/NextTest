import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import UserProfileMenu from './User/UserProfileMenu';
import { getDictionary } from '../../../redux/slices/dictionarySlice';


export default function MyNotificationComponent() {

  const dictionary = useSelector(getDictionary);

  const[cn, setNotification] = useState({
    cMail:true,
    cSms:true,
    cPhone:false
  });

  const handleInput = (e) => {
    if(e.target.dataset.name != undefined)
    {
      var tStatus = e.target.dataset.status;
      var m = "";

      if(tStatus == "true"){m = false;}
      else{ m = true;}  

      setNotification({ ...cn, [e.target.dataset.name]:m});
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ... cn}
    console.log(newRecord);
  }


  

  return (
    <>
        <div className="px py col-12" id="userDetail">
            <div className="row">
                <div className="container">
                    <div id="userContent" className="fl col-12">
                        <div className="row">
                            <UserProfileMenu></UserProfileMenu>
                            <div className="px py col-10 col-sm-12">
                              <div className="fl col-12" id="UserMiddleBar">
                                <div className="fl col-12 Title">{dictionary["Web.UI.UserNotificationTitle"] == undefined ? "Web.UI.UserNotificationTitle" : dictionary["Web.UI.UserNotificationTitle"]}</div>
                                <div className="fl col-12 Content">      
                                    <ul id="NotifSelectList">
                                        <li className={"fl col-12"} onClick={handleInput} data-name="cMail" data-status={cn.cMail}>
                                          <b className="fl col-12">{dictionary["Web.UI.UserNotificationMailTitle"]}</b>
                                          <span className="fl col-12">{dictionary["Web.UI.UserNotificationMailDesc"]}</span>
                                        </li>
                                        <li className={"fl col-12"} onClick={handleInput} data-name="cSms" data-status={cn.cSms}>
                                          <b className="fl col-12">{dictionary["Web.UI.UserNotificationSmsTitle"] == undefined ? "Web.UI.UserNotificationSmsTitle" : dictionary["Web.UI.UserNotificationSmsTitle"]}</b>
                                          <span className="fl col-12">{dictionary["Web.UI.UserNotificationSmsDesc"]}</span>
                                        </li>
                                        <li className={"fl col-12"} onClick={handleInput} data-name="cPhone" data-status={cn.cPhone}>
                                          <b className="fl col-12">{dictionary["Web.UI.UserNotificationPhoneTitle"] == undefined ? "Web.UI.UserNotificationPhoneTitle" : dictionary["Web.UI.UserNotificationPhoneTitle"]}</b>
                                          <span className="fl col-12">{dictionary["Web.UI.UserNotificationPhoneDesc"]}</span>
                                        </li>
                                    </ul>
                                    <div className="NotifSelectButton">
                                        <button onClick={handleSubmit}>{dictionary["Web.UI.UserNotificationEdit"] == undefined ? "Web.UI.UserNotificationEdit" : dictionary["Web.UI.UserNotificationEdit"]}</button>
                                    </div>
                                    
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
