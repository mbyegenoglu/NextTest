import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cookiefactory from '../../../lib/cookiefactory';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import UserProfileMenu from './User/UserProfileMenu';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';

import {AiOutlineDelete} from "react-icons/ai";



export default function MyAddressComponent() {

    const req = null; const res = null;
    const dictionary = useSelector(getDictionary);
    const [AddressList, setAddressList] = useState([]);
    const [currentAddress, setCurrentAddres] = useState({
        
            id: "1af6dc5e-7beb-4d3c-bc94-410bed69923f",
            addressName : "",
            name: "",
            surname: "",
            email: "",
            country: "",
            countryId: null,
            city: "",
            cityId: null,
            county: "",
            countyId: null,
            district: null,
            address: "",
            identityNr: "11111111111",
            taxNr: "11111111111",
            taxOffice: null,
            zipCode: null,
            postalCode: null,
            phone: ""
        
        });

    var myHeaders = new Headers();
    const cookiefactory = new Cookiefactory();
    const headerData = cookiefactory.GetCookies(req, res);
    const token = cookiefactory.GetToken(req, res);
    if (!!token) {
        headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);
    }
    const requestGetAllOptions = {
        method: 'GET',
        headers: headerData
    };
    var requestDeleteOptions = {
        method: 'GET',
        headers: headerData
    };
      
    function DeleteAddress(id){
        fetch("https://gw.antremeta.com/CustomerAddress/Delete/" +id , requestDeleteOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            GetAllAddress();
        })
        .catch(error => console.log('error', error));
    }

    function GetAllAddress(){
        fetch("https://gw.antremeta.com/CustomerAddress", requestGetAllOptions)
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
        setCurrentAddres({ ...currentAddress, [name]:value});
        console.log(currentAddress);
    }

    function AddOrUpdateAddress(){
        if(modalType == "Add"){

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
        else if(modalType == "Update") {
            var raw = JSON.stringify(currentAddress);

            headerData["Content-Type"] = "application/json";

            var requestOptions = {
                method: 'POST',
                headers: headerData,
                body: raw,
                redirect: 'follow'
            };

            
            fetch("https://gw.antremeta.com/CustomerAddress/Update/"+currentAddress.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                GetAllAddress();
                setIsOpen(false);
            })
            .catch(error => console.log('error', error));
            
        }


        
    }


    useEffect(() => {
        GetAllAddress();
    }, []);



    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalType, setmodalType] = React.useState();


    function toggleModal(m,myObject) {
        if(modalIsOpen === true){
            setIsOpen(false);
        }
        else{
            setIsOpen(true);
        }    
        if(m == "Add"){
            setmodalType("Add");

        }
        if(m == "Update"){
            setmodalType("Update");
            setCurrentAddres(myObject);  
        }
    }



    return (
        <div className="px py col-12" id="userDetail">
            <div className="row">
                <div className="container">
                    <div id="userContent" className="fl col-12">
                        <div className="row">
                            <UserProfileMenu></UserProfileMenu>
                            <div className='px py col-10 col-sm-12'>
                                <div className="fl col-12" id="UserMiddleBar">
                                    <div className="fl col-12 Title">{dictionary["Web.UI.UserAddressTitle"]} <button id="addNewAddress" onClick={() => toggleModal("Add")}>{dictionary["Web.UI.UserAddressAdd"]}</button></div>
                                    <div className="fl col-12 Content">

                                        <div className="px py col-12" id="AddressList">

                                        
                                        {AddressList.map(aItem => 
                                        {return  <div className="px py col-4 col-sm-12" key={aItem.id}>
                                                <div className="fl col-12 AddressItem">
                                                    <div className="fl col-12 AddressItemTitle">{aItem.addressName}</div>
                                                    <div className="fl col-12 AddressItemContent">
                                                        <div className="fl col-12 Name">{aItem.name} {aItem.surname}</div>
                                                        <div className='fl col-12 Description'>
                                                            {aItem.address}
                                                        </div>
                                                        <div className="fl col-12 Description">
                                                            {aItem.country}/{aItem.city}/{aItem.district}
                                                        </div>
                                                        <div className="fl col-12 Phone">{aItem.Phone}</div>
                                                    </div>
                                                    <div className="fl col-12 AddressItemButtons">
                                                        <button id="deleteAddress" onClick={() => DeleteAddress(aItem.id)} ><AiOutlineDelete></AiOutlineDelete> {dictionary["Web.UI.UserAddressDelete"]}</button>
                                                        <button id="updateAddress"  onClick={() => toggleModal("Update",aItem)}>{dictionary["Web.UI.UserAddressEdit"]}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        })}

                                            

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                ariaHideApp={false}
                contentLabel="AddressModal"
                className="Modal"
                overlayClassName="modalOverlay">
                    <div className='modalTitle'> Ekleme ya da Güncelleme <button onClick={toggleModal}><GrClose /></button></div>
                    <div className='modalBody'>
                        <div className='fl col-12 form-group'>
                            <input type="text" name="addressName" onChange={handleInput} value={currentAddress.addressName} placeholder="Adres Başlığı"></input>
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
                            <input type="text" name="country" onChange={handleInput} value={currentAddress.country} placeholder="Ülke"></input>
                        </div>
                        <div className='fl col-4 form-group'>
                            <input type="text" name="city" onChange={handleInput} value={currentAddress.city} placeholder="İl"></input>
                        </div>
                        <div className='fl col-4 form-group'>
                            <input type="text" name="district" onChange={handleInput} value={currentAddress.district} placeholder="İlçe"></input>
                        </div>
                        <div className='fl col-12 form-group'>
                            <textarea type="text" name="address" onChange={handleInput} value={currentAddress.address} placeholder="Adres" rows={6}></textarea>
                        </div>

                        

                        


                    </div>
                    <div className='modalFooter'>
                        <button className='btn btn-sec' onClick={toggleModal}> Vazgeç </button>
                        <button className='btn btn-pri' onClick={AddOrUpdateAddress} > Ekle </button>
                    </div>
                </Modal>
        </div>







    )
}
