import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cookiefactory from '../../../../lib/cookiefactory';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import { getLink } from '../../../../redux/slices/linkSlice';
import { getList } from '../../../../redux/slices/listSlice';
import { getParam } from '../../../../redux/slices/paramSlice';
import ReactModal from 'react-modal';
import Dictionary from '../../../../lib/dictionary';


export default function RegisterInner({ authType, pageType }) {

    const dictionary = useSelector(getDictionary);
    const param = new Dictionary(useSelector(getParam));
    const [buttonLoading2, setButtonLoading2] = useState(false);
    const [registerError, setregisterError] = useState([]);

    const [authTypeIn, setAuthTypeIn] = useState(authType);

    const req = null; const res = null;

    const [customerRegister, setCustomerRegister] = useState({
        name: "",
        surname: "",
        username: "",
        gender: 0,
        phone: "",
        password: ""
    });

    const handleInputRegister = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setCustomerRegister({ ...customerRegister, [name]: value });
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        setButtonLoading2(true);
        const serverurl = process.env.serverurl
        let slug = serverurl + '/user/register';
        const cookiefactory = new Cookiefactory();
        const headerData = cookiefactory.GetCookies(req, res);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("hostaddress",  headerData["hostaddress"]);
        myHeaders.append("language",  headerData["language"]);
        myHeaders.append("locale",  headerData["locale"]);
        myHeaders.append("money",  headerData["money"]);
        myHeaders.append("uniqueId",  headerData["uniqueId"]);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(customerRegister),
            redirect: 'follow'
        };

        fetch(slug, requestOptions)
            .then(response => response.json())
            .then(result => {
                setButtonLoading2(false);
                if (result.status) {
                    setregisterError([]);
                    alert("Başarıyla Kayıt Oldunuz");
                    window.location.reload();
                } else {
                    setregisterError(result.errors);
                }
            })

    }

    return (
        <div className={authType ? "NormalLoginContent passive" : "NormalLoginContent active"} id='LoginRegister'>
            {registerError != "" && <div className="fl col-12 loginError">{registerError}</div>}
            <form action='' className='fl col-12 Content' onSubmit={handleSubmitRegister}>
                <div className='py col-12 form-group'>
                    <input type={"text"} name='name' id='name' onChange={handleInputRegister} placeholder={"@Web.UI.RegisterName"}></input>
                </div>
                <div className='py col-12 form-group'>
                    <input type={"text"} name='surname' id='surname' onChange={handleInputRegister} placeholder={"@Web.UI.RegisterSurname"}></input>
                </div>
                <div className='py col-12 form-group'>
                    <input type={"email"} name='username' id='username' onChange={handleInputRegister} placeholder={"@Web.UI.RegisterEmail"}></input>
                </div>
                <div className='py col-12 form-group'>
                    <input type={"text"} name='password' id='password' onChange={handleInputRegister} placeholder={"@Web.UI.RegisterPassword"}></input>
                </div>
                <div className='py col-12 form-group'>
                    <input type={"text"} name='password2' id='password2' onChange={handleInputRegister} placeholder={"@Web.UI.RegisterPasswordAgain"}></input>
                </div>
                <div className='py col-12 form-group'>
                    <input type={"text"} name='phone' id='phone' onChange={handleInputRegister} placeholder={"@Web.UI.RegisterPhone"}></input>
                </div>

                <div className='py col-12 form-group'>
                    {buttonLoading2 && <button disabled className='btn btn-primary withLoading' id='LoginBtn'> Kayıt Yapılıyor  </button>}
                    {!buttonLoading2 && <button type='submit' className='btn btn-primary' id='LoginBtn'> {dictionary["Web.UI.SignUpText"]}</button>}
                </div>
            </form>
        </div>
    )
}
