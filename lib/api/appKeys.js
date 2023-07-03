'use strict';

exports.__esModule = true;
exports.AppKeysApi = undefined;

var _base = require('./base');

var _smoochMethod = require('../utils/smoochMethod');

var _smoochMethod2 = _interopRequireDefault(_smoochMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constructor
 * @name AppKeysApi
 * @extends BaseApi
 */
var AppKeysApi = exports.AppKeysApi = function (_BaseApi) {
    _inherits(AppKeysApi, _BaseApi);

    function AppKeysApi() {
        _classCallCheck(this, AppKeysApi);

        var _this = _possibleConstructorReturn(this, _BaseApi.apply(this, arguments));

        _this.allowedAuth = ['jwt'];
        return _this;
    }

    return AppKeysApi;
}(_base.BaseApi);

Object.assign(AppKeysApi.prototype, {
    /**
     * Create a new app key
     * @memberof AppKeysApi.prototype
     * @method create
     * @param  {string} name
     * @return {APIResponse}
     */
    create: (0, _smoochMethod2.default)({
        params: ['name'],
        path: '/keys',
        func: function create(url, name) {
            if (typeof name !== 'string') {
                throw new Error('Invalid name parameter type, expected string');
            }
            return this.request('POST', url, { name: name });
        }
    }),

    /**
     * Fetch the keys currently configured for an app
     * @memberof AppKeysApi.prototype
     * @method list
     * @return {APIResponse}
     */
    list: (0, _smoochMethod2.default)({
        params: [],
        path: '/keys',
        method: 'GET'
    }),

    /**
     * Retrieve an existing app key
     * @memberof AppKeysApi.prototype
     * @method get
     * @param  {string} keyId
     * @return {APIResponse}
     */
    get: (0, _smoochMethod2.default)({
        params: ['keyId'],
        path: '/keys/:keyId',
        method: 'GET'
    }),

    /**
     * Generate a JWT with app scope using the specified key
     * @memberof AppKeysApi.prototype
     * @method getJwt
     * @param  {string} keyId
     * @return {APIResponse}
     */
    getJwt: (0, _smoochMethod2.default)({
        params: ['keyId'],
        path: '/keys/:keyId/jwt',
        method: 'GET'
    }),

    /**
     * Delete an existing app
     * @memberof AppKeysApi.prototype
     * @method delete
     * @param  {string} keyId
     * @return {APIResponse}
     */
    delete: (0, _smoochMethod2.default)({
        params: ['keyId'],
        path: '/keys/:keyId', method: 'DELETE'
    })
});