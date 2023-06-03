import { all, fork, takeEvery } from 'redux-saga/effects';
import { A_TESTING_ACTION } from '../type';

export function* testSagaFn(_action: any) {
  console.log('triggered saga');
}

export function* forgotPasswordWatcher() {
  yield takeEvery(A_TESTING_ACTION, testSagaFn);
}

function* testSaga() {
  yield all([fork(forgotPasswordWatcher)]);
}

export default testSaga;
