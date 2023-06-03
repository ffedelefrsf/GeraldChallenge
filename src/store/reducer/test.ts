import createReducer from './util';
import { A_TESTING_ACTION } from '../type';

const initialState: any = {
  sth: '',
};

export const testReducer = createReducer(initialState, {
  [A_TESTING_ACTION](state: any, action: any) {
    console.log('reducer called');
    return { ...state, sth: action.payload };
  },
});
