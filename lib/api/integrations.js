'use strict';

exports.__esModule = true;
exports.IntegrationsApi = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base');

var _integrationMenu = require('./integrationMenu');

var _smoochMethod = require('../utils/smoochMethod');

var _smoochMethod2 = _interopRequireDefault(_smoochMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function transformProps(val) {
    if (typeof val === 'string') {
        return {
            name: val,
            type: 'string'
        };
    }

    return val;
}

/**
 * Integration API properties
 * @typedef IntegrationProps
 */
function IntegrationType(required) {
    var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    //convert parameter string values to object
    this.required = required.map(transformProps);
    this.optional = optional.map(transformProps);
}

IntegrationType.prototype.validate = function (props) {
    var missing = this.required.filter(function (field) {
        return !props[field.name];
    });

    if (missing.length > 0) {
        var keys = missing.map(function (val) {
            return val.name;
        });

        throw new Error('integration has missing required keys: ' + keys.join(', '));
    }

    var both = [].concat(this.required, this.optional);
    var invalid = [];

    both.forEach(function (val) {
        if (props[val.name] !== undefined && _typeof(props[val.name]) !== val.type) {
            invalid.push(val);
        }
    });

    if (invalid.length > 0) {
        throw new Error('integration has invalid types: ' + JSON.stringify(invalid));
    }
};

var integrations = {
    messenger: new IntegrationType(['pageAccessToken', 'appId', 'appSecret']),
    twilio: new IntegrationType(['accountSid', 'authToken', 'phoneNumberSid']),
    telegram: new IntegrationType(['token']),
    line: new IntegrationType(['channelAccessToken', 'channelSecret']),
    viber: new IntegrationType(['token']),
    wechat: new IntegrationType(['appId', 'appSecret'], ['encodingAesKey']),
    twitter: new IntegrationType(['consumerKey', 'consumerSecret', 'accessTokenKey', 'accessTokenSecret']),
    mailgun: new IntegrationType(['apiKey', 'domain', 'incomingAddress']),
    fcm: new IntegrationType(['serverKey', 'senderId']),
    apn: new IntegrationType(['certificate'], [{
        name: 'autoUpdateBadge',
        type: 'boolean'
    }, 'password'])
};

/**
 * @constructor
 * @name IntegrationsApi
 * @extends BaseApi
 */

var IntegrationsApi = exports.IntegrationsApi = function (_BaseApi) {
    _inherits(IntegrationsApi, _BaseApi);

    function IntegrationsApi() {
        _classCallCheck(this, IntegrationsApi);

        var _this = _possibleConstructorReturn(this, _BaseApi.apply(this, arguments));

        _this.allowedAuth = ['jwt'];

        _this.menu = new (Function.prototype.bind.apply(_integrationMenu.IntegrationMenuApi, [null].concat(Array.prototype.slice.call(arguments))))();
        return _this;
    }

    IntegrationsApi.prototype.validateProps = function validateProps(props) {
        if (!props.type) {
            throw new Error('props missing required field type');
        }

        var integrationType = integrations[props.type];
        if (!integrationType) {
            throw new Error('Unrecognized type: ' + props.type);
        }

        integrationType.validate(props);
    };

    return IntegrationsApi;
}(_base.BaseApi);

Object.assign(IntegrationsApi.prototype, {
    /**
     * Create a new integration
     * @memberof IntegrationsApi.prototype
     * @method create
     * @param  {IntegrationProps} props
     * @return {APIResponse}
     */
    create: (0, _smoochMethod2.default)({
        params: ['props'],
        path: '/integrations',
        func: function create(url, props) {
            this.validateProps(props);
            return this.request('POST', url, props);
        }
    }),

    /**
     * Fetch the integrations currently configured
     * @memberof IntegrationsApi.prototype
     * @method list
     * @param  {(string|string[])=} type - Filter results to a specific integration type
     * @return {APIResponse}
     */
    list: (0, _smoochMethod2.default)({
        params: ['types'],
        optional: ['types'],
        path: '/integrations',
        func: function list(url, types) {
            var query = {};
            if (typeof types === 'string') {
                query.types = types;
            } else if (types && types.constructor === Array) {
                query.types = types.filter(function (t) {
                    return typeof t === 'string';
                }).join(',') || undefined;
            }

            if (query.types) {
                return this.request('GET', url, query);
            } else {
                return this.request('GET', url);
            }
        }
    }),

    /**
     * Retrieve an existing integration
     * @memberof IntegrationsApi.prototype
     * @method get
     * @param  {string} integrationId
     * @return {APIResponse}
     */
    get: (0, _smoochMethod2.default)({
        params: ['integrationId'],
        path: '/integrations/:integrationId',
        method: 'GET'
    }),

    /**
     * Delete an existing integration
     * @memberof IntegrationsApi.prototype
     * @method delete
     * @param  {string} integrationId
     * @return {APIResponse}
     */
    delete: (0, _smoochMethod2.default)({
        params: ['integrationId'],
        path: '/integrations/:integrationId',
        method: 'DELETE'
    })
});