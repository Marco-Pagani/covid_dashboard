//const bent = require('bent');
//const getJSON = bent('json');


var moment = require('moment');

var county = "Broward County"
var location = county.replace(' county', '');
location = location.replace(' parish', '');
location = location.replace(' Parish', '');
location = location.replace(' County', '');
console.log(county);
console.log(location);

var datetime = { "endDate": "2020-04-25T23:59:59-04:00", "startDate": "2020-04-19T00:00:00-04:00" };

var start_date = datetime.startDate.substring(0, 10) + "T00:00:00Z";
console.log(start_date);
start_date = moment(datetime.startDate).subtract(1, 'days').format().substring(0, 10) + "T00:00:00Z";
console.log(start_date);

