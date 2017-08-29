const express = require('express')
const app = express()
const fetch = require('isomorphic-fetch')
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)
const async = require('async')
const cors = require('cors')

app.use(cors())

app.get('/latest', (req, res) => {
  let param1 = req.query.base;
  let param2 = req.query.amountOfDays;
  const startDate = Moment().subtract(param2, 'days')
  const endDate = Moment()
  const iterable = moment.range(startDate, endDate)
  const range = Array.from(iterable.by('day')).map(day => day.format('YYYY-MM-DD'))
  // console.log(range);
  // http://api.fixer.io/${date}?base=USD&symbols=AUD,CAD,GBP,EUR

  let rawData = []
  async.each(range, (date, next) => {
    fetch(`http://api.fixer.io/${date}?base=${param1}`)
      .then(response => response.json())
      .then(data => {
        if (date === data.date) {
          data.rates.date = date
          var temp = data.rates;
          delete temp.IDR;
          delete temp.HUF;
          delete temp.KRW;
          rawData.push(temp);
        }
        next()
      })
  }, (err) => {
    if (err) return res.send({ success: false, err })
    rawData.sort((a, b) => Moment(a.date) - Moment(b.date))
    res.send(rawData)
  })
})

const port = process.env.PORT || 3030
app.listen(port, () => {
  console.log('Express server running on port', port)
})
