'use strict';

exports.__esModule = true;
exports.BaseApi = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _http = require('../utils/http');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Authentication credentials - a JWT must be provided
 * @typedef AuthCredentials
 * @type {object}
 * @property {string} [jwt] - a JWT generated with the app secret and key id
 */

/**
 * @class BaseApi
 */
var BaseApi = exports.BaseApi = function () {
    function BaseApi(serviceUrl, authHeaders, headers, requireAppId, httpAgent) {
        _classCallCheck(this, BaseApi);

        this.serviceUrl = serviceUrl;
        this.authHeaders = authHeaders;
        this.headers = headers;
        this.requireAppId = !!requireAppId;
        this.httpAgent = httpAgent;
    }

    /**
     * Validates the headers sent to the server
     * @return {object}             - the headers object passed in parameter
     */


    BaseApi.prototype.validateAuthHeaders = function validateAuthHeaders() {
        if (!this.authHeaders) {
            return Promise.reject(new Error('Must provide headers.'));
        }

        var hasJwt = !!this.authHeaders.Authorization;

        if (!hasJwt) {
            return Promise.reject(new Error('Must use JWT for authentication.'));
        }

        return Promise.resolve();
    };

    BaseApi.prototype.request = function request(method, url, data) {
        var _this = this;

        var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
            _ref$allowedAuth = _ref.allowedAuth,
            allowedAuth = _ref$allowedAuth === undefined ? this.allowedAuth : _ref$allowedAuth;

        return this.validateAuthHeaders(allowedAuth).then(function () {
            return (0, _http.http)(method, url, data, _this.getHeaders(), _this.httpAgent);
        });
    };

    /**
     * Combines authorization headers and custom headers passed in the Smooch constructor
     * returns {object} - The headers to be sent in HTTP requests
     */


    BaseApi.prototype.getHeaders = function getHeaders() {
        return _extends({}, this.headers, this.authHeaders);
    };

    return BaseApi;
}();