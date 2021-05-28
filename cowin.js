var data1 = [];

var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
console.log(month);

var pincodes = [
  282001, 282002, 282003, 282004, 282005, 282006, 282007, 283123, 283111,
  283104, 283105, 283202, 283101,
];

function vaccineFetch(dd) {
  fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=622&date=${dd}-0${month}-2021`
  )
    .then(res => res.json())
    .then(data => sort1(data['centers']));

  function sort1(data) {
    var data3 = [];
    data.forEach(element => {
      element['sessions'].forEach(session => {
        if (session['min_age_limit'] == 18 && session['available_capacity']) {
          data3.push([element['name'], session]);
          // alert('found');
          console.log(element);
          console.log(session);
        }
      });
    });

    data1.push(data3);
    console.log(data1);
  }
}

vaccineFetch(day);
vaccineFetch(day + 7);
data1 = [];

setInterval(() => {
  vaccineFetch(day);
  vaccineFetch(day + 7);
  data1 = [];
}, 300000);
