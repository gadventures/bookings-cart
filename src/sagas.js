import {put, takeLatest, takeEvery} from 'redux-saga/effects'

import {FETCH_CART, REMOVE_CART_ITEM} from './constants'
import {API} from './api'

function* fetchCart() {
    try {
        yield put({type: FETCH_CART.LOADING})
        const resp = yield API.get({url: '/cart/bookings'})
        const payload = yield resp.json()
        yield put({type: FETCH_CART.SUCCESS, payload})
    } catch(err) {
        yield put({type: FETCH_CART.FAILURE, payload: err})
    }
}

function* removeItem({type, payload}) {
    try {
        const {bookingType, bookingHash} = payload
        const resp = yield API.delete({
            url: '/cart/bookings/',
            body: {booking_hash: bookingHash, booking_type: bookingType}
        })
        if (resp.status >= 200 && resp.status < 400) {
            yield put({type: REMOVE_CART_ITEM.SUCCESS, payload})
        } else {
            yield put({type: REMOVE_CART_ITEM.FAILURE, err: resp.data})
        }
    } catch(err) {
        yield put({type: REMOVE_CART_ITEM.FAILURE, err})
    }
}

function* cartSaga () {
    yield takeEvery(REMOVE_CART_ITEM.REQUEST, removeItem)
    yield takeLatest(FETCH_CART.REQUEST, fetchCart)
}

export {cartSaga}
