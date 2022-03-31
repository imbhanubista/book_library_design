import { USER_DATA } from "../constrants/constrants";

const initState ={}
export const reducer =(state=initState,action)=>{
switch(action.type){
    case USER_DATA:
        return action.payload;
        default:
            return state
}
}