import { Fragment } from "react";
import React from "react";
import dynamic from 'next/dynamic';
import ContentComponent from "../widget/main/contentComponent";
import RowComponent from "../layout/main/rowComponent";
import ColComponent from "../layout/main/colComponent";
import Header from "../widget/main/headerComponent";
import ProductComponent from "../widget/main/productComponent";
import BasketComponent from "../widget/main/basketComponent";
import ProductsComponent from "../widget/main/productsComponent";

const existOrCreateComponents = (type, group, name, props, data, i) => {
    try {
        if (name == "contentComponent") {
            return <ContentComponent props={props} data={data.data} key={i}>
                <Factory params={data} key={i}></Factory>
            </ContentComponent>
        } else if (name == "rowComponent") {
            return <RowComponent props={props} data={data.data} key={i}>
                <Factory params={data} key={i}></Factory>
            </RowComponent>
        } else if (name == "colComponent") {
            return <ColComponent props={props} data={data.data} key={i}>
                <Factory params={data} key={i}></Factory>
            </ColComponent>
        } else if (name == "productComponent") {
            return <ProductComponent props={props} data={data.data} key={i}>
                <Factory params={data} key={i}></Factory>
            </ProductComponent>
        } else if (name == "productsComponent") {
            return <ProductsComponent props={props} data={data.data} key={i}>
                <Factory params={data} key={i}></Factory>
            </ProductsComponent>
        }  else if (name == "headerComponent") {
            return <Header data={data} key={i}></Header>
        }
        else if (name == "basketComponent") {
            return <BasketComponent props={props} data={data}>
                <Factory params={data} key={i}></Factory>
            </BasketComponent>
        }
        else if (typeof require(`../${type}/${group}/${name}`).default) {
            const DynamicComp = dynamic(() => import(`../${type}/${group}/${name}`));
            return (
                <DynamicComp props={props} data={data.data} key={i}>
                    <Factory params={data}  key={i}></Factory>
                </DynamicComp>
            )
        }


    } catch (e) {
        //loga gönderilecek
        console.log(e);
    }
}


const Factory = ({ params }) => {
    if (params == null || params.components == null)
        return <Fragment></Fragment>;

    return (
        <>
            {params.components.map((e, i) => existOrCreateComponents(e.type, e.group, e.nameOfComponent, e?.props ?? {}, e, i))}
        </>
    );

}
export default Factory