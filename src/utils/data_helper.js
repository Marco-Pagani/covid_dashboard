import states from '../data/states.json'

export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function state_id_to_name(id) {
    return states[id].name
}

export function state_id_to_abbr(id) {
    return states[id].abbreviation.toLowerCase()
}