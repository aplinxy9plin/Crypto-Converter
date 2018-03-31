var express = require('express')
var app = express()

app.get('/get', (request,result) => {
  (function(callback) {
      'use strict';
      const httpTransport = require('https');
      const responseEncoding = 'utf8';
      const httpOptions = {
          hostname: 'www.cryptopia.co.nz',
          port: '443',
          path: '/api/GetCurrencies',
          method: 'GET',
          headers: {"Cookie":"CryptopiaLang=en; visid_incap_1244263=MPuLy0qeSUCrC8TOO91W7mDAuVoAAAAAQUIPAAAAAAC772XKokSjwmWSswlMXWXh; nlbi_1244263=ikjpea9NyDJD1GyDujfqQgAAAAAGnWGtFxIOiwA1d0vCrKw9; incap_ses_582_1244263=HTwUcIb/zl5k32xKhK4TCGHAuVoAAAAArh49x2J8GJVMMmGJSgZmLQ=="}
      };
      httpOptions.headers['User-Agent'] = 'node ' + process.version;
      const request = httpTransport.request(httpOptions, (res) => {
          let responseBufs = [];
          let responseStr = '';

          res.on('data', (chunk) => {
              if (Buffer.isBuffer(chunk)) {
                  responseBufs.push(chunk);
              }
              else {
                  responseStr = responseStr + chunk;
              }
          }).on('end', () => {
              responseStr = responseBufs.length > 0 ?
                  Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;

              callback(null, res.statusCode, res.headers, responseStr);
          });

      })
      .setTimeout(0)
      .on('error', (error) => {
          callback(error);
      });
      request.write("")
      request.end();
  })((error, statusCode, headers, body) => {
      var array = JSON.parse(body)
      var string = '<select>'
      for (var i = 0; i < array.Data.length; i++) {
        string += '<option>' + array.Data[i].Name + '</option>'
      }
      string += '</select>'
      result.send('<form action="/change" method="GET">'+string+string+'<button type="submit">Send</button></form>')
  });
})

app.get('/change', (req, res) =>{
  var first_value = req.query.first
  var second_value = req.query.second
  var first_name = req.qeury.first_name
  var second_name = req.query.second_name
  if(first_value > second_value){
    // first is large
    res.send('')
  }else {
    res.send()
  }
})

app.listen(3000, function(){
  console.log('Server listening on port 3000.');
})
