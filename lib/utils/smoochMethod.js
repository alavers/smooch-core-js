'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = smoochMethod;
function smoochMethod(_ref) {
    var params = _ref.params,
        _ref$optional = _ref.optional,
        optional = _ref$optional === undefined ? [] : _ref$optional,
        path = _ref.path,
        method = _ref.method,
        func = _ref.func;

    if (!params || !path) {
        throw new Error('params and path are required');
    }

    if (!method && !func) {
        throw new Error('at least one of func or method are required');
    }

    if (method && func) {
        throw new Error('func and method are mutually exclusive');
    }

    var methodName = func ? func.name : method + ' ' + path;

    return function () {
        var args = void 0;
        var allParams = void 0;
        var renderedPath = path;
        if (this.requireAppId) {
            allParams = ['appId'].concat(params);
            renderedPath = '/apps/:appId' + path;
        } else {
            allParams = [].concat(params);
        }

        var requiredParams = allParams.filter(function (p) {
            return !optional.includes(p);
        });

        if (_typeof(arguments[0]) === 'object' && arguments.length === 1) {
            var paramObject = arguments[0];
            if (allParams.includes('props') && _typeof(paramObject.props) !== 'object') {
                // func accepts a single object arg called props
                // and it's not wrapped inside any outer object
                args = [paramObject];
            } else {
                // Map the object params into an array of args
                args = [];
                allParams.forEach(function (param) {
                    var value = paramObject[param];
                    var isRequired = requiredParams.includes(param);
                    if (!value && isRequired) {
                        throw new Error(methodName + ': missing required argument: ' + param);
                    }

                    if (value) {
                        args.push(value);
                    }
                });
            }
        } else {
            args = [].concat(Array.prototype.slice.call(arguments));
        }

        if (args.length < requiredParams.length) {
            throw new Error(methodName + ': incorrect number of parameters (' + args.length + '). Expected at least ' + requiredParams.length);
        }

        if (args.length > allParams.length) {
            throw new Error(methodName + ': incorrect number of parameters (' + args.length + '). Expected at most ' + params.length);
        }

        allParams.forEach(function (param, i) {
            if (args[i] && renderedPath.includes(':' + param)) {
                renderedPath = renderedPath.replace(':' + param, args[i]);
            }
        });

        var url = this.serviceUrl + renderedPath;
        if (method) {
            if (['POST', 'PUT'].includes(method)) {
                // Payload object must always specified in the last arg
                return this.request(method, url, args.pop());
            } else {
                return this.request(method, url);
            }
        }

        if (this.requireAppId) {
            args[0] = url;
        } else {
            args.unshift(url);
        }
        return func.apply(this, args);
    };
}