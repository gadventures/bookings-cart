var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { FETCH_CART, REMOVE_CART_ITEM } from './constants';

export var cartReducer = function cartReducer() {
    var _extends2;

    var bookings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {

        case FETCH_CART.LOADING:
            return { loading: true };

        case FETCH_CART.SUCCESS:
            return _extends({}, payload);

        case REMOVE_CART_ITEM.SUCCESS:
            var bookingHash = payload.bookingHash,
                bookingType = payload.bookingType;

            var subset = bookings[bookingType];

            return _extends({}, bookings, (_extends2 = {}, _extends2[bookingType] = _extends({}, subset, {
                items: bookings[bookingType].items.filter(function (x) {
                    return x.booking_hash !== bookingHash;
                })
            }), _extends2));
        default:
            return bookings;
    }
};