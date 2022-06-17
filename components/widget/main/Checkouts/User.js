import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../redux/slices/userSlice';
import Link from 'next/dist/client/link';

export default function User() {

    let user = useSelector(getUser);
 
    
    if (user?.eMail != undefined) {
        return (
            <div className="fl col-6 SCheckUser">
                <div className="fl col-12 UserName">{user?.name}</div>
                <div className="fl col-12 UserMail">{user?.eMail}</div>
            </div>
        )
    } else {

        return (
            <div className="fl col-6 CheckUser">
                <Link href="/Login" >
                    <a className="fl col-12 UserName">Giriş Yap</a>
                </Link>
                <Link href="/Register" >
                    <a className="fl col-12 UserMail">Kayıt Ol</a>
                </Link>    
            </div>
        )

    }
}