/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getDictionary } from "../../../redux/slices/dictionarySlice";
import { getParam } from "../../../redux/slices/paramSlice";
import Filter from "./Product/filter";
import FilterHistory from "./Product/filterHistory";
import ProductBox from "./Product/productBox";
import ProductTop from "./Product/productTop";
import InfiniteScroll from "react-infinite-scroll-component";
import ListSubCat from "./List/ListSubCat";
import Dictionary from "../../../lib/dictionary";

export default function ProductsComponent({ props, children, data }) {
    const param = new Dictionary(useSelector(getParam));
    const dictionary = new Dictionary(useSelector(getDictionary));
    const [filterValues, setFilterValues] = useState([]);
    const [productItems, setProductItems] = useState([]);
    const [filterUrl,setFilterUrl] = useState("/api/listing?catid="+ data.refId+"&page=1&sort=price&sortby=desc");

    const [noMore, setNoMore] = useState(false);
    const [page, setPage] = useState(1);

    var raw = JSON.stringify({
        "listid": data.refId,
        "page": page
    });


    useEffect(()=>{
            setPage(1);
            setProductItems([]);
            var Category = data.refId;
            var Page = page;
            var LinkFilter = "&values=";
            if(filterValues.length > 0){
                LinkFilter = "&values=" + filterValues.join(',')
            }
            var Link = "/api/listing?catid=" + Category + LinkFilter+"&page="+Page+"&sort=price&sortby=desc";
            setFilterUrl(Link);
            console.log(Link);

    }, [filterValues]);


    useEffect( async ()=>{
            const res = await fetch(filterUrl, requestOptions);
            const Data = await res.json();
            setProductItems(Data);
    }, [filterUrl]);

    const fetchProduct = async () => {
        const res = await fetch(filterUrl , requestOptions);
        const Data = await res.json();
        return Data;
    };

    const fetchData = async () => {
        const fetchNowProducts = await fetchProduct();
        setProductItems([...productItems, ...fetchNowProducts]);
        if(fetchNowProducts.length === 0 || fetchNowProducts.length < 20){
            setNoMore(true);
        }
        setPage(page+1);
    };


    var myHeaders = new Headers();
    myHeaders.append("UniqueId", "214127346123");
    myHeaders.append("locale", "TR");
    myHeaders.append("IP", "2.43534.21312");
    myHeaders.append("Language", "tr");
    myHeaders.append("Money", "TL");
    myHeaders.append("HostAddress", "patirti.com");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    


    return (
        <Fragment>
            <ProductTop title={data.name} type={true}></ProductTop>
            <div className="px py col-12" id="ProductList">
                <div className="row">
                    <div className="container-fluid">

                        <Filter items={data.properties} filterValues={filterValues} setFilterValues={setFilterValues} ></Filter>
                        
                        <div className="px py col-10 col-md-12" id="mainSide">
                            
                            <ListSubCat Stories={data.subcats}></ListSubCat>
                            <FilterHistory items={data.properties} filterValues={filterValues} setFilterValues={setFilterValues}></FilterHistory>
                            <InfiniteScroll
                                className="fl col-12"
                                id="Katalog"
                                dataLength={productItems.length}
                                next={fetchData}
                                hasMore={true}
                                loader={<div className='fl col-12 ListBottomHr'><span></span></div>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>{dictionary["@Web.UI.YouSawAllProduct"] == null ? "@Web.UI.YouSawAllProduct" : dictionary.dictionary["@Web.UI.YouSawAllProduct"]}</b>
                                    </p>
                                }>
                                {productItems.map((e, i) =>{
                                    return <ProductBox item={e} key={i} param={param} dictionary={dictionary}></ProductBox>
                                })}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


/*

*/