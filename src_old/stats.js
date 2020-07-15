var moment = require('moment');
var data = require('jhucsse.covid');

class Stats {
    static relative(_from) {
        var from = moment().subtract(_from, 'days').format('M/DD/YY');
        var to = moment().format('M/DD/YY');
        return [from, to];
    }
}
module.exports = Stats;