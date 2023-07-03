'use strict';

exports.__esModule = true;
exports.AppsApi = undefined;

var _base = require('./base');

var _appKeys = require('./appKeys');

var _smoochMethod = require('../utils/smoochMethod');

var _smoochMethod2 = _interopRequireDefault(_smoochMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constructor
 * @name AppsApi
 * @extends BaseApi
 */
var AppsApi = exports.AppsApi = function (_BaseApi) {
    _inherits(AppsApi, _BaseApi);

    function AppsApi() {
        _classCallCheck(this, AppsApi);

        var _this = _possibleConstructorReturn(this, _BaseApi.apply(this, arguments));

        _this.requireAppId = false;
        _this.allowedAuth = ['jwt'];

        _this.keys = new (Function.prototype.bind.apply(_appKeys.AppKeysApi, [null].concat(Array.prototype.slice.call(arguments))))();
        return _this;
    }

    return AppsApi;
}(_base.BaseApi);

Object.assign(AppsApi.prototype, {
    /**
     * Create a new app
     * @memberof AppsApi.prototype
     * @method create
     * @param  {string} name
     * @return {APIResponse}
     */
    create: (0, _smoochMethod2.default)({
        params: ['name', 'settings'],
        optional: ['settings'],
        path: '/apps',
        func: function create(url, name, settings) {
            if (typeof name !== 'string') {
                throw new Error('Invalid name parameter type, expected string');
            }

            var params = {
                name: name
            };

            if (settings) {
                params.settings = settings;
            }

            return this.request('POST', url, params);
        }
    }),

    /**
     * Fetch the apps currently configured
     * @memberof AppsApi.prototype
     * @method list
     * @param  {number} limit
     * @param  {number} offset
     * @return {APIResponse}
     */
    list: (0, _smoochMethod2.default)({
        params: ['limit', 'offset'],
        optional: ['limit', 'offset'],
        path: '/apps',
        func: function list(url, limit, offset) {
            var q = {};
            if (limit) {
                if (typeof limit !== 'number') {
                    throw new Error('limit must be a number');
                }
                q.limit = limit;
            }
            if (offset) {
                if (typeof offset !== 'number') {
                    throw new Error('offset must be a number');
                }
                q.offset = offset;
            }

            if (q.limit || q.offset) {
                return this.request('GET', url, q);
            } else {
                return this.request('GET', url);
            }
        }
    }),

    /**
     * Retrieve an existing app
     * @memberof AppsApi.prototype
     * @method get
     * @param  {string} appId
     * @return {APIResponse}
     */
    get: (0, _smoochMethod2.default)({
        params: ['appId'],
        path: '/apps/:appId',
        method: 'GET'
    }),

    /**
     * Update an existing app
     * @memberof AppsApi.prototype
     * @method put
     * @param  {string} appId
     * @return {APIResponse}
     */
    update: (0, _smoochMethod2.default)({
        params: ['appId', 'data'],
        path: '/apps/:appId',
        method: 'PUT'
    }),

    /**
     * Delete an existing app
     * @memberof AppsApi.prototype
     * @method delete
     * @param  {string} appId
     * @return {APIResponse}
     */
    delete: (0, _smoochMethod2.default)({
        params: ['appId'],
        path: '/apps/:appId',
        method: 'DELETE'
    })
});