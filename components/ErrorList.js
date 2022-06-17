import dynamic from 'next/dynamic'
import React from 'react';
const Error = dynamic(() => import('./Error'));


export default function ErrorList({ errors }) {
    const [activeError, setActiveError] = React.useState(0);
    const item = errors[activeError];

    return (
        <Error message={item?.messageError} key={activeError} setActiveError={setActiveError} activeError={activeError} activeErrorCount={errors.length}>
            {item?.name && <b>{item.name}</b>} {item.message}
        </Error>
    )
};

