export const MUTATE_MONSTERS = 'MUTATE_MONSTERS';
export function mutateMonsters (monsters) {
    return {
        type: MUTATE_MONSTERS,
        monsters
    };
}

export function fetchMonsters () {
    return dispatch => {
        fetch('/public/monsters.json')
            .then(res => res.json())
            .then(data => {
                dispatch(mutateMonsters(data));
            });
    };
}
