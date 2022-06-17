import React, { useEffect, useState } from 'react';


function Cargo({cargoList, changeCargo, checkoutinfo, checkOutForm}) {




    const nextStepMan = () => {
        if(checkoutinfo.currentCargo != ""){
            checkOutForm.current.submit() 
        }
        else{
            alert("Kargo Seçiniz");
        }
    }




    return (
        <div className={"fl col-12 SectionItem" + (checkoutinfo.step == 2 ? " active" : "")} id="CheckCargo">
            <div className="fl col-12 SectionItemTitle">
                <div className="No">2</div>
                Kargo
            </div>
            <div className="fl col-12 SectionItemContent">
                <div className="fl col-12 SectionItemContentInner">
                    
                    {cargoList?.map(cargo => 
                        <div className={"fl col-12 CargoItem " + (cargo.id == checkoutinfo.currentCargo ? "active" : "")} key={cargo.id}  data-id={cargo.id} onClick={(e) => changeCargo(cargo.id,cargo.price)}>
                            <span>{cargo.name}</span> 
                            <b>{cargo.price} {cargo.moneySymbol}</b>
                        </div>
                    )}
                </div>
                <div className="fl col-12 SectionItemApply" onClick={() => nextStepMan()}>Ödeme ile Devam Et</div>
            </div>
        </div>
    );

    

}


export default Cargo


