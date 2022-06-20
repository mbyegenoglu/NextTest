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
      let sortby = req.query.sortby || "asc";
      switch (req.query.sort) {
          case "price":
              query.sort = [{ "variants.prices.salePrice": { "order": sortby } }]
              break;

          default:
              break;
      }
  }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let elasresp = await fetch(process.env.elastichost + "/product/_search", {
      method: "POST",
      headers: { "content-type": "application/json", "Authorization": "Basic ZWxhc3RpYzpFVDRReElfSWJZWmRJSkdFaUNkcg==" },
      body: JSON.stringify(query)
  });
  
  let result = await elasresp.json();
  let listing = result.hits.hits.map(_s => {
      let e = _s._source;
      let p = e.productType == 1 ? e.variants.reduce((a, e) => { e.prices.forEach(p => a.push(p)); return a; }, []).sort((a, b) => a - b)[0] : e.prices.sort((a, b) => a - b)[0];
      return {
          refId: e.refId,
          productType: e.productType,
          stockCode: e.stockCode,
          productBrandName: e.productBrandName,
          stock: p.stock,
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
          price: p.price == null ? 0 : p.price,
          priceListId: p.priceListId,
          moneySymbol: p.moneySymbol,
          supplier: p.supplier,
          seoUrl: e.url,
          images: e.medias.map(m => m.path),
          productLinks: [],
          variantProperties: [],
          discountId: null
      };
  });
  var myHeaders = {};
  myHeaders["Content-Type"] = "application/json";
  myHeaders["uniqueid"] = req.headers.uniqueid;
  myHeaders["locale"] = req.headers.locale;
  myHeaders["ip"] = req.headers.ip;
  myHeaders["money"] = req.headers.money;
  myHeaders["language"] = req.headers.language;

  var raw = JSON.stringify(listing.map(m => { return { ProductId: m.refId, PriceListId: m.priceListId, Price: m.salePrice } }));

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  let customheaders = req.headers;
  customheaders["Content-Type"] = "application/json";
  let campaignResponse = await fetch(process.env.serverurl + "/Campaign/CampaignByProducts", requestOptions);

  let campaignData = await campaignResponse.json();

  listing.map(l => {
      let prices = campaignData.filter(c => c.productId == l.refId);
      if (prices.length == 1) {
          l.price = prices[0].price;
          l.salePrice = prices[0].price;
      }
      return l;
  });

  res.status(200).json(listing);

}
