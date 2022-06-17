import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileMenu from './User/UserProfileMenu';
import { getDictionary } from '../../../redux/slices/dictionarySlice';

export default function MyUserInfoComponent() {


    const dictionary = useSelector(getDictionary);


    const[cPassword, setPassword] = useState({
        token : "423ba205-d870-46b0-ae0e-1d085178ff11",
        userId : "34bd6d93-07cb-4abb-bb8b-21ead39d3615",
        oldPass:"",
        newPass:"",
        newPass2:""
    });

    const[cUser, setUser] = useState({
        token : "423ba205-d870-46b0-ae0e-1d085178ff11",
        userId : "34bd6d93-07cb-4abb-bb8b-21ead39d3615",
        Name : "Muhammed",
        Surname : "YEGENOĞLU",
        Mail:"m.b.yegenoglu@gmail.com",
        Phone:"0 (546) 869 6163"
    });

    const handlePassInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPassword({ ...cPassword, [name]:value});
    }
    const handlePassSubmit = (e) => {
        e.preventDefault();
        console.log(cPassword);
    }

    const handleUserInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...cUser, [name]:value});
    }
    const handleUserSubmit = (e) => {
        e.preventDefault();
        console.log(cUser);
    }
    


  return (
    <div className="px py col-12" id="userDetail">
    <div className="row">
        <div className="container">
            <div id="userContent" className="fl col-12">
                <div className="row">
                    <UserProfileMenu></UserProfileMenu>
                    <div className="px py col-10 col-sm-12">
                    <div className="fl col-12" id="UserMiddleBar">
                        <div className="px col-12 Title">{dictionary["Web.UI.UserLinkUserInfo"] == undefined ? "Web.UI.UserLinkUserInfo":dictionary["Web.UI.UserLinkUserInfo    "]}</div>
                        <div className="fl col-12 Content">
                            <div className='px py col-6 col-sm-12' id='AccountInfo'>
                                <form action='' className='fl col-12 InfoInner' onSubmit={handleUserSubmit}>
                                    <div className='fl col-12 miniTitle'>{dictionary["Web.UI.UserInfoMiniTitle"]}</div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"text"} name={'Name'} placeholder={dictionary["Web.UI.UserInfoName"]}></input>
                                    </div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"text"} name={'Surname'} placeholder={dictionary["Web.UI.UserInfoSurname"]}></input>
                                    </div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"text"} name={'Mail'} placeholder={dictionary["Web.UI.UserInfoMail"]}></input>
                                    </div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"text"}  name={'Phone'} placeholder={dictionary["Web.UI.UserInfoPhone"] == undefined ? "Web.UI.UserInfoPhone":dictionary["Web.UI.UserInfoPhone"]}></input>
                                    </div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"submit"} className="btn btn-primary" value={dictionary["Web.UI.UserInfoUpdateButton"] == undefined ? "Web.UI.UserInfoUpdateButton":dictionary["Web.UI.UserInfoUpdateButton"]}></input>
                                    </div>
                                </form>
                                
                            </div>

                            <div className='px py col-6 col-sm-12' id='PasswordInfo'>
                                <form action='' className='fl col-12 InfoInner' onSubmit={handlePassSubmit}>
                                    <div className='fl col-12 miniTitle'>{dictionary["Web.UI.UserInfoPasswordUpdate"]}</div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"password"} name="oldPass" onChange={handlePassInput} placeholder={dictionary["Web.UI.UserInfoNowPassword"]}></input>
                                    </div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"password"} name="newPass" onChange={handlePassInput} placeholder={dictionary["Web.UI.UserInfoNewPassword"]}></input>
                                    </div>
                                    <div className='fl py col-12 form-group'>
                                        <input type={"password"} name="newPass2" onChange={handlePassInput} placeholder={dictionary["Web.UI.UserInfoNewPasswordAgain"]}></input>
                                    </div>
                                    <div className='fl col-12 form-group'>
                                        <input type={"submit"} className="btn btn-primary" value={dictionary["Web.UI.UserInfoPasswordUpdate"] == undefined ? "Web.UI.UserInfoPasswordUpdate":dictionary["Web.UI.UserInfoPasswordUpdate"]}></input>
                                    </div>
                                </form>
                                
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
