function socketReducer(state, action) {
    switch (action.type) {
        case "COMPLETE":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, complete: !todo.complete };
                } else {
                    return todo;
                }
            });
        case "ADD":
            state.push({ id: 1, title: 'Todo 1', complete: false })
            return state
        default:
            return state;
    }
}

export default socketReducer