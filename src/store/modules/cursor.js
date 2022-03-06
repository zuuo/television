const cursor = {
    state: {
        lastPart: '',
        part: '',
        freezeItem: false,
    },
    mutations: {
        SET_PART: (state, part) => {
            // console.log(part);
            state.lastPart = state.part
            state.part = part
        },
        FREEZE_ITEM: (state, boo) => {
            state.freezeItem = boo
        }
    },
    actions: {

    }
}

export default cursor