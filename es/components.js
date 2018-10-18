var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import ReactLoading from 'react-loading';

import { FETCH_CART, REMOVE_CART_ITEM } from './constants';
import TrashIcon from './trashIcon';
import { styles } from './styles';

var cartItem = function cartItem(_ref) {
    var booking = _ref.booking,
        bookingType = _ref.bookingType,
        handleDelete = _ref.handleDelete;
    return React.createElement(
        'div',
        { style: styles.itemOuter },
        React.createElement(
            'div',
            { style: styles.itemText },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { href: booking.link, style: styles.itemName },
                    booking.trip_name,
                    ' '
                )
            ),
            React.createElement(
                'div',
                { style: styles.itemMsg },
                booking.departure_msg
            )
        ),
        bookingType !== 'confirmed' && React.createElement(
            'div',
            { style: styles.itemTrashOuter, onClick: function onClick() {
                    return handleDelete({ bookingType: bookingType, bookingHash: booking.booking_hash });
                } },
            React.createElement(TrashIcon, { fill: '#ddd', width: '25px', height: '25px' })
        )
    );
};

var CartItem = Radium(cartItem);

var CartContents = (_dec = connect(function (state) {
    return {
        bookings: state.bookings
    };
}, function (dispatch) {
    return {
        fetchBookings: function fetchBookings(payload) {
            return dispatch({ type: FETCH_CART.REQUEST, payload: payload });
        },
        handleDelete: function handleDelete(payload) {
            return dispatch({ type: REMOVE_CART_ITEM.REQUEST, payload: payload });
        }
    };
}), _dec(_class = function (_React$Component) {
    _inherits(CartContents, _React$Component);

    function CartContents() {
        var _temp, _this, _ret;

        _classCallCheck(this, CartContents);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = { pending: true }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    CartContents.prototype.componentDidMount = function componentDidMount() {
        if (!this.props.bookings) {
            this.props.fetchBookings();
        }
    };

    CartContents.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.props.bookings && this.state.pending) {
            this.setState({ pending: false });
        }
    };

    CartContents.prototype.render = function render() {
        var _props = this.props,
            bookings = _props.bookings,
            handleDelete = _props.handleDelete;

        if (!bookings || bookings.loading) {
            return React.createElement(
                'h4',
                { style: _extends({}, styles.header, { padding: 0 }) },
                React.createElement(
                    'span',
                    { style: { padding: '15px 40px 15px 15px' } },
                    'Loading'
                ),
                React.createElement(ReactLoading, { height: 35, width: 35, type: 'bubbles', color: '#000' })
            );
        }

        var in_progress = bookings.in_progress,
            optioned = bookings.optioned,
            confirmed = bookings.confirmed;

        if (!(!!in_progress.items.length || !!optioned.items.length || !!confirmed.items.length)) {
            return React.createElement(
                'h4',
                { style: styles.header },
                'No bookings found'
            );
        }

        return React.createElement(
            'div',
            null,
            !!(in_progress.items || []).length && React.createElement(
                'div',
                null,
                React.createElement(
                    'h4',
                    { style: styles.header },
                    in_progress.header_title
                ),
                React.createElement(
                    'div',
                    { style: { flex: 1 } },
                    in_progress.items.map(function (b) {
                        return React.createElement(CartItem, {
                            booking: b,
                            key: b.booking_id,
                            bookingType: 'in_progress',
                            handleDelete: handleDelete
                        });
                    })
                )
            ),
            !!(optioned.items || []).length && React.createElement(
                'div',
                null,
                React.createElement(
                    'h4',
                    { style: styles.header },
                    optioned.header_title
                ),
                React.createElement(
                    'div',
                    null,
                    optioned.items.map(function (b) {
                        return React.createElement(CartItem, {
                            booking: b,
                            key: b.booking_id,
                            bookingType: 'optioned',
                            handleDelete: handleDelete
                        });
                    })
                )
            ),
            !!(confirmed.items || []).length && React.createElement(
                'div',
                null,
                React.createElement(
                    'h4',
                    { style: styles.header },
                    confirmed.header_title
                ),
                React.createElement(
                    'div',
                    null,
                    confirmed.items.map(function (b) {
                        return React.createElement(CartItem, {
                            booking: b,
                            key: b.booking_id,
                            bookingType: 'confirmed',
                            handleDelete: handleDelete
                        });
                    })
                )
            )
        );
    };

    return CartContents;
}(React.Component)) || _class);


export var Cart = function (_React$Component2) {
    _inherits(Cart, _React$Component2);

    function Cart() {
        _classCallCheck(this, Cart);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    Cart.prototype.componentDidMount = function componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    };

    Cart.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    Cart.prototype.handleClickOutside = function handleClickOutside(event) {
        if (this.cartRef && !!this.props.clickOutsideToClose && !this.cartRef.contains(event.target)) {
            this.props.toggleCart();
        }
    };

    Cart.prototype.render = function render() {
        var _this3 = this;

        return React.createElement(
            'div',
            { style: this.props.cartStyle,
                className: this.props.className || '',
                ref: function ref(node) {
                    return _this3.cartRef = node;
                } },
            React.createElement(CartContents, null)
        );
    };

    return Cart;
}(React.Component);