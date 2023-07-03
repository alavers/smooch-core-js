'use strict';

exports.__esModule = true;
exports.AppUsersApi = undefined;

var _base = require('./base');

var _appUsersStripe = require('./appUsersStripe');

var _appUsersViber = require('./appUsersViber');

var _appUsersWeChat = require('./appUsersWeChat');

var _smoochMethod = require('../utils/smoochMethod');

var _smoochMethod2 = _interopRequireDefault(_smoochMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constructor
 * @name AppUsersApi
 * @extends BaseApi
 */
var AppUsersApi = exports.AppUsersApi = function (_BaseApi) {
    _inherits(AppUsersApi, _BaseApi);

    function AppUsersApi() {
        _classCallCheck(this, AppUsersApi);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _BaseApi.call.apply(_BaseApi, [this].concat(args)));

        _this.stripe = new (Function.prototype.bind.apply(_appUsersStripe.AppUsersStripeApi, [null].concat(args)))();
        _this.viber = new (Function.prototype.bind.apply(_appUsersViber.AppUsersViberApi, [null].concat(args)))();
        _this.wechat = new (Function.prototype.bind.apply(_appUsersWeChat.AppUsersWeChatApi, [null].concat(args)))();
        return _this;
    }

    return AppUsersApi;
}(_base.BaseApi);

Object.assign(AppUsersApi.prototype, {
    /**
     * Create
     * @memberof AppUsersApi.prototype
     * @method create
     * @param  {string} userId
     * @param  {object=} props
     * @return {APIResponse}
     */
    create: (0, _smoochMethod2.default)({
        params: ['userId', 'props'],
        optional: ['props'],
        path: '/appusers',
        func: function create(url, userId) {
            var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!userId || !userId.trim()) {
                return Promise.reject(new Error('Must provide a userId.'));
            }

            var payload = Object.assign({
                userId: userId
            }, props);

            if (props.signedUpAt && !(props.signedUpAt instanceof Date)) {
                return Promise.reject(new Error('signedUpAt must be a date.'));
            }

            // this endpoint only accepts JWT auth with app scope
            return this.request('POST', url, payload, {
                allowedAuth: ['jwt']
            });
        }
    }),

    /**
     * Fetch an app user
     * @memberof AppUsersApi.prototype
     * @method get
     * @param  {string} userId - a user id
     * @return {APIResponse}
     */
    get: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId',
        method: 'GET'
    }),

    /**
     * Update an app user
     * @memberof AppUsersApi.prototype
     * @method update
     * @param  {string} userId - a user id
     * @param  {object} props  - the props to update
     * @return {APIResponse}
     */
    update: (0, _smoochMethod2.default)({
        params: ['userId', 'props'],
        path: '/appusers/:userId',
        method: 'PUT'
    }),

    /**
     * Retrieves all of the app user’s channel entity IDs
     * @memberof AppUsersApi.prototype
     * @method getChannels
     * @param  {string} userId - a user id
     * @return {APIResponse}
     */
    getChannels: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId/channels',
        method: 'GET'
    }),

    /**
     * Retrieves all of the app user's business system IDs
     * @memberof AppUsersApi.prototype
     * @method getBusinessSystems
     * @param {string} userId - a user id
     * @return {APIResponse}
     */
    getBusinessSystems: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId/businesssystems',
        method: 'GET'
    }),

    /**
     * Links the specified channel to a user
     * @memberof AppUsersApi.prototype
     * @method linkChannel
     * @param  {string} userId - a user id
     * @param  {object} data   - the data object
     * @return {APIResponse}
     */
    linkChannel: (0, _smoochMethod2.default)({
        params: ['userId', 'data'],
        path: '/appusers/:userId/channels',
        method: 'POST'
    }),

    /**
     * Unlinks the specified channel
     * @memberof AppUsersApi.prototype
     * @method unlinkChannel
     * @param  {string} userId  - a user id
     * @param  {string} channel - the channel to unlink
     * @return {APIResponse}
     */
    unlinkChannel: (0, _smoochMethod2.default)({
        params: ['userId', 'channel'],
        path: '/appusers/:userId/channels/:channel',
        method: 'DELETE'
    }),

    /**
     * Pings linked channel
     * @memberof AppUsersApi.prototype
     * @method pingChannel
     * @param  {string} userId  - a user id
     * @param  {string} channel - the channel to ping
     * @return {APIResponse}
     */
    pingChannel: (0, _smoochMethod2.default)({
        params: ['userId', 'channel'],
        path: '/appusers/:userId/integrations/:channel/ping',
        func: function pingChannel(url) {
            return this.request('POST', url);
        }
    }),

    /**
     * Fetch app user's messages
     * @memberof AppUsersApi.prototype
     * @method getMessages
     * @param  {string} userId - a user id
     * @param  {object=} query - paging parameters (before, after)
     * @return {APIResponse}
     */
    getMessages: (0, _smoochMethod2.default)({
        params: ['userId', 'query'],
        optional: ['query'],
        path: '/appusers/:userId/messages',
        func: function getMessages(url, userId) {
            var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var before = query.before,
                after = query.after;

            if (before && after) {
                return Promise.reject(new Error('Parameters "before" and "after" are mutually exclusive. You must provide one or the other.'));
            }

            var q = before ? {
                before: before
            } : after ? {
                after: after
            } : undefined;
            return this.request('GET', url, q);
        }
    }),

    /**
     * Send a message to an app user's conversation
     * @memberof AppUsersApi.prototype
     * @method sendMessage
     * @param  {string} userId   - a user id
     * @param  {Message} message - the message to be sent
     * @return {APIResponse}
     */
    sendMessage: (0, _smoochMethod2.default)({
        params: ['userId', 'message'],
        path: '/appusers/:userId/messages',
        method: 'POST'
    }),

    /**
     * Send an image to an app user's conversation
     * @memberof AppUsersApi.prototype
     * @method uploadImage
     * @param  {string} userId   - a user id
     * @param  {Readable} source - source image readable stream
     * @param  {Message=} message - the message to be sent
     * @return {APIResponse}
     */
    uploadImage: (0, _smoochMethod2.default)({
        params: ['userId', 'source', 'message'],
        optional: ['message'],
        path: '/appusers/:userId/images',
        func: function uploadImage(url, userId, source) {
            var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var data = new FormData();
            data.append('source', source);

            Object.keys(message).forEach(function (key) {
                data.append(key, message[key]);
            });

            return this.request('POST', url, data);
        }
    }),

    /**
     * Deletes an appUser's message history
     * @memberof AppUsersApi.prototype
     * @method deleteMessages
     * @param  {string} userId    - a user id
     * @return {APIResponse}
     */
    deleteMessages: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId/messages',
        func: function deleteMessages(url, userId) {
            if (!userId || !userId.trim()) {
                return Promise.reject(new Error('Must provide a userId.'));
            }

            // this endpoint only accepts JWT auth with app scope
            return this.request('DELETE', url, {}, {
                allowedAuth: ['jwt']
            });
        }
    }),

    /**
     * Sets or resets the appMaker's typing indicator
     * @memberof AppUsersApi.prototype
     * @method typingActivity
     * @param  {string} userId    - a user id
     * @param  {object=} activityProps  - properties as defined in http://docs.smooch.io/rest
     * @return {APIResponse}
     */
    typingActivity: (0, _smoochMethod2.default)({
        params: ['userId', 'activityProps'],
        path: '/appusers/:userId/conversation/activity',
        method: 'POST'
    }),

    /**
     * Deletes an appUser's profile
     * @memberof AppUsersApi.prototype
     * @method deleteProfile
     * @param  {string} userId    - a user id
     * @return {APIResponse}
     */
    deleteProfile: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId/profile',
        func: function deleteProfile(url, userId) {
            if (!userId || !userId.trim()) {
                return Promise.reject(new Error('Must provide a userId.'));
            }

            // this endpoint only accepts JWT auth
            return this.request('DELETE', url, {}, {
                allowedAuth: ['jwt']
            });
        }
    }),

    /**
     * Initiates a channel tranfser request in order to link a new channel to the user's conversation
     * @memberof AppUsersApi.prototype
     * @method transferRequest
     * @param  {object} channel - the channel criteria, eg { type: 'messenger' }
     * @return {APIResponse}
     */
    transferRequest: (0, _smoochMethod2.default)({
        params: ['userId', 'channel'],
        path: '/appusers/:userId/transferrequest',
        func: function transferRequest(url, userId, channel) {
            return this.request('GET', url, {
                type: channel.type
            });
        }
    }),

    /**
     * Get an auth code for facilitating a channel transfer
     * @memberof AppUsersApi.prototype
     * @method getAuthCode
     * @return {APIResponse}
     */
    getAuthCode: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId/authcode',
        method: 'GET'
    })
});