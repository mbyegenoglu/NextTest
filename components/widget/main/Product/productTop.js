import { useSelector } from 'react-redux'
import { React, useState, useEffect } from 'react'
import { BsGrid3X3Gap } from 'react-icons/bs';
import { IoGridOutline } from 'react-icons/io5';
import { BiSquare } from 'react-icons/bi';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';
import { getList } from '../../../../redux/slices/listSlice'
import $ from 'jquery';
import Dictionary from '../../../../lib/dictionary';

export default function ProductTop({ title, type}) {

    const lists = useSelector(getList);
    const dictionary = useSelector(getDictionary);

    const setFilterWrap = () => {
        $("#Filter").addClass("active");
    }
    const [getGridValue, setGridValue] = useState("F");
    const setGrid = () => {
        if (getGridValue == "T") {
            setGridValue("F");
            $(".productItem").addClass("col-2-5").removeClass("col-4");
            $(".productItem").addClass("col-md-6").removeClass("col-md-12");
        }
        else {
            setGridValue("T");
            $(".productItem").addClass("col-4").removeClass("col-2-5");
            $(".productItem").addClass("col-md-12").removeClass("col-md-6");
        }
    }

    if (typeof window !== 'undefined') {
        var lastScrollTop = 0;
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                $("#ProductListTop").removeClass("sticky");
            } else {
                $("#ProductListTop").addClass("sticky");
            }
            if (st == 0) {
                $("#ProductListTop").removeClass("sticky");
            }
            lastScrollTop = st;
        });
      }

    
    function TopRight(){
        if(type == true){
            return <>
                <select name="sortList" id="sort">i
                        {lists.filter(m => m.group == 2).map(e =>
                            <option value={e.key} key={e.key}>{e.title}</option>
                        )}
                </select>
                <div className={'mobile gridSystem ' + getGridValue} onClick={setGrid}>
                    <button className='gridButton F'>
                        <BiSquare></BiSquare>
                    </button>
    
                    <button className='gridButton T'>
                        <IoGridOutline></IoGridOutline>
                    </button>
                </div>
                <div className={'desktop gridSystem ' + getGridValue} onClick={setGrid}>
                    <button className='gridButton F'>
                        <BsGrid3X3Gap></BsGrid3X3Gap>
                    </button>
    
                    <button className='gridButton T'>
                        <IoGridOutline></IoGridOutline>
                    </button>
                </div>
            </>
        }
        else{
            return <></>
        }
    }
    


    return (
        
        <div className="px py col-12" id="ProductListTop">
            <div className="fl col-12 Content">
                <h1>{title}</h1>
                <button className='filterMobileBtn' onClick={setFilterWrap}>@Web.UI.FiterButton</button>
                <TopRight></TopRight>
            </div>
        </div>
    )
}