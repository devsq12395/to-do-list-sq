const statusUpdater = (state = { sharedStatus: '' }, action) => {
	switch (action.type) {
		case 'UPDATE_STATUS':
			return { sharedStatus: action.payload };
		default:
			return state;
	}
};

export default statusUpdater;