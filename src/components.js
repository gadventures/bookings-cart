import React from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'

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
        {bookingType !== 'Confirmed' &&
                <div style={styles.itemTrashOuter} onClick={() =>
                    handleDelete({bookingType, bookingId: booking.booking_id})
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
export class Cart extends React.Component {
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
        const { cartStyle, bookings, handleDelete } = this.props
        if(!bookings) {
            return (
                <div style={cartStyle}>
                    <h4 style={styles.header}>Loading</h4>
                </div>
            )
        }
        const {in_progress, optioned, confirmed} = bookings
        if(!(!!in_progress.length || !!optioned.length || !!confirmed.length)) {
            return (
                <div style={cartStyle}>
                    <h4 style={styles.header}>No bookings found</h4>
                </div>
            )
        }
        return (
            <div style={cartStyle}>
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
