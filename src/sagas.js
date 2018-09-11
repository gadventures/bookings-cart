import {takeEvery} from 'redux-saga'
import {put} from 'redux-saga/effects'

import {FETCH_CART, REMOVE_CART_ITEM} from './constants'
import {API} from './api'

function* removeItem({type, payload}) {
    try {
        const {bookingType, bookingId} = payload
        /*yield API.post({
            url: 'http://localhost:3001/profiles/bookings/remove-item',
            body: {booking_id: bookingId, booking_type: bookingType}
        })*/
        yield put({type: REMOVE_CART_ITEM.SUCCESS, payload})
    } catch(err) {
        console.log('error deleting cart item', err)
        yield put({type: REMOVE_CART_ITEM.FAILURE, err})
    }
}

function* fetchCart() {
    try {
        const resp = yield API.get({url: 'http://localhost:3001/bookings'})
        const payload = yield resp.json()
        yield put({type: FETCH_CART.SUCCESS, payload})
    } catch(err) {
        yield put({type: FETCH_CART.FAILURE, payload: err})
    }
}

function* cartSaga () {
    yield takeEvery(REMOVE_CART_ITEM.REQUEST, removeItem)
    yield takeEvery(FETCH_CART.REQUEST, fetchCart)
}

export {cartSaga}
