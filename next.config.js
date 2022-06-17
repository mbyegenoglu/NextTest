module.exports = {
	reactStrictMode: false,
	env: {
		serverurl: "https://gw.antremeta.com",
		hostaddress: "patirti.com",
		elastichost: "https://185.88.172.44:9200",
		elasticuser: "elastic",
		elasticpass: "ET4QxI_IbYZdIJGEiCdr",
		elasticproductperpage: 20
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
		  config.resolve.fallback.fs = false
		}
	
		return config
	},
	images: {
		domains: ['cdn.dsmcdn.com',"localhost","img1ptrti.mncdn.com","img-kotontr.mncdn.com","via.placeholder.com","img.antremeta.com"],
	}
}
