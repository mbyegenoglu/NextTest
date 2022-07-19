import React from 'react'
import $ from 'jquery';
import Slider from "react-slick";
import Link from 'next/link';
import Image from 'next/dist/client/image';


export default function ListSubCat({Stories}) {

  const CurrentDesing = "ProductListNewWidget";
  const OlDesgin = "ProductListWidget";

  var DefaultImage = 'https://cdn.dsmcdn.com/ty334/product/media/images/20220216/19/51267524/300211344/2/2_org_zoom.jpg';



  return (
    <div className="fl col-12" id={CurrentDesing}>
      <div className='fl col-12' id='CatalogSubCategories'>
        {Stories.map((s, index) => {
              return  <Link href={"/" + s.url} key={index}>
                <a className="Item" >
                    <Image 
                    height={150} 
                    width={100} 
                    src={s.image == null ? s.image:DefaultImage} 
                    alt={s.name}> 
                    </Image>
                    <span>{s.name}</span>
                </a>
              </Link>
        })}
      </div>
    </div>
  )
}



