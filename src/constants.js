const prefix = '@@CART/'

export const FETCH_CART = {
    'REQUEST': prefix + 'FETCH_REQUEST',
    'SUCCESS': prefix + 'FETCH_SUCCESS',
    'FAILURE': prefix + 'FETCH_FAILURE'
}

export const REMOVE_CART_ITEM = {
    'REQUEST': prefix + 'REMOVE_ITEM_REQUEST',
    'SUCCESS': prefix + 'REMOVE_ITEM_SUCCESS',
    'FAILURE': prefix + 'REMOVE_ITEM_FAILURE'
}
