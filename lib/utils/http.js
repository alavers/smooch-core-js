'use strict';

exports.__esModule = true;
exports.stringifyGETParams = stringifyGETParams;
exports.handleResponse = handleResponse;
exports.http = http;
var fetch = require('isomorphic-fetch');

/**
 * API Response promise - resolves with the requested resource
 * @typedef APIResponse
 * @type { Promise }
 */

/**
 * Stringifies query parameters and append them to the url
 * @param  {string} url  - an url
 * @param  {object} data - an object containing the query parameters
 * @return {string}      - the final url
 */
function stringifyGETParams(url, data) {
    var query = Object.keys(data).reduce(function (q, key) {
        if (data[key] !== null) {
            return q + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }
        return q;
    }, '');

    if (query) {
        url += (~url.indexOf('?') ? '&' : '?') + query.substring(1);
    }
    return url;
}

function handleResponse(response) {
    if (response.status === 202 || response.status === 204) {
        return Promise.resolve();
    }

    var contentType = response.headers.get('Content-Type') || '';
    var isJson = contentType.indexOf('application/json') > -1;

    if (response.status >= 200 && response.status < 300) {
        return isJson ? response.json() : Promise.resolve();
    } else {
        if (isJson) {
            return response.json().then(function (json) {
                var _json$error = json.error,
                    error = _json$error === undefined ? {} : _json$error;


                var err = new Error(error.description || response.statusText);
                err.response = response;
                err.code = error.code;
                err.description = error.description;

                throw err;
            });
        } else {
            var error = new Error(response.statusText);
            error.response = response;

            return Promise.reject(error);
        }
    }
}

function http(method, url, data) {
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var agent = arguments[4];

    method = method.toUpperCase();

    var fetchOptions = {
        method: method,
        headers: Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, headers)
    };

    if (agent) {
        fetchOptions.agent = agent;
    }

    if (data) {
        if (data instanceof FormData) {
            fetchOptions.body = data;
            // Remove the Content-Type header, `fetch` will
            // generate one to add the form boundary.
            delete fetchOptions.headers['Content-Type'];
        } else {
            data = Object.assign({}, data);
            if (method === 'GET') {
                url = stringifyGETParams(url, data);
            } else if (method === 'POST' || method === 'PUT') {
                fetchOptions.body = JSON.stringify(data);
            }
        }
    }

    return fetch(url, fetchOptions).then(handleResponse);
}