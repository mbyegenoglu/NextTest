import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getDictionary } from '../../../redux/slices/dictionarySlice';
import { getMenu } from '../../../redux/slices/menuSlice';
import { getParam } from '../../../redux/slices/paramSlice';
import Link from 'next/link';
import Image from 'next/dist/client/image';

import Dictionary from '../../../lib/dictionary';

export default function Footer() {


    const dictionary = useSelector(getDictionary);
    const param = new Dictionary(useSelector(getParam));
    const menus = useSelector(getMenu);
    const Banks = [];

    return (
        <footer>
            <div className="px py col-12" id="Top">
                <div className="container">
                    <div className="row">
                        {menus[2]?.map((linksItem, i) => {
                            return <div className="px py col-3 col-md-6" key={i}>
                                <h3 className="fl col-12">{linksItem.label}</h3>
                                <ul className="fl col-12">
                                    {linksItem.submenus?.map((linkItem, m) => { return <li key={m} className="fl col-12"><a href={linkItem.seoUrl} className="fl col-12">{linkItem.label}</a></li> })}
                                </ul>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div className="px py col-12" id="Middle">
                <div className="container">
                    <div className="row">
                        <div className="px py col-4 col-md-12" id="Brand">
                            <div className="fl col-12 Logo">
                                <Image
                                    src={'https://img1ptrti.mncdn.com/content/images/thumbs/626cd59d0d79cd803ce43b67.png'}
                                    alt={dictionary["Web.UI.Footer.LogoTitle"]}
                                    height={60} width={200}>
                                        
                                    </Image>

                            </div>
                            <div className="fl col-12 Desc">{dictionary["Web.UI.Footer.Description"]}</div>
                            <ul className="fl col-12">

                            </ul>
                        </div>
                        <div className="px py col-4 col-md-12" id="MobileApp">
                            <ul className="fl col-12">
                                <li className="px py">
                                    <Link  href={'param["MobileAppAndroidUrl"]'}>
                                        <a className="fl col-12">
                                            <Image layout="responsive"
                                                src={"https://img1ptrti.mncdn.com/content/images/thumbs/626cd59d0d79cd803ce43b67.png"}
                                                alt={"Logo"}
                                                height={60} width={200}
                                            >
                                            </Image>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="px py col-4 col-md-12" id="Bank">
                            <div className="fl col-12 payment-icons">
                                {Banks?.map(bankItem => { return <Image layout="responsive" src={bankItem.Image} alt={bankItem.Title} key={bankItem.Id} className="payment-icon"></Image> })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px py col-12" id="Bottom">
                <div className="container">
                    <div className="row">
                        <div className="px py col-12" id="Copyright">
                            {dictionary["Web.UI.Copyright"]}
                        </div>
                    </div>
                </div>
            </div>
            <div className='px py col-12' id="Provider">
                <Image height={60} width={200} src={'https://img1ptrti.mncdn.com/content/images/thumbs/626cd59d0d79cd803ce43b67.png'} alt={"Antremeta"} className="payment-icon"></Image>
            </div>
        </footer>
    )

}
