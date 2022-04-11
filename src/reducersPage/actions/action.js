import { USER_DATA } from "../constrants/constrants";

export const actionReducer = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};
