const selTaskUpdater = (state = { sharedSelTask: {} }, action) => {
	switch (action.type) {
		case 'UPDATE_SEL_TASK':
			return { sharedSelTask: action.payload };
		default:
			return state;
	}
};

export default selTaskUpdater;