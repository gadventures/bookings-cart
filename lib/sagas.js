'use strict';

exports.__esModule = true;
exports.cartSaga = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _constants = require('./constants');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(fetchCart),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(removeItem),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(cartSaga);

function fetchCart() {
    var resp, payload;
    return _regenerator2.default.wrap(function fetchCart$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return (0, _effects.put)({ type: _constants.FETCH_CART.LOADING });

                case 3:
                    _context.next = 5;
                    return _api.API.get({ url: '/cart/bookings' });

                case 5:
                    resp = _context.sent;
                    _context.next = 8;
                    return resp.json();

                case 8:
                    payload = _context.sent;
                    _context.next = 11;
                    return (0, _effects.put)({ type: _constants.FETCH_CART.SUCCESS, payload: payload });

                case 11:
                    _context.next = 17;
                    break;

                case 13:
                    _context.prev = 13;
                    _context.t0 = _context['catch'](0);
                    _context.next = 17;
                    return (0, _effects.put)({ type: _constants.FETCH_CART.FAILURE, payload: _context.t0 });

                case 17:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this, [[0, 13]]);
}

function removeItem(_ref) {
    var type = _ref.type,
        payload = _ref.payload;
    var bookingType, bookingHash, resp;
    return _regenerator2.default.wrap(function removeItem$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    bookingType = payload.bookingType, bookingHash = payload.bookingHash;
                    _context2.next = 4;
                    return _api.API.delete({
                        url: '/cart/bookings/',
                        body: { booking_hash: bookingHash, booking_type: bookingType }
                    });

                case 4:
                    resp = _context2.sent;

                    if (!(resp.status >= 200 && resp.status < 400)) {
                        _context2.next = 10;
                        break;
                    }

                    _context2.next = 8;
                    return (0, _effects.put)({ type: _constants.REMOVE_CART_ITEM.SUCCESS, payload: payload });

                case 8:
                    _context2.next = 12;
                    break;

                case 10:
                    _context2.next = 12;
                    return (0, _effects.put)({ type: _constants.REMOVE_CART_ITEM.FAILURE, err: resp.data });

                case 12:
                    _context2.next = 18;
                    break;

                case 14:
                    _context2.prev = 14;
                    _context2.t0 = _context2['catch'](0);
                    _context2.next = 18;
                    return (0, _effects.put)({ type: _constants.REMOVE_CART_ITEM.FAILURE, err: _context2.t0 });

                case 18:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[0, 14]]);
}

function cartSaga() {
    return _regenerator2.default.wrap(function cartSaga$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return (0, _effects.takeEvery)(_constants.REMOVE_CART_ITEM.REQUEST, removeItem);

                case 2:
                    _context3.next = 4;
                    return (0, _effects.takeLatest)(_constants.FETCH_CART.REQUEST, fetchCart);

                case 4:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this);
}

exports.cartSaga = cartSaga;