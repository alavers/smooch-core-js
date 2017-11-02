'use strict';

var _apps = require('./api/apps');

var _menu = require('./api/menu');

var _stripe = require('./api/stripe');

var _appUsers = require('./api/appUsers');

var _disabled = require('./api/disabled');

var _webhooks = require('./api/webhooks');

var _attachments = require('./api/attachments');

var _integrations = require('./api/integrations');

var _conversations = require('./api/conversations');

var _auth = require('./utils/auth');

var _jwt = require('./utils/jwt');

var jwt = _interopRequireWildcard(_jwt);

var _jsonwebtoken = require('jsonwebtoken');

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SERVICE_URL = 'https://api.smooch.io/v1';

if (!global.FormData) {
    global.FormData = require('form-data');
}

var Smooch = function Smooch() {
    var auth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Smooch);

    var _options$serviceUrl = options.serviceUrl,
        serviceUrl = _options$serviceUrl === undefined ? SERVICE_URL : _options$serviceUrl,
        _options$headers = options.headers,
        headers = _options$headers === undefined ? {} : _options$headers,
        httpAgent = options.httpAgent;


    if (auth.keyId || auth.secret) {
        if (!auth.scope) {
            throw new Error('Invalid auth: missing scope.');
        }

        if (!auth.keyId) {
            throw new Error('Invalid auth: missing keyId.');
        }

        if (!auth.secret) {
            throw new Error('Invalid auth: missing secret.');
        }
    }

    if (auth.keyId && auth.secret && auth.scope) {
        var jwtBody = {
            scope: auth.scope
        };

        if (auth.userId) {
            jwtBody.userId = auth.userId;
        }

        auth = {
            jwt: jwt.generate(jwtBody, auth.secret, auth.keyId),
            scope: auth.scope
        };
    }

    if (auth.jwt) {
        var decoded = (0, _jsonwebtoken.decode)(auth.jwt);
        if (!decoded) {
            throw new Error('jwt is malformed.');
        }
        if (!decoded.scope) {
            throw new Error('jwt has no scope defined.');
        }
        auth.scope = decoded.scope;
    }

    this.headers = headers;
    this.httpAgent = httpAgent;
    this.serviceUrl = serviceUrl;
    this.VERSION = _package2.default.version;
    this.scope = auth.scope || 'appUser';
    this.authHeaders = (0, _auth.getAuthenticationHeaders)(auth);

    this.utils = {};

    var isAccountScope = this.scope === 'account';

    this.menu = new _menu.MenuApi(this.serviceUrl, this.authHeaders, this.headers, isAccountScope, this.httpAgent);
    this.webhooks = new _webhooks.WebhooksApi(this.serviceUrl, this.authHeaders, this.headers, isAccountScope, this.httpAgent);
    this.attachments = new _attachments.AttachmentsApi(this.serviceUrl, this.authHeaders, this.headers, isAccountScope, this.httpAgent);
    this.appUsers = new _appUsers.AppUsersApi(this.serviceUrl, this.authHeaders, this.headers, isAccountScope, this.httpAgent);
    this.conversations = new _conversations.ConversationsApi(this.serviceUrl, this.authHeaders, isAccountScope, this.headers, this.httpAgent);
    this.stripe = new _stripe.StripeApi(this.serviceUrl, this.authHeaders, this.headers, isAccountScope, this.httpAgent);

    if (this.scope === 'account') {
        this.integrations = new _integrations.IntegrationsApi(this.serviceUrl, this.authHeaders, this.headers, true, this.httpAgent);
        this.apps = new _apps.AppsApi(this.serviceUrl, this.authHeaders, this.headers, true, this.httpAgent);
        this.appUsers = new _appUsers.AppUsersApi(this.serviceUrl, this.authHeaders, this.headers, true, this.httpAgent);
        this.conversations = new _conversations.ConversationsApi(this.serviceUrl, this.authHeaders, this.headers, true, this.httpAgent);
        this.stripe = new _stripe.StripeApi(this.serviceUrl, this.authHeaders, this.headers, true, this.httpAgent);
    } else {
        var disabled = new _disabled.DisabledApi('This API requires account level scope');
        this.integrations = this.apps = disabled;
    }

    Object.assign(this.utils, {
        jwt: jwt
    });
};

module.exports = Smooch;