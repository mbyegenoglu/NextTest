import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cookiefactory from '../../../../lib/cookiefactory';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import { getLink } from '../../../../redux/slices/linkSlice';
import { getList } from '../../../../redux/slices/listSlice';
import { getParam } from '../../../../redux/slices/paramSlice';
import ReactModal from 'react-modal';
import Dictionary from '../../../../lib/dictionary';

export default function LoginInner({ authType , pageType}) {


    const dictionary = useSelector(getDictionary);
    const param = new Dictionary(useSelector(getParam));
    const req = null; const res = null;
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [noLoginNoReg, setNoLoginNoReg] = useState(false);



    const [customerLogin, setCustomer] = useState({
        Username: "",
        Password: "",
    });
    const handleInputLogin = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setCustomer({ ...customerLogin, [name]: value });
    }
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setButtonLoading(true);

        var myHeaders = new Headers();
        const cookiefactory = new Cookiefactory();
        const headerData = cookiefactory.GetCookies(req, res);
        const token = cookiefactory.GetToken(req, res);
        if (!!token) {
            headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);
        }
        const serverurl = process.env.serverurl;
        const formd = new FormData();
        formd.append("Username", customerLogin.Username);
        formd.append("Password", customerLogin.Password);

        let slug = "https://auth.antremeta.com" + '/Token/Get';
        const requestOptions = { method: 'POST', headers: headerData, body: formd };

        fetch(slug, requestOptions).then(response => response.json()).then(data => {
            setButtonLoading(false);
            if (data.status == 401) {
                setLoginError("Hatalı şifre ya da kullanıcı adı");
            }
            else if (data.accessToken != null) {
                setLoginError("");
                cookiefactory.SetToken(data, req, res);
                var Link = window.location.hostname;
                var oldLink = document.referrer;
                if (oldLink.indexOf(Link) > -1) {
                    if(pageType == "Normal"){
                        window.location.href = oldLink;
                    }
                    else{
                        location.reload();

                    }
                    
                }
                else {
                    window.location.href = "/";
                }
            }
        }).catch(error => { setButtonLoading(false); setLoginError(error); });



    }



    return (
        <div className={authType ? "NormalLoginContent active" : "NormalLoginContent passive"} id='LoginWrap'>
            {loginError != "" && <div className="fl col-12 loginError">{loginError}</div>}
            <form action='' className='fl col-12 Content' onSubmit={handleSubmitLogin}>
                <div className='py col-12 form-group'>
                    <input type={"email"} name='Username' id='Username' onChange={handleInputLogin} placeholder={dictionary["Web.UI.RegisterEmail"] == undefined ? "Web.UI.RegisterEmail" : dictionary["Web.UI.RegisterEmail"]}></input>
                </div>
                <div className='py col-12 form-group'>
                    <input type={"password"} name='Password' id='Password' onChange={handleInputLogin} placeholder={dictionary["Web.UI.RegisterPassword"] == undefined ? "Web.UI.RegisterPassword" : dictionary["Web.UI.RegisterPassword"]}></input>
                </div>
                <div className='py col-12 form-group'>
                    {buttonLoading && <button disabled className='btn btn-primary withLoading' id='LoginBtn'> Giriş Yapılıyor  </button>}
                    {!buttonLoading && <button type='submit' className='btn btn-primary' id='LoginBtn'> {dictionary["Web.UI.LogInText"]}</button>}
                </div>
            </form>
            {noLoginNoReg && <button className='btnNoRegNoLog'>Üyeliksiz Alışveriş</button>}

        </div>
    )
}
