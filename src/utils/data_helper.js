import states from '../data/states.json'

export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function state_id_to_name(id) {
    return states[id].name
}