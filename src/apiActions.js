import {FETCH_CART} from './constants'
import {API} from './api'

export async function fetchCart(store) {
    const state = store.getState()
    if(store.bookings.items) { return state.bookings }
    store.dispatch({type: FETCH_CART.LOADING})
    const resp = await API.get({url: '/cart/bookings'})
    const payload = await resp.json()
    store.dispatch({type: FETCH_CART.SUCCESS, payload})
}
