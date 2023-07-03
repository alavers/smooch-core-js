'use strict';

exports.__esModule = true;
exports.IntegrationMenuApi = undefined;

var _base = require('./base');

var _smoochMethod = require('../utils/smoochMethod');

var _smoochMethod2 = _interopRequireDefault(_smoochMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constructor
 * @name IntegrationMenuApi
 * @extends BaseApi
 */
var IntegrationMenuApi = exports.IntegrationMenuApi = function (_BaseApi) {
    _inherits(IntegrationMenuApi, _BaseApi);

    function IntegrationMenuApi() {
        _classCallCheck(this, IntegrationMenuApi);

        var _this = _possibleConstructorReturn(this, _BaseApi.apply(this, arguments));

        _this.allowedAuth = ['jwt'];
        return _this;
    }

    IntegrationMenuApi.prototype.validateProps = function validateProps(props) {
        if (!props) {
            throw new Error('Must provide props.');
        }

        if (!props.items) {
            throw new Error('Must provide an array of items.');
        }
    };

    return IntegrationMenuApi;
}(_base.BaseApi);

Object.assign(IntegrationMenuApi.prototype, {

    /**
     * Fetch an integration's menu
     * @memberof IntegrationMenuApi.prototype
     * @method get
     * @param  {string} integrationId
     * @return {APIResponse}
     */
    get: (0, _smoochMethod2.default)({
        params: ['integrationId'],
        path: '/integrations/:integrationId/menu',
        method: 'GET'
    }),

    /**
     * Update an integration's menu
     * @memberof IntegrationMenuApi.prototype
     * @method configure
     * @param  {object} props
     * @return {APIResponse}
     */
    create: (0, _smoochMethod2.default)({
        params: ['integrationId', 'props'],
        path: '/integrations/:integrationId/menu',
        func: function create(url, integrationId, props) {
            this.validateProps(props);
            return this.request('POST', url, props);
        }
    }),

    /**
     * Update an integration's menu
     * @memberof IntegrationMenuApi.prototype
     * @method configure
     * @param  {object} props
     * @return {APIResponse}
     */
    update: (0, _smoochMethod2.default)({
        params: ['integrationId', 'props'],
        path: '/integrations/:integrationId/menu',
        func: function update(url, integrationId, props) {
            this.validateProps(props);
            return this.request('PUT', url, props);
        }
    }),

    /**
     * Delete an integration's menu
     * @memberof IntegrationMenuApi.prototype
     * @method delete
     * @return {APIResponse}
     */
    delete: (0, _smoochMethod2.default)({
        params: ['integrationId'],
        path: '/integrations/:integrationId/menu',
        method: 'DELETE'
    })
});