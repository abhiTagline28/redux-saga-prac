import * as types from "./actionTypes";
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import {
  loadUsersSuccess,
  loadUsersError,
  createUsersSuccess,
  createUsersError,
  deleteUsersSuccess,
  deleteUsersError,
  updateUsersSuccess,
  updateUsersError,
} from "./actions";
import {
  loadUsersApi,
  createUsersApi,
  deleteUsersApi,
  updateUsersApi,
} from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (e) {
    yield put(loadUsersError(e.response.data));
  }
}

function* onCreateUsersStartAsync({ payload }) {
  try {
    const response = yield call(createUsersApi, payload);
    if (response.status === 201) {
      yield put(createUsersSuccess(response.data));
    }
  } catch (e) {
    yield put(createUsersError(e.response.data));
  }
}

function* onDeleteUsersStartAsync(userId) {
  try {
    const response = yield call(deleteUsersApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUsersSuccess(userId));
    }
  } catch (e) {
    yield put(deleteUsersError(e.response.data));
  }
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USERS_START);
    yield call(onDeleteUsersStartAsync, userId);
  }
}

function* onUpdateUsersStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUsersApi, id, formValue);
    if (response.status === 200) {
      yield delay(500);
      yield put(updateUsersSuccess());
    }
  } catch (err) {
    yield put(updateUsersError(err.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUsers() {
  yield takeLatest(types.CREATE_USERS_START, onCreateUsersStartAsync);
}

function* onUpdateUsers() {
  yield takeLatest(types.UPDATE_USERS_START, onUpdateUsersStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUsers),
  fork(onDeleteUser),
  fork(onUpdateUsers),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
