export default async function handler(req, res) {

    const query = {
        //index: "product",
        from: 0,
        size: process.env.elasticproductperpage,
        query: {
            bool: {
                must: []
            }
        }
    };
    if (!!req.query.page) {
        query.from = (parseInt(req.query.page) - 1) * process.env.elasticproductperpage
    }
    if (!!req.query.catid) {
        query.query.bool.must.push({ match: { "categories.refId": req.query.catid } });
    }
    if (!!req.query.values) {
        const values = req.query.values.split(',');
        for (let i in values) {
            query.query.bool.must.push({ terms: { "variants.properties.valueId": values[i].split(":")[1].split("|") } });
        }
    }
    if (!!req.query.sort) {
        //let sortby = req.query.sortby || "asc";
        switch (req.query.sort) {
            case "price_desc":
                query.sort = [{ "variants.prices.price": { "order": "desc" } }];
                break;
            case "price_asc":
                query.sort = [{ "variants.prices.price": { "order": "asc" } }];
                break;
            default:
                query.sort = [{ "sortNr": { "order": "desc" } }];
                break;
        }
    } else {
        query.sort = [{ "sortNr": { "order": "desc" } }];
    }
    if (!!req.query.pricemin || !!req.query.pricemax) {
        const range = { "variants.prices.price": {} };
        if (!!req.query.pricemin) range["variants.prices.price"].gte = parseFloat(req.query.pricemin);
        if (!!req.query.pricemax) range["variants.prices.price"].lte = parseFloat(req.query.pricemax);
        query.query.bool.must.push({ range: range });
    } else {
        const range = { "variants.prices.price": {"gte": 0} };
        query.query.bool.must.push({ range: range });
    }
    const stockRange = { "variants.prices.stock": {"gte": 0} };
    query.query.bool.must.push({ range: stockRange });

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    let elasresp = await fetch(process.env.elastichost + "/product/_search", {
        method: "POST",
        headers: { "content-type": "application/json", "Authorization": "Basic ZWxhc3RpYzpFVDRReElfSWJZWmRJSkdFaUNkcg==" },
        body: JSON.stringify(query)
    });
    let result = await elasresp.json();
    let listing = result.hits.hits.map(_s => {
        let e = _s._source;
        let p = e.productType == 1 ? e.variants.reduce((a, e) => { e.prices.forEach(p => a.push(p)); return a; }, []).sort((a, b) => a.price - b.price)[0] : e.prices.sort((a, b) => a.price - b.price)[0];
        if (p == undefined) {
            console.log(JSON.stringify(_s._source));
        }
        return {
            refId: e.refId,
            productType: e.productType,
            stockCode: e.stockCode,
            productBrandName: e.productBrandName,
            stock: p.stock == null ? 0 : p.stock,
            isVirtualStock: e.isVirtualStock,
            virtualStockDeliveryDay: e.virtualStockDeliveryDay,
            isDisablePurchase: e.isDisablePurchase,
            isLabelNew: e.isLabelNew,
            isLabelCampaign: e.isLabelCampaign,
            isLabelDiscount: e.isLabelDiscount,
            isCargoFree: e.isCargoFree,
            deliveryTime: e.deliveryTime,
            productName: e.productName,
            description: e.description,
            defaultPrice: p.defaultPrice == null ? 0 : p.defaultPrice,
            salePrice: p.salePrice == null ? 0 : p.salePrice,
            price: p.discountPrice == null ? (p.price == null ? 0 : p.price) : p.discountPrice,
            priceListId: p.priceListId,
            moneySymbol: p.moneySymbol,
            supplier: p.supplier,
            seoUrl: e.url,
            images: e.medias.map(m => m.path),
            productLinks: e.linkeds,
            variantProperties: [],
            discountId: p.discountId,
            discountPrice: p.discountPrice,
        };
    });

    res.status(200).json(listing);

}
