
import { createStore } from 'redux';
import selTaskUpdater from './updater';

const store = createStore(selTaskUpdater);

export default store;