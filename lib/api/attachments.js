'use strict';

exports.__esModule = true;
exports.AttachmentsApi = undefined;

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
 * @name AttachmentsApi
 * @extends BaseApi
 */
var AttachmentsApi = exports.AttachmentsApi = function (_BaseApi) {
    _inherits(AttachmentsApi, _BaseApi);

    function AttachmentsApi() {
        _classCallCheck(this, AttachmentsApi);

        var _this = _possibleConstructorReturn(this, _BaseApi.apply(this, arguments));

        _this.allowedAuth = ['jwt'];

        _this.keys = new (Function.prototype.bind.apply(_appKeys.AppKeysApi, [null].concat(Array.prototype.slice.call(arguments))))();
        return _this;
    }

    return AttachmentsApi;
}(_base.BaseApi);

Object.assign(AttachmentsApi.prototype, {
    /**
     * Create an attachment
     * @memberof AttachmentsApi.prototype
     * @method create
     * @param  {string} access
     * @param  {Readable} source
     * @return {APIResponse}
     */
    create: (0, _smoochMethod2.default)({
        params: ['source', 'access'],
        path: '/attachments',
        func: function create(url, access, source) {
            var data = new FormData();
            data.append('source', source);

            url += '?access=' + access;

            return this.request('POST', url, data);
        }
    })
});