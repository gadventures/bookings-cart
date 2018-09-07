import React from 'react'
import {connect} from 'react-redux'

import {FETCH_CART, REMOVE_CART_ITEM} from './constants'
import {styles} from './styles'

const CartItem = ({booking, bookingType, handleDelete}) => (
    <div style={styles.itemOuter}>
        <div style={styles.itemText}>
            <a href={booking.link}>
                <span style={styles.itemName}>{booking.trip_name}</span>
                <span style={styles.itemMsg}>{booking.departure_msg}</span>
            </a>
        </div>
        {bookingType !== 'Confirmed' &&
            <div>
                <i className='fa fa-trash'
                    onClick={() => handleDelete({
                        bookingType,
                        bookingId: booking.booking_id
                    })}
                >delete</i>
            </div>
        }
    </div>
)

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
        const {
            cartStyle,
            bookings,
            handleDelete
        } = this.props

        if(!bookings) {
            return (<div>Loading</div>)
        }
        const {in_progress, optioned, confirmed} = bookings
        return (
            <div style={cartStyle}>
                {!!(in_progress || []).length &&
                    <div>
                        <h4 style={styles.header}>Booked Trips</h4>
                        <div>
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
                        <h4 style={styles.header}> In Progress </h4>
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
                        <h4> Awaiting Confirmation </h4>
                        <div style={styles.header}>
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
