import { combineReducers } from 'redux';
import { MUTATE_MONSTERS } from './actions';

function monsters (prev = [], action) {
    switch (action.type) {
        case MUTATE_MONSTERS:
            return action.monsters;
        default:
            return prev;
    }
}

export default combineReducers({
    monsters
});
