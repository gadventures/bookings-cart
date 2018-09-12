import {takeEvery} from 'redux-saga'
import {put} from 'redux-saga/effects'

import {FETCH_CART, REMOVE_CART_ITEM} from './constants'
import {API} from './api'

function* removeItem({type, payload}) {
    try {
        const {bookingType, bookingHash} = payload
        const resp = yield API.post({
            url: '/profiles/remove-booking/',
            body: {booking_hash: bookingHash, booking_type: bookingType}
        })
        if (resp.status_code >= 200 && resp.status_code < 400) {
            yield put({type: REMOVE_CART_ITEM.SUCCESS, payload})
        } else {
            yield put({type: REMOVE_CART_ITEM.FAILURE, err: resp.data})
        }
    } catch(err) {
        yield put({type: REMOVE_CART_ITEM.FAILURE, err})
    }
}

function* fetchCart() {
    try {
        console.log('fetching from /profiles/bookings')
        const resp = yield API.get({url: '/profiles/bookings'})
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
