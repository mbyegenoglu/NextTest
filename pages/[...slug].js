import Head from 'next/head';
import React from 'react';
import Factory from '../components/builder/factory';
import Cookiefactory from '../lib/cookiefactory';
import bodyParser from "body-parser";

import { useDispatch } from 'react-redux';
import { setDictionary } from '../redux/slices/dictionarySlice';
import { setParam } from '../redux/slices/paramSlice';
import { setMoney } from '../redux/slices/moneySlice';
import { setLanguage } from '../redux/slices/languageSlice';
import { setUser } from '../redux/slices/userSlice';
import { setList } from '../redux/slices/listSlice';
import { setMenu } from '../redux/slices/menuSlice';
import { promisify } from 'util';
import { exit } from 'process';
import { setLink } from '../redux/slices/linkSlice';

function Slug({ payload }) {
	const dispatch = useDispatch();
	dispatch(setDictionary(payload.data.settings.dictionary));
	dispatch(setParam(payload.data.settings.params));
	dispatch(setMoney(payload.data.settings.moneys));
	dispatch(setLanguage(payload.data.settings.languages));
	dispatch(setList(payload.data.settings.lists));
	dispatch(setMenu(payload.data.menus));
	dispatch(setLink(payload.data.settings.links));

	if (!!payload.data.user) {
		dispatch(setUser(payload.data.user));
	}
	return (
		<>
			
			<Factory params={payload.data}></Factory>

		</>
	)
}

export async function getServerSideProps({ params, req, res }) {

	const serverurl = process.env.serverurl;
	let slug = serverurl + '/site/' + params.slug.join(",");
	try {
		const cookiefactory = new Cookiefactory();
		const headerData = cookiefactory.GetCookies(req, res);
		const token = cookiefactory.GetToken(req, res);
		if (!!token) {
			headerData.Authorization = "Bearer " + cookiefactory.GetToken(req, res);
		}
		
		if (req.method == "POST") {
			const getBody = promisify(bodyParser.urlencoded());
			await getBody(req, res);
			headerData["Content-Type"] = "application/x-www-form-urlencoded";
			console.log(req.body?.currentPaymentType);
			let datares = await fetch(slug, { method: 'POST', headers: headerData, body: Object.keys(req.body).map(e => e+"="+req.body[e]).join("&") });
			let data = await datares.json();
			//cookiefactory.SetCookies(data.data.settings, req, res);
			return { props: { payload: data } };
		} else {
			let datares = await fetch(slug, { headers: headerData });
			let data = await datares.json();
			console.log(data);
			if (data.data.redirect != null && data.data.redirect != "") {
				return { redirect: {
					permanent: false,
					destination: data.data.redirect
				  } };
			}
			//cookiefactory.SetCookies(data.data.settings, req, res);
			return { props: { payload: data } };
		}
	} catch (error) {
		return { props: { payload: null } };
	}
}

export default Slug;