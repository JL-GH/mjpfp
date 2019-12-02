const {db} = require('./db.js')
const {Task} = require('./models/calendar.js')

    // console.log(this.state.curMonth)
    // console.log(moment.months(10))
    // console.log(new Array(moment().daysInMonth()).fill(null).map((x, i) => moment().startOf('month').add(i, 'days')))
    // console.log(Array.from({length: moment().daysInMonth()}, (x, i) => moment().startOf('month').add(i, 'days')))

    // function daysInMonth(month) {
    //   var count =  moment().month(month).daysInMonth();
    //   var days = [];
    //   for (var i = 1; i < count+1; i++) {
    //     days.push(moment().month(month).date(i));
    //   }
    //   return days;
    // }


    // function getAllDatesOfMonth(date) {
    //   const mDate = moment(date, "YYYY-MM");
    //   const daysCount = mDate.daysInMonth();
    //   return Array(daysCount).fill(null).map((v,index)=>{
    //       const addDays = index === 0 ? 0 : 1;
    //       return mDate.add(addDays, 'days').format('YYYY-MM-DD');
    //   });
    // }

    // console.log('function', getAllDatesOfMonth('November'))
    // console.log('test', getAllDatesOfMonth('2019-11'))
    // console.log('testing2', moment.weekdays(moment('2019-11').day()))
    // console.log('day', moment('2019-11-01').daysInMonth())
