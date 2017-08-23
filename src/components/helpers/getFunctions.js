// not using

// import axios from 'axios';
// import _ from 'lodash';

// export function getTimeData (base, date, callback){
	
// 	var temp;

// 	axios.get(`http://api.fixer.io/${date}?base=${base}`)
// 		.then((res) => {

// 			const temp  = res.data.rates;

// 	        var arr = Object.keys(temp).map(function (key) { 
// 	          return (
// 	              temp[key]
// 	          ); 
// 	        });

// 	        var arr2 = Object.keys(temp).map(function (key) { 
// 	          return (
// 	              key
// 	          ); 
// 	        });

// 	        var empty = [];

// 	        for(var i = 0; i < arr.length; i++){
// 	          empty[i] = {title: arr2[i], value: arr[i]};
// 	        }

// 	        _.remove(empty, {title: 'IDR'});
// 	        _.remove(empty, {title: 'KRW'});
// 	        _.remove(empty, {title: 'HUF'});

// 	        empty.sort((a, b) => {
// 		        var titleA = a.title.toLowerCase()
// 		        var titleB = b.title.toLowerCase()
// 		        if (titleA < titleB) //sort string ascending
// 		            return -1 
// 		        if (titleA > titleB)
// 		            return 1
// 		        return 0 //default return value (no sorting)
// 		    })

// 	        console.log(empty);
// 	       	temp = empty;
// 		})
// 	callback(temp);
// }

// module.exports = {
// 	getTimeData: getTimeData
// }