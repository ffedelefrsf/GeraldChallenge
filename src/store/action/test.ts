import { A_TESTING_ACTION } from '../type';

export function testAction(payload: string) {
  return {
    type: A_TESTING_ACTION,
    payload,
  };
}
