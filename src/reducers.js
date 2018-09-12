import { FETCH_CART, REMOVE_CART_ITEM } from './constants'

export const cartReducer = (bookings = null, {type, payload}) => {
    switch(type) {
        case FETCH_CART.SUCCESS:
            console.log(FETCH_CART.SUCCESS, {payload})
            return {
                ...payload
            }
        case REMOVE_CART_ITEM.SUCCESS:
            let {bookingHash, bookingType} = payload
            return {
                ...bookings,
                [bookingType]: bookings[bookingType].filter(x => x.booking_hash !== bookingHash)
            }
        default:
            return bookings
    }
}
