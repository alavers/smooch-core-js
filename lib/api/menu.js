'use strict';

exports.__esModule = true;
exports.MenuApi = undefined;

var _base = require('./base');

var _smoochMethod = require('../utils/smoochMethod');

var _smoochMethod2 = _interopRequireDefault(_smoochMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constructor
 * @name MenuApi
 * @extends BaseApi
 */
var MenuApi = exports.MenuApi = function (_BaseApi) {
    _inherits(MenuApi, _BaseApi);

    function MenuApi() {
        _classCallCheck(this, MenuApi);

        var _this = _possibleConstructorReturn(this, _BaseApi.apply(this, arguments));

        _this.allowedAuth = ['jwt'];
        return _this;
    }

    return MenuApi;
}(_base.BaseApi);

Object.assign(MenuApi.prototype, {

    /**
     * Fetch an app's menu
     * @memberof MenuApi.prototype
     * @method get
     * @return {APIResponse}
     */
    get: (0, _smoochMethod2.default)({
        params: [],
        path: '/menu',
        method: 'GET'
    }),

    /**
     * Update an app's menu
     * @memberof MenuApi.prototype
     * @method configure
     * @param  {object} props
     * @return {APIResponse}
     */
    configure: (0, _smoochMethod2.default)({
        params: ['props'],
        path: '/menu',
        func: function configure(url, props) {
            if (!props) {
                return Promise.reject(new Error('Must provide props.'));
            }

            if (!props.items) {
                return Promise.reject(new Error('Must provide an array of items.'));
            }

            return this.request('PUT', url, props);
        }
    }),

    /**
     * Delete an app's menu
     * @memberof MenuApi.prototype
     * @method remove
     * @return {APIResponse}
     */
    remove: (0, _smoochMethod2.default)({
        params: [],
        path: '/menu',
        method: 'DELETE'
    })
});