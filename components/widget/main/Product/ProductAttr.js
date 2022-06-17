import React, { Component,  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import Dictionary from '../../../../lib/dictionary';



export default function ProductAttr(props) {

  const AttrList = props.Attr.variants[0].properties;
  const dictionary = useSelector(getDictionary);

  return (
    <div id="productAttr" className="fl col-12">
          <div className="fl col-12 Title">{dictionary["Web.UI.ProductDetailApperance"]}</div>
          <div className="fl col-12 Content">
          {AttrList?.filter(p => p.isUseVariant == false).map(paItem =>{
            return  <div key={paItem.value+"-"+paItem.refId} data-id={paItem.value+"-"+paItem.refId} className="fl col-6 col-sm-12 productAttrItem">
                        <span>{paItem.name}</span>
                        <b> {paItem.value}</b>
                </div>   
            })}

          </div>
      </div>        
  )
}
