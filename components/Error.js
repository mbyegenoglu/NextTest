import style from '../styles/ErrorList.module.css'
import React, { useState, useEffect } from 'react'

export default function Error({ message, children, activeError, setActiveError, activeErrorCount }) {
    const [mounted, setMounted] = useState(false);
    const descrease = () => {
        if (activeError > 0)
            setActiveError(--activeError)
    };

    const increase = () => {
        if ((activeError + 1) < activeErrorCount)
            setActiveError(++activeError)
    }
    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <div className={style.errorBoxParent}>
            <div className={style.errorBox}>
                {children}

                {message && (
                    <small className="d-block">
                        <b>Error Message</b>
                        <small className="d-block">
                            {message}
                        </small>
                    </small>
                )}

                {mounted  && activeErrorCount > 1 && (
                    <div className={style.navigation}>
                        <i className={`fas fa-angle-left  ${activeError == 0 ? style.disabledNav : ''}`} disabled={activeError == 0 ? true : false} onClick={() => descrease()} ></i>
                        <i className={`fas fa-angle-right  ${(activeError + 1) == activeErrorCount ? style.disabledNav : ''}`} disabled={(activeError + 1) == activeErrorCount ? true : false} onClick={() => increase()}></i>
                    </div>
                )}
            </div>
        </div>
    )
};
