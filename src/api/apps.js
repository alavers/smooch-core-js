import { BaseApi } from './base';
import { AppKeysApi } from './appKeys';
import smoochMethod from '../utils/smoochMethod';

/**
 * @constructor
 * @name AppsApi
 * @extends BaseApi
 */
export class AppsApi extends BaseApi {
    constructor() {
        super(...arguments);
        this.requireAppId = false;
        this.allowedAuth = ['jwt'];

        this.keys = new AppKeysApi(...arguments);
    }
}

Object.assign(AppsApi.prototype, {
    /**
     * Create a new app
     * @memberof AppsApi.prototype
     * @method create
     * @param  {string} name
     * @return {APIResponse}
     */
    create: smoochMethod({
        params: ['name', 'settings'],
        optional: ['settings'],
        path: '/apps',
        func: function create(url, name, settings) {
            if (typeof name !== 'string') {
                throw new Error('Invalid name parameter type, expected string');
            }

            const params = {
                name
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
    list: smoochMethod({
        params: ['limit', 'offset'],
        optional: ['limit', 'offset'],
        path: '/apps',
        func: function list(url, limit, offset) {
            const q = {};
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
    get: smoochMethod({
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
    update: smoochMethod({
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
    delete: smoochMethod({
        params: ['appId'],
        path: '/apps/:appId',
        method: 'DELETE'
    })
});
