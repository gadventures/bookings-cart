'use strict';

exports.__esModule = true;
exports.Cart = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _reactLoading = require('react-loading');

var _reactLoading2 = _interopRequireDefault(_reactLoading);

var _constants = require('./constants');

var _trashIcon = require('./trashIcon');

var _trashIcon2 = _interopRequireDefault(_trashIcon);

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cartItem = function cartItem(_ref) {
    var booking = _ref.booking,
        bookingType = _ref.bookingType,
        handleDelete = _ref.handleDelete;
    return _react2.default.createElement(
        'div',
        { style: _styles.styles.itemOuter },
        _react2.default.createElement(
            'div',
            { style: _styles.styles.itemText },
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { href: booking.link, style: _styles.styles.itemName },
                    booking.trip_name,
                    ' '
                )
            ),
            _react2.default.createElement(
                'div',
                { style: _styles.styles.itemMsg },
                booking.departure_msg
            )
        ),
        bookingType !== 'confirmed' && _react2.default.createElement(
            'div',
            { style: _styles.styles.itemTrashOuter, onClick: function onClick() {
                    return handleDelete({ bookingType: bookingType, bookingHash: booking.booking_hash });
                } },
            _react2.default.createElement(_trashIcon2.default, { fill: '#ddd', width: '25px', height: '25px' })
        )
    );
};

var CartItem = (0, _radium2.default)(cartItem);

var CartContents = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        bookings: state.bookings
    };
}, function (dispatch) {
    return {
        fetchBookings: function fetchBookings(payload) {
            return dispatch({ type: _constants.FETCH_CART.REQUEST, payload: payload });
        },
        handleDelete: function handleDelete(payload) {
            return dispatch({ type: _constants.REMOVE_CART_ITEM.REQUEST, payload: payload });
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
            return _react2.default.createElement(
                'h4',
                { style: _extends({}, _styles.styles.header, { padding: 0 }) },
                _react2.default.createElement(
                    'span',
                    { style: { padding: '15px 40px 15px 15px' } },
                    'Loading'
                ),
                _react2.default.createElement(_reactLoading2.default, { height: 35, width: 35, type: 'bubbles', color: '#000' })
            );
        }

        var in_progress = bookings.in_progress,
            optioned = bookings.optioned,
            confirmed = bookings.confirmed;

        if (!(!!in_progress.items.length || !!optioned.items.length || !!confirmed.items.length)) {
            return _react2.default.createElement(
                'h4',
                { style: _styles.styles.header },
                'No bookings found'
            );
        }

        return _react2.default.createElement(
            'div',
            null,
            !!(in_progress.items || []).length && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h4',
                    { style: _styles.styles.header },
                    in_progress.header_title
                ),
                _react2.default.createElement(
                    'div',
                    { style: { flex: 1 } },
                    in_progress.items.map(function (b) {
                        return _react2.default.createElement(CartItem, {
                            booking: b,
                            key: b.booking_id,
                            bookingType: 'in_progress',
                            handleDelete: handleDelete
                        });
                    })
                )
            ),
            !!(optioned.items || []).length && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h4',
                    { style: _styles.styles.header },
                    optioned.header_title
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    optioned.items.map(function (b) {
                        return _react2.default.createElement(CartItem, {
                            booking: b,
                            key: b.booking_id,
                            bookingType: 'optioned',
                            handleDelete: handleDelete
                        });
                    })
                )
            ),
            !!(confirmed.items || []).length && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h4',
                    { style: _styles.styles.header },
                    confirmed.header_title
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    confirmed.items.map(function (b) {
                        return _react2.default.createElement(CartItem, {
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
}(_react2.default.Component)) || _class);

var Cart = exports.Cart = function (_React$Component2) {
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

        return _react2.default.createElement(
            'div',
            { style: this.props.cartStyle,
                className: this.props.className || '',
                ref: function ref(node) {
                    return _this3.cartRef = node;
                } },
            _react2.default.createElement(CartContents, null)
        );
    };

    return Cart;
}(_react2.default.Component);