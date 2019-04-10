import {take, call, fork, select, put, all} from 'redux-saga/effects'
import * as Actions from '../action/content'
import * as API from '../api/content'

export function* getContentList() {
    while (true) {
        const action = yield take(Actions.GET_CONNENT)
        yield call(API.getContentList,action)
    }
}


export default function*() {
    yield all([
        fork(getContentList)
    ])
}
