export const initialstate = null;
export const reducer = (state, action) => {
    if (action.type === "USER") {
        state = action.payload;
    }
    console.log("now login state is : ", state);
    return state;
}