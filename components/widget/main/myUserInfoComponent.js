import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileMenu from './User/UserProfileMenu';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import Cookiefactory from '../../../lib/cookiefactory';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment'



const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Bu alan boş bırakılamaz '),
    newPassword: Yup.string().required('Bu alan boş bırakılamaz').min(6, "Şifreniz 6 karakterden uzun olmalı, harf ve rakam içermelidir."),
    newPassword2: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Şifreler aynı olmalıdır.')
});
const validationSchemaUser = Yup.object().shape({
    name: Yup.string().required('Bu alan boş bırakılamaz '),
    surname: Yup.string().required('Bu alan boş bırakılamaz'),
    phone: Yup.string().required('Bu alan boş bırakılamaz'),
    email: Yup.string().required('Bu alan boş bırakılamaz')
});

export default function MyUserInfoComponent() {
    const dictionary = useSelector(getDictionary);
    const req = null; const res = null;
    const [PasswordErr, setPasswordErr] = useState("");
    const [InfoErr, setInfoErr] = useState("");
    const [cUser, setUser] = useState({});

    const cookiefactory = new Cookiefactory();
    const headerData = cookiefactory.GetCookies(req, res);
    const token = cookiefactory.GetToken(req, res);
    if (!!token) {
        headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);
    }

    function GetUserInfo() {
        var requestOptions = {
            method: 'GET',
            headers: headerData,
            redirect: 'follow'
        };
        fetch("https://gw.antremeta.com/user/getuserinfo", requestOptions)
            .then(response => response.json())
            .then(result => { console.log(result.data); setUser(result.data) })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        GetUserInfo();
    }, []);













    const data = new FormData();

    const handleSubmit = async values => {
        Object.keys(values).forEach(key => {
            data.append(key, values[key])
        })
        data.append("pass", values.currentPassword)
        var requestOptions = {
            method: 'POST',
            headers: headerData,
            body: data,
            redirect: 'follow'
        };

        fetch("https://gw.antremeta.com/user/changepassword", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result != "") {
                    var status = JSON.parse(result);
                    if (!status.status) {
                        setPasswordErr(status.errors);
                    }
                }
                else {
                    setPasswordErr("");
                    alert("Şifre Başarıyla Güncellendi.");
                }

            })
            .catch(error => console.log('error', error));
    }

    const handleUserSubmit = (e) => {
        e.preventDefault();
        var raw = JSON.stringify(cUser)
        var requestOptions = {
            method: 'POST',
            headers: headerData,
            body: raw,
            redirect: 'follow'
        };

        console.log();

        fetch("https://gw.antremeta.com/user/update", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }




    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            newPassword2: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => handleSubmit(values),
    });

    const formikUser = useFormik({
        initialValues: {
            name: '',
            surname: '',
            phone: '',
            email: ''
        },
        validationSchema: validationSchemaUser,
        onSubmit: values => handleUserSubmit(values),
    });




    const handleUserInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...cUser, [name]: value });
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
                                    <div className="px col-12 Title">{dictionary["Web.UI.UserInfoTitle"] == undefined ? "Web.UI.UserInfoTitle" : dictionary["Web.UI.UserInfoTitle"]}</div>
                                    <div className="fl col-12 Content">
                                        <div className='px py col-6 col-sm-12' id='AccountInfo'>
                                            <form action='' className='fl col-12 InfoInner' onSubmit={handleUserSubmit}>
                                                <div className='fl col-12 miniTitle'>{dictionary["Web.UI.UserInfoMiniTitle"]}</div>

                                                {InfoErr != "" && <div className="fl col-12 loginError">{InfoErr}</div>}

                                                <div className='fl py col-12 form-group'>
                                                    <input type={"text"} name={'name'} value={cUser.name} onChange={handleUserInput} placeholder={dictionary["Web.UI.UserInfoName"]}></input>
                                                    {formikUser.errors.name ? <div className="formik-Error">{formikUser.errors.name}</div> : null}
                                                </div>
                                                <div className='fl py col-12 form-group'>
                                                    <input type={"text"} name={'surname'} value={cUser.surname} onChange={handleUserInput} placeholder={dictionary["Web.UI.UserInfoSurname"]}></input>
                                                    {formikUser.errors.surname ? <div className="formik-Error">{formikUser.errors.surname}</div> : null}
                                                </div>
                                                <div className='fl py col-12 form-group'>
                                                    <input type={"text"} name={'email'} value={cUser.email} onChange={handleUserInput} placeholder={dictionary["Web.UI.UserInfoMail"]}></input>
                                                    {formikUser.errors.email ? <div className="formik-Error">{formikUser.errors.email}</div> : null}
                                                </div>
                                                <div className='fl py col-12 form-group'>
                                                    <input type={"text"} name={'phone'} value={cUser?.phone} onChange={handleUserInput} placeholder={dictionary["Web.UI.UserInfoPhone"] == undefined ? "Web.UI.UserInfoPhone" : dictionary["Web.UI.UserInfoPhone"]}></input>
                                                    {formikUser.errors.phone ? <div className="formik-Error">{formikUser.errors.phone}</div> : null}
                                                </div>
                                                <div className='fl py col-12 form-group'>
                                                    <input type={"date"} name={'birthdate'} value={cUser.birthdate == null ? moment().format('YYYY-MM-DD') : cUser.birthdate} onChange={handleUserInput} placeholder={dictionary["Web.UI.UserInfoBirthdate"] == undefined ? "Web.UI.UserInfoBirthdate" : dictionary["Web.UI.UserInfoBirthdate"]}></input>
                                                </div>
                                                <div className='fl py col-12 multi-select-group'>
                                                    <ul className='fl col-12'>
                                                        <li data-value={1}>Erkek</li>
                                                        <li data-value={2}>Kadın</li>
                                                    </ul>
                                                </div>

                                                <div className='fl py col-12 form-group'>
                                                    <input type={"submit"} className="btn btn-primary" value={dictionary["Web.UI.UserInfoUpdateButton"] == undefined ? "Web.UI.UserInfoUpdateButton" : dictionary["Web.UI.UserInfoUpdateButton"]}></input>
                                                </div>
                                            </form>
                                        </div>
                                        <div className='px py col-6 col-sm-12' id='PasswordInfo'>
                                            <form action='' className='fl col-12 InfoInner' onSubmit={formik.handleSubmit}>

                                                <div className='fl col-12 miniTitle'>{dictionary["Web.UI.UserInfoPasswordUpdate"]}</div>

                                                {PasswordErr != "" && <div className="fl col-12 loginError">{PasswordErr}</div>}


                                                <div className='fl py col-12 form-group'>
                                                    <input type={"password"} name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} placeholder={dictionary["Web.UI.UserInfoNowPassword"]}></input>
                                                    {formik.errors.currentPassword ? <div className="formik-Error">{formik.errors.currentPassword}</div> : null}
                                                </div>
                                                <div className='fl py col-12 form-group'>
                                                    <input type={"password"} name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} placeholder={dictionary["Web.UI.UserInfoNewPassword"]}></input>
                                                    {formik.errors.newPassword ? <div className="formik-Error">{formik.errors.newPassword}</div> : null}
                                                </div>
                                                <div className='fl py col-12 form-group'>
                                                    <input type={"password"} name="newPassword2" value={formik.values.newPassword2} onChange={formik.handleChange} placeholder={dictionary["Web.UI.UserInfoNewPassword2"] != null ? dictionary["Web.UI.UserInfoNewPassword2"] : "Web.UI.UserInfoNewPassword2"}></input>
                                                    {formik.errors.newPassword2 ? <div className="formik-Error">{formik.errors.newPassword2}</div> : null}
                                                </div>



                                                <div className='fl col-12 form-group'>
                                                    <input type={"submit"} className="btn btn-primary" value={dictionary["Web.UI.PasswordUpdateButton"] == undefined ? "Web.UI.PasswordUpdateButton" : dictionary["Web.UI.PasswordUpdateButton"]}></input>
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