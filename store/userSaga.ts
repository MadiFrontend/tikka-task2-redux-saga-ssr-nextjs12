import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./userSlice";

async function fetchUsersApi() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
}

function* fetchUsersSaga() {
  try {
    const users: Array<{ id: number; name: string }> = yield call(
      fetchUsersApi
    );
    yield put(fetchUsersSuccess(users));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersStart.type, fetchUsersSaga);
}
