import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';

import Dictionary from '../../../../lib/dictionary';

import {BiChevronDown} from "react-icons/bi";
import {AiOutlineCheck} from "react-icons/ai";
export default function Filter({items, filterValues, setFilterValues}) {

    const [filters, setFilters] = useState(items.map(e => {
        e.isOpened = false;
        return e;
    }));
    
    function ToggleFilter(e){
        let ec = Object.assign({}, e);
        ec.isOpened = !ec.isOpened;
        let f = [...filters];
        f.splice(f.indexOf(e), 1, ec);
        setFilters(f);
    }

    function AddFilter(m){
        let filterIndex = filterValues.indexOf(m);
        if (filterIndex >= 0) {
            const rfilter = filterValues.filter(e => e != m);
            setFilterValues(rfilter);
        } else {
            setFilterValues(e => [...e, m]);
        }
        
    }

    const setFilterWrap=()=>{
        $("#Filter").removeClass("active");
    }

    const dictionary = useSelector(getDictionary);

  return (
    <div className="px py col-2 col-md-12" id="leftSide">
        <div id="Filter" className="fl col-12">

            {filters?.map((Filter, i) =>
            {
                return <div className={"fl col-12 filterWrap"} key={Filter.refId}>
                    <div className={"fl col-12 FilterTitle " + (Filter.isOpened ? 'active' : 'passive')} onClick={(e) => ToggleFilter(Filter)}>
                        
                        {Filter.name} 
                        <BiChevronDown></BiChevronDown>
                    </div>
                    <div className="fl col-12 filterWrapper">
                        <ul className="fl col-12 filterItemList">
                            {Filter.propertyValues?.map(FilterSub => 
                            {   
                                if (Filter.name == "Renk") {
                                    return <li 
                                                key={FilterSub.refId} 
                                                onClick={(m) => AddFilter(FilterSub.refId)} 
                                                className="square" 
                                                data-filterid={FilterSub.refId} 
                                                data-filter={FilterSub.slug}>
                                                    
                                        <div className={"chcbox " + (filterValues.indexOf(FilterSub.refId) >= 0 ? 'checked' : 'passive')}></div>
                                        <div className={"fl col-12 filterItemName M" + FilterSub.refId}><span>{FilterSub.name}</span></div>
                                    </li>
                                } else {
                                    return <li 
                                                key={FilterSub.refId} 
                                                onClick={(m) => AddFilter(FilterSub.refId)} 
                                                className="fl col-12" 
                                                data-filterid={FilterSub.refId} 
                                                data-filter={FilterSub.slug}>                                              
                                        <div className={"chcbox " + (filterValues.indexOf(FilterSub.refId) >= 0 ? 'checked' : 'passive')}></div>
                                        <div className={"fl col-12 filterItemName"}><span>{FilterSub.name}</span></div>
                                    </li>
                                }
                                
                            })}
                        </ul>
                    </div>
                </div>
                           
            })}


            <div className='fl col-12 filterWrap'>
                <div className='fl col-12 FilterTitle'>{dictionary["Web.UI.FilterPriceRange"]}</div>
                <div className='fl col-12 filterWrapper priceSection'>
                    <div className='px py col-6'>
                        <input placeholder={dictionary["Web.UI.PriceFilterMin"]} type={"text"} name="minPrice"></input>
                    </div>
                    <div className='px py col-6'>
                        <input placeholder={dictionary["Web.UI.PriceFilterMax"]} type={"text"} name="maxPrice"></input>
                    </div>
                    <button id='applyPriceFilter'>
                        <AiOutlineCheck></AiOutlineCheck>
                    </button>
                </div>
            </div>
        </div>
        <div id='FilterOverlay' className='fl col-12' onClick={setFilterWrap}></div>
    </div>



  )
}