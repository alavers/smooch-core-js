'use strict';

exports.__esModule = true;
exports.ConversationsApi = undefined;

var _base = require('./base');

var _smoochMethod = require('../utils/smoochMethod');

var _smoochMethod2 = _interopRequireDefault(_smoochMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @typedef Message
 */

/**
 * @constructor
 * @name ConversationsApi
 * @extends BaseApi
 */
var ConversationsApi = exports.ConversationsApi = function (_BaseApi) {
    _inherits(ConversationsApi, _BaseApi);

    function ConversationsApi() {
        _classCallCheck(this, ConversationsApi);

        return _possibleConstructorReturn(this, _BaseApi.apply(this, arguments));
    }

    return ConversationsApi;
}(_base.BaseApi);

Object.assign(ConversationsApi.prototype, {
    /**
     * Fetch an app user's conversation
     * @memberof ConversationsApi.prototype
     * @method get
     * @param  {string} userId - a user id
     * @return {APIResponse}
     */
    get: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId/conversation',
        method: 'GET'
    }),

    /**
     * Post back to an action button
     * @memberof ConversationsApi.prototype
     * @method postPostback
     * @param  {string} userId - a user id
     * @param  {string} actionId - an action id
     * @return {APIResponse}
     */
    postPostback: (0, _smoochMethod2.default)({
        params: ['userId', 'actionId'],
        path: '/appusers/:userId/conversation/postback',
        func: function postPostback(url, userId, actionId) {
            if (!actionId) {
                return Promise.reject(new Error('Must provide an action id.'));
            }

            var body = {
                actionId: actionId
            };

            return this.request('POST', url, body);
        }
    }),

    /**
     * Reset the unread count of an existing user's conversation
     * @memberof ConversationsApi.prototype
     * @method resetUnreadCount
     * @param  {string} userId - a user id
     * @return {APIResponse}
     */
    resetUnreadCount: (0, _smoochMethod2.default)({
        params: ['userId'],
        path: '/appusers/:userId/conversation/read',
        func: function resetUnreadCount(url) {
            return this.request('POST', url);
        }
    }),

    /**
     * @memberof ConversationsApi.prototype
     * @deprecated Use appUsers.sendMessage() instead.
     */
    sendMessage: function sendMessage() {
        return Promise.reject(new Error('This endpoint is deprecated. Please use appUsers.sendMessage() instead.'));
    },

    /**
     * @memberof ConversationsApi.prototype
     * @deprecated Use appUsers.uploadImage() instead.
     */
    uploadImage: function uploadImage() {
        return Promise.reject(new Error('This endpoint is deprecated. Please use appUsers.uploadImage() instead.'));
    }
});