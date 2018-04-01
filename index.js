var request = require('request')

var TradeOgre = function (key, secret) {

	this.VERSION = '1.0.0'

	this._key = key
	this._secret = secret

	this._endpoint = 'tradeogre.com/api/v1'
	this._publicUrl = 'https://' + this._endpoint
	this._privateUrl = 'https://' + this._key + ":" + secret + "@" + this._endpoint

	this._request = function (method, path, options, callback) {
		if (method === 'GET') {
			return this._get(path, options, callback)
		}
		if (method === 'POST') {
			return this._post(path, options, callback)
		}
	}
	this._get = function (path, options, callback) {
		var qs = ''
		for (var o in options) {
			qs += '/' + options[o]
		}
		return request(
			{
				method: "GET",
				url: this._publicUrl + path + qs
			},
			callback
		)
	}
	this._post = function (path, options, callback) {
		return request(
			{
				method: "POST",
				url: this._privateUrl + path,
				form: options,
				json: true
			},
			callback
		)
	}

	return this
}

// Public methods
TradeOgre.prototype.getMarkets = function (callback) {
	/**
	 * @param market
	 */
	this._get('/markets', {}, callback)
}
TradeOgre.prototype.getOrderBook = function (market, callback) {
	/**
	 * @param market
	 */
	this._get('/orders', { market : market }, callback)
}
TradeOgre.prototype.getTicker = function (market, callback) {
	/**
	 * @param market
	 */
	this._get('/ticker', { market : market }, callback)
}
TradeOgre.prototype.getTradeHistory = function (market, callback) {
	/**
	 * @param market
	 */
	this._get('/history', { market : market }, callback)
}

// Private methods
TradeOgre.prototype.buy = function (market, quantity, price, callback) {
	/**
	 * @param market
	 * @param quantity
	 * @param price
	 */
	this._post('/order/buy', { market : market, quantity: quantity, price: price }, callback)
}
TradeOgre.prototype.sell = function () {
	/**
	 * @param market
	 * @param quantity
	 * @param price
	 */
	this._post('/order/sell', { market : market, quantity: quantity, price: price }, callback)
}
TradeOgre.prototype.cancelOrder = function () {
	/**
	 * @param uuid
	 */
	this._post('/order/cancel', { uuid: uuid }, callback)
}
TradeOgre.prototype.getOrders = function (market, callback) {
	/**
	 * @param market
	 */
	this._post('/account/orders', { market: market }, callback)
}
TradeOgre.prototype.getBalance = function (currency, callback) {
	/**
	 * @param currency
	 */
	this._post('/account/balance', { currency: currency }, callback)
}

module.exports = TradeOgre