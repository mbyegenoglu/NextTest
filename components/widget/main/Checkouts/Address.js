import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Cookiefactory from '../../../../lib/cookiefactory';
import { useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import Dictionary from '../../../../lib/dictionary';
import Link from 'next/link';
import LoginInner from '../Login/LoginInner';
import SocialInner from '../Login/SocialInner';
import RegisterInner from '../Login/RegisterInner';

function Address(props) {
    const [UserAddress, setAddress] = useState(props.a);
    const [AddressList, setAddressList] = useState([]);
    function ChangeAddress(e) {
        props.changeAddress(e.currentTarget.dataset.id);
        setAddress(UserAddress);
    }

    const req = null; const res = null;
    const dictionary = useSelector(getDictionary);
    const [currentAddress, setCurrentAddres] = useState({
        id: "1af6dc5e-7beb-4d3c-bc94-410bed69923f",
        addressName: "",
        name: "",
        surname: "",
        email: "",
        country: "",
        countryId: 0,
        city: "",
        cityId: 0,
        county: "",
        countyId: 0,
        district: 0,
        address: "",
        identityNr: "11111111111",
        taxNr: "11111111111",
        taxOffice: 0,
        zipCode: 0,
        postalCode: 0,
        phone: ""

    });

    var myHeaders = new Headers();
    const cookiefactory = new Cookiefactory();
    const headerData = cookiefactory.GetCookies(req, res);
    const token = cookiefactory.GetToken(req, res);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalType, setmodalType] = React.useState();
    const [regLogmodalIsOpen, setRegLogIsOpen] = React.useState(false);

    if (!!token) {
        headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);

    }
    const requestOptions = {
        method: 'GET',
        headers: headerData
    };

    function DeleteAddress(id) {
        fetch("https://gw.antremeta.com/CustomerAddress/Delete/" + id, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                GetAllAddress();
            })
            .catch(error => console.log('error', error));
    }
    function GetAllAddress() {
        fetch("https://gw.antremeta.com/CustomerAddress", requestOptions)
            .then(response => response.json())
            .then(data => {
                setAddressList(data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentAddres({ ...currentAddress, [name]: value });
        console.log(currentAddress);
    }

    function AddOrUpdateAddress() {
        if (modalType == "Add") {

            var raw = JSON.stringify(currentAddress);

            headerData["Content-Type"] = "application/json";

            var requestOptions = {
                method: 'POST',
                headers: headerData,
                body: raw,
                redirect: 'follow'
            };


            fetch("https://gw.antremeta.com/CustomerAddress", requestOptions)
                .then(response => response.text())
                .then(result => {
                    GetAllAddress();
                    setIsOpen(false);
                })
                .catch(error => console.log('error', error));

        }
        else if (modalType == "Update") {
            var raw = JSON.stringify(currentAddress);
            headerData["Content-Type"] = "application/json";
            var requestOptions = {method: 'POST',headers: headerData,body: raw,redirect: 'follow'};


            fetch("https://gw.antremeta.com/CustomerAddress/Update/" + currentAddress.id, requestOptions)
                .then(response => response.text())
                .then(result => { GetAllAddress(); setIsOpen(false); })
                .catch(error => console.log('error', error));

        }

    }
    useEffect(() => {
        if (token != undefined) {
            GetAllAddress();
        }
        else {
            setRegLogIsOpen(true);
        }
    }, []);

    const nextStepMan = () => {
        if (props.checkoutinfo.currentAddress != "") {
            props.checkOutForm.current.submit()
        }
        else {
            alert("Adres Se??iniz");
        }
    }

    function toggleModal(m, myObject) {
        if (modalIsOpen === true) {
            setIsOpen(false);
        }
        else {
            setIsOpen(true);
        }
        if (m == "Add") {
            setmodalType("Add");
        }
        if (m == "Update") {
            setmodalType("Update");
            setCurrentAddres(myObject);
        }
    }


    const [authType, setAuthType] = useState(true);
    const changeType = () => {
      if (authType) {
        setAuthType(false);
      } else {
        setAuthType(true);
      }
    }



    return (
        <>
            <div className={"fl col-12 SectionItem" + (props.checkoutinfo.step == 1 ? " active" : "")} id="CheckAddress">
                <div className="fl col-12 SectionItemTitle">
                    <div className="No">1</div>
                    {dictionary["Web.UI.CheckoutAddressTitle"]}
                </div>
                <div className="fl col-12 SectionItemContent">
                    <div className="fl col-12 SectionItemContentTitle">{dictionary["Web.UI.CheckoutDevliveryAddressTitle"]} <button onClick={() => toggleModal("Add")}>Yeni Adres Ekle</button></div>
                    <div className="fl col-12 SectionItemContentInner">
                        {AddressList?.map(address => {
                            if (props.checkoutinfo.currentAddress == address.id) {
                                return <div key={address.id} className="fl col-12 AddressItem active" data-id={address.id} onClick={(e) => ChangeAddress(e)}>
                                    <div className="fl col-12 AddresType">{address.addressName} <button onClick={() => toggleModal("Update", address)}>{dictionary["Web.UI.CheckoutAddressModalEdit"]}</button></div>
                                    <div className="fl col-12 AddresDescription">
                                        {address.country}, {address.city}, {address.district}, {address.address}
                                    </div>
                                    <div className="fl col-12 Phone">{address.phone}</div>
                                </div>
                            } else {
                                return <div key={address.id} className="fl col-12 AddressItem" data-id={address.id} onClick={(e) => ChangeAddress(e)}>
                                    <div className="fl col-12 AddresType">{address.addressName} <button onClick={() => toggleModal("Update", address)}>{dictionary["Web.UI.CheckoutAddressModalEdit"]}</button></div>
                                    <div className="fl col-12 AddresDescription">
                                        {address.country}, {address.city}, {address.district}, {address.address}
                                    </div>
                                    <div className="fl col-12 Phone">{address.phone}</div>
                                </div>
                            }
                        }
                        )}
                    </div>
                    <div className="fl col-12 SectionItemApply" onClick={() => nextStepMan("Goal!")}>{dictionary["Web.UI.CheckoutGoCargoStep"]}</div>
                </div>
            </div>


            <Modal isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                ariaHideApp={false}
                contentLabel="AddressModal"
                className="Modal"
                overlayClassName="modalOverlay">
                <div className='modalTitle'> Ekleme ya da G??ncelleme <button onClick={toggleModal}><GrClose /></button></div>
                <div className='modalBody'>
                    <div className='fl col-12 form-group'>
                        <input type="text" name="addressName" onChange={handleInput} value={currentAddress.addressName} placeholder="Adres Ba??l??????"></input>
                    </div>
                    <div className='fl col-6 form-group'>
                        <input type="text" name="name" onChange={handleInput} value={currentAddress.name} placeholder="Ad"></input>
                    </div>

                    <div className='fl col-6 form-group'>
                        <input type="text" name="surname" onChange={handleInput} value={currentAddress.surname} placeholder="Soyad"></input>
                    </div>
                    <div className='fl col-12 form-group'>
                        <input type="text" name="email" onChange={handleInput} value={currentAddress.email} placeholder="E-Posta"></input>
                    </div>
                    <div className='fl col-6 form-group'>
                        <input type="text" name="postalCode" onChange={handleInput} value={currentAddress.postalCode} placeholder="Posta Kodu"></input>
                    </div>
                    <div className='fl col-6 form-group'>
                        <input type="text" name="phone" onChange={handleInput} value={currentAddress.phone} placeholder="Posta Kodu"></input>
                    </div>
                    <div className='fl col-4 form-group'>
                        <input type="text" name="country" onChange={handleInput} value={currentAddress.country} placeholder="??lke"></input>
                    </div>
                    <div className='fl col-4 form-group'>
                        <input type="text" name="city" onChange={handleInput} value={currentAddress.city} placeholder="??l"></input>
                    </div>
                    <div className='fl col-4 form-group'>
                        <input type="text" name="district" onChange={handleInput} value={currentAddress.district} placeholder="??l??e"></input>
                    </div>
                    <div className='fl col-12 form-group'>
                        <textarea type="text" name="address" onChange={handleInput} value={currentAddress.address} placeholder="Adres" rows={6}></textarea>
                    </div>






                </div>
                <div className='modalFooter'>
                    <button className='btn btn-sec' onClick={toggleModal}> Vazge?? </button>
                    <button className='btn btn-pri' onClick={AddOrUpdateAddress} > Ekle </button>
                </div>
            </Modal>


            <Modal isOpen={regLogmodalIsOpen}
                ariaHideApp={false}
                contentLabel="RegLogModal"
                className="Modal"
                overlayClassName="modalOverlay">
                <div className='modalBody'>
                    <div className='ContinuePayment'>
                        <h3>@Web.UI.ContinuePaymentTitle</h3>
                        <p>@Web.UI.ContinuePaymentDescription</p>
                        <div className='fl col-12 NewLoginPage'>
                            <div className='NewLoginPageInner'>
                                <div className='fl col-12 NormalLogin'>
                                    <ul className='fl col-12'>
                                        <li className={authType ? "active" : "passive"} onClick={changeType}>Giri?? Yap</li>
                                        <li className={authType ? "passive" : "active"} onClick={changeType}>??ye Ol</li>
                                    </ul>
                                    <LoginInner authType={authType} pageType={"Checkout"}></LoginInner>
                                    <RegisterInner authType={authType} pageType={"Checkout"}></RegisterInner>

                                    <div className='divider'>
                                        <span>@Web.UI.Or</span>
                                    </div>
                                    <button className='NoLoginNoRegister' onClick={() => NoLoginNoRegister()}>
                                        @Web.UI.NoLoginNoRegister
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>





        </>
    )


}


export default Address