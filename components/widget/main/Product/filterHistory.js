import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getDictionary } from '../../../../redux/slices/dictionarySlice';

import Dictionary from '../../../../lib/dictionary';

import {AiOutlineClose} from "react-icons/ai";



export default function FilterHistory({ items, filterValues, setFilterValues }) {
	const dictionary = useSelector(getDictionary);
	const filters = items.reduce((p, c) => {
		c.propertyValues.map(j => p.push(j));
		return p;
	}, []);

	function removeInFilter(e) {
		setFilterValues(filterValues.filter(m => m != e));
	}
	
	return (
		<ul className="fl col-12" id="filterHistory">
			{filters.filter(e => filterValues.indexOf(e.refId) >= 0).map(e => 
				<li key={e.refId}>
					{e.name} 
					<button onClick={v => removeInFilter(e)}>
						<AiOutlineClose></AiOutlineClose>
					</button>
				</li>
			)}
			
			<li><a href={void(0)} onClick={e => setFilterValues([])}>{dictionary["Web.UI.CleanFilter"]}</a></li>
		</ul>
	)
}