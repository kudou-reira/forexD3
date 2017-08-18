var moment = require('moment');

const enumerateDays = (startDate, endDate) => {
	var now = moment(startDate);
	console.log("helper function", now);
	console.log("helper function", endDate);
	var dates = [];

    while (now.isBefore(endDate) || now.isSame(endDate)) {
        dates.push(now.format('YYYY-MM-DD'));
        now.add('days', 1);
    }

    console.log("helper function", dates);

    return dates;
}

const calculateBetween = (a, b) => {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	
	var firstDate = new Date(a);
	var secondDate = new Date(b);

	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

	return diffDays;
}



module.exports = {
	enumerateDays: enumerateDays,
	calculateBetween: calculateBetween
}