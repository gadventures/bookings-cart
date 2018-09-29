import { FETCH_CART, REMOVE_CART_ITEM } from './constants'

export const cartReducer = (bookings = null, {type, payload}) => {
    switch(type) {

        case FETCH_CART.LOADING:
            return {loading: true}

        case FETCH_CART.SUCCESS:
            return { ...payload }

        case REMOVE_CART_ITEM.SUCCESS:
            let {bookingHash, bookingType} = payload
            let subset = bookings[bookingType]

            return {
                ...bookings,
                [bookingType]: {
                    ...subset,
                    items: bookings[bookingType].items.filter(x => x.booking_hash !== bookingHash)
                }
            }
        default:
            return bookings
    }
}
