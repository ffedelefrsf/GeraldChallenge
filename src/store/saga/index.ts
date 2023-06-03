import { all, takeEvery } from 'redux-saga/effects';

import { A_TESTING_ACTION } from '../type';
import { testSagaFn } from '../saga/test';

export default function* watch() {
  yield all([takeEvery(A_TESTING_ACTION, testSagaFn)]);
}
