var elastic = require("@elastic/elasticsearch");
var fs = require('fs');

export default async function handler(req, res) {

    const client = new elastic.Client({
        node: process.env.elastichost,
        auth: {
          username: process.env.elasticuser,
          password: process.env.elasticpass
        },
        tls: {
          ca: fs.readFileSync('./elastic_http_ca.crt'),
          rejectUnauthorized: false
        }
      });

      const query = {
        index: "product",
        from: 0,
        size: process.env.elasticproductperpage,
        query: {
          bool: {
            must: []
          }
        }
      };
      if (!!req.query.page) {
        query.from = (parseInt(req.query.page)-1) * process.env.elasticproductperpage
      }
      if (!!req.query.catid) {
        query.query.bool.must.push({match: {"categories.refId": req.query.catid}});
      }
      if (!!req.query.values) {
        const values = req.query.values.split(',');
        for(let i in values) {
          query.query.bool.must.push({match: {"variants.properties.valueId": values[i]}});
        }
      }
      if (!!req.query.sort) {
        let sortby = req.query.sortby || "asc";
        switch (req.query.sort) {
          case "price":
            query.sort = [{"variants.prices.salePrice": {"order": sortby}}]
            break;
        
          default:
            break;
        }
      }
      const result = await client.search(query);
      var listing = result.hits.hits.map(_s => {
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
          moneySymbol: p.moneySymbol,
          supplier: p.supplier,
          seoUrl: e.url,
          images: e.medias.map(m => m.path),
          productLinks: [],
          variantProperties: [],
          discountId: null
        };
      });
      res.status(200).json(listing);
}
  