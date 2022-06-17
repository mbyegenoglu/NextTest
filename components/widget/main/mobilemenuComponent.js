import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Link from 'next/link';
import Image from 'next/dist/client/image';


import {AiOutlineArrowRight,AiOutlineSwapLeft} from "react-icons/ai";

export default function MobilemenuComponent({menu}) {

  function ChangeMenu(e){
    if($("#T"+e).hasClass("active")){
      $("#T"+e).removeClass("active");
    }
    else{
      $("#T"+e).addClass("active");
    }
    
  }

  return (
    <div className={"mobileMenu hidden"}>
        <div className='mobileMenuInner'>

        <div className="fl col-12 TabSection">
                <ul className="fl col-12 TabSectionMain">
                  {menu?.map((linkItem,index) => {
                    return <li key={index}><a className="mainItem" onClick={(e) => ChangeMenu(index)}><span>{linkItem.label}</span></a></li>
                  })}              
                </ul>
                
                {menu?.map((linkItem,index) => {
                  return <div id={'T' + index} className="fl col-12 mainItemWrap" key={index}>
                  <div className="fl col-12 mainItemWrapTitle">
                      <span onClick={(e) => ChangeMenu(index)}><AiOutlineSwapLeft></AiOutlineSwapLeft></span>
                      <div>{linkItem.label}</div>
                  </div>
                  <div className="px py col-12 mainItemWrapContent">
                      <ul className="fl col-12 Catalog">
                      {linkItem.submenus?.map((sItem,index) => {
                         return <li className="fl col-12" key={index}>
                          <a href={sItem.seoUrl} className="fl col-12 subItem">
                              <Image height={70} width={70}  src="https://img-kotontr.mncdn.com/images/2020/aralik/ole-mobil-thumb-cat-050121.jpg" alt={sItem.label}></Image>
                              <span>{sItem.label}</span>
                              <AiOutlineArrowRight></AiOutlineArrowRight>
                          </a>
                      </li>
                      })}
                          
                          
                      </ul>
                  </div>
              </div>
                })}
                

            </div>

        </div>
        <div className='mobileMenuOverlay'></div>
    </div>
  )
}
