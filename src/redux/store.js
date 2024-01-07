
import { createStore } from 'redux';
import statusUpdater from './updater';

const store = createStore(statusUpdater);

export default store;