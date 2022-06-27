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
    const [filterUrl, setFilterUrl] = useState(
        {
            catid: data.refId,
            values: "",
            minPrice: 0,
            maxPrice: 50,
            page: 1,
            sort: "price_desc",
        });

    const [noMore, setNoMore] = useState(false);
    const [page, setPage] = useState(1);

    var raw = JSON.stringify({
        "listid": data.refId,
        "page": page
    });

    useEffect(() => {
        setProductItems([]);
        var Category = data.refId;

        const FilterLinkArray = data.properties.filter(m => m.propertyValues.filter(mm => filterValues.indexOf(mm.refId) >= 0).length > 0).reduce((a, v) => { a[v.slug] = v.propertyValues.filter(m => filterValues.indexOf(m.refId) >= 0).map(k => k.refId); return a; }, {});

        var result = Object.keys(FilterLinkArray).reduce((m, a) => {
            m[a] = FilterLinkArray[a].join("|");
            return m;
        }, {});

        result = Object.keys(result).reduce((n, b) => {
            n.push(b + ":" + result[b]);
            return n;
        }, []).join(",");
        
        var linkbuild = Object.assign({}, filterUrl);
        linkbuild.catid = Category;
        linkbuild.values = result;
        linkbuild.page = 1;
        
        if (filterUrl != linkbuild) {
            setFilterUrl(linkbuild);
            setNoMore(false);
        }
    }, [filterValues]);

    useEffect(async () => {
        GellAllProduct();
    }, [filterUrl]);

    const fetchProduct = async () => {
        if (noMore) return;
        filterUrl.page += 1;
        const res = await fetch("/api/listing?" + Object.keys(filterUrl).map(m => m + "=" + filterUrl[m]).join("&"), requestOptions);
        const Data = await res.json();
        return Data;
    };

    async function GellAllProduct (){
        setProductItems([]);
        const res = await fetch("/api/listing?" + Object.keys(filterUrl).map(m => m + "=" + filterUrl[m]).join("&"), requestOptions);
        const Data = await res.json();
        setProductItems(Data);
    };

    const fetchData = async () => {
        let p = page;
        setPage(p + 1);
        const fetchNowProducts = await fetchProduct();
        setProductItems([...productItems, ...fetchNowProducts]);
        if (fetchNowProducts.length < 20) {
            setNoMore(true);
        }
        
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


    function setBySortUpFunc(e) {
        setFilterUrl({...filterUrl, sort: e, page:1});
        GellAllProduct ();
        console.log(filterUrl);
    }

    function getByPriceFilter(m,n) {
        setFilterUrl({...filterUrl, maxPrice: m, minPrice: n, page:1});
        GellAllProduct (); 
    }

    return (
        <Fragment>
            <ProductTop title={data.name} type={true} setBySortUp={setBySortUpFunc} currentSort={filterUrl.sort}></ProductTop>
            <div className="px py col-12" id="ProductList">
                <div className="row">
                    <div className="container-fluid">

                        <Filter items={data.properties} filterValues={filterValues} setFilterValues={setFilterValues} getByPriceFilter={getByPriceFilter}></Filter>

                        <div className="px py col-10 col-md-12" id="mainSide">

                            <ListSubCat Stories={data.subcats}></ListSubCat>
                            <FilterHistory items={data.properties} filterValues={filterValues} setFilterValues={setFilterValues}></FilterHistory>
                            <InfiniteScroll
                                className="fl col-12"
                                id="Katalog"
                                dataLength={productItems.length}
                                next={fetchData}
                                hasMore={!noMore}
                                loader={<div className='fl col-12 ListBottomHr'><span></span></div>}
                                endMessage={
                                    <p className="fl col-12" id="NoMoreProduct" style={{ textAlign: 'center' }}>
                                        <b>{dictionary["@Web.UI.YouSawAllProduct"] == null ? "@Web.UI.YouSawAllProduct" : dictionary.dictionary["@Web.UI.YouSawAllProduct"]}</b>
                                    </p>
                                }>
                                {productItems.map((e, i) => {
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