import axios from 'axios'

export default {
    getBitcoinRate,
    getMarketPrice,
    getConfirmedTransactions,
    watchBitcoinRate
}


function getBitcoinRate(dollars=1)  {
    return _getRequest(`https://blockchain.info/tobtc?currency=USD&value=${dollars}`)
}

async function getMarketPrice() {
    const res = await _getRequest('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

async function getConfirmedTransactions () {
    const res = await _getRequest('https://api.blockchain.info/charts/n-transactions?format=json&cors=true')
    return {
        title: res.name,
        data: res.values.map(point => point.y), 
        description: res.description
    }
}

var lastRate = null;
function watchBitcoinRate(cb) {
    const getRate = async ()=>{
        let rate = await getBitcoinRate(1)
        if (rate === lastRate) return;
        lastRate = rate;        
        rate = rate.toFixed(8)
        
        cb(+rate)
    }
    // Kick it off immediately and then every 4 secs
    getRate();
    var interval = setInterval(getRate, 4000)
    return ()=>clearInterval(interval)
}


function _getRequest(url) {
    return axios.get(url)
        .then(res => res.data)
}