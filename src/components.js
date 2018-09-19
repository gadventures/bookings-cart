import React from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import ReactLoading from 'react-loading'

import {FETCH_CART, REMOVE_CART_ITEM} from './constants'
import TrashIcon from './trashIcon'
import {styles} from './styles'

const cartItem = ({booking, bookingType, handleDelete}) => (
    <div style={styles.itemOuter}>
        <div style={styles.itemText}>
            <div>
                <a href={booking.link} style={styles.itemName}>{booking.trip_name} </a>
            </div>
            <div style={styles.itemMsg}>{booking.departure_msg}</div>
        </div>
        {bookingType !== 'confirmed' &&
                <div style={styles.itemTrashOuter} onClick={() =>
                    handleDelete({bookingType, bookingHash: booking.booking_hash})
                }>
                <TrashIcon fill='#ddd' width='25px' height='25px' />
            </div>
        }
    </div>
)

const CartItem = Radium(cartItem)

@connect(state => ({
    bookings: state.bookings
}), dispatch => ({
    fetchBookings: payload => dispatch({type: FETCH_CART.REQUEST, payload}),
    handleDelete: payload => dispatch({type: REMOVE_CART_ITEM.REQUEST, payload})
}))
class CartContents extends React.Component {

    state = {pending: true}

    componentDidMount() {
        if(!this.props.bookings) {
            this.props.fetchBookings()
        }
    }

    componentDidUpdate() {
        if(this.props.bookings && this.state.pending) {
            this.setState({pending: false})
        }
    }

    render() {
        const { bookings, handleDelete } = this.props
        if(!bookings) {
            return <h4 style={styles.header}>
                    <span style={{padding: '10px 40px 10px 20px'}}>Loading</span>
                    <ReactLoading height={35} width={35} type='bubbles' color='#000' />
                </h4>
        }

        const {in_progress, optioned, confirmed} = bookings
        if(!(!!in_progress.length || !!optioned.length || !!confirmed.length)) {
            return <h4 style={styles.header}>No bookings found</h4>
        }

        return (
            <div>
            {!!(in_progress || []).length &&
                <div>
                    <h4 style={styles.header}>Resume Booking</h4>
                    <div style={{flex: 1}}>
                        {in_progress.map(b =>
                            <CartItem
                                booking={b}
                                key={b.booking_id}
                                bookingType='in_progress'
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            }
            {!!(optioned || []).length &&
                <div>
                    <h4 style={styles.header}> Bookings on Option </h4>
                    <div>
                        {optioned.map(b =>
                            <CartItem
                                booking={b}
                                key={b.booking_id}
                                bookingType='optioned'
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            }
            {!!(confirmed || []).length &&
                <div>
                    <h4 style={styles.header}> Confirmed Bookings </h4>
                    <div>
                        {confirmed.map(b =>
                            <CartItem
                                booking={b}
                                key={b.booking_id}
                                bookingType='confirmed'
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            }
            </div>
        )
    }
}

export class Cart extends React.Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this))
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
    handleClickOutside(event) {
        if (this.cartRef && !!this.props.clickOutsideToClose && !this.cartRef.contains(event.target)) {
            this.props.toggleCart()
        }
    }
    render() {
        return (
            <div style={this.props.cartStyle}
                className={this.props.className || ''}
                ref={node => this.cartRef = node}>
                <CartContents />
            </div>
        )
    }
}
