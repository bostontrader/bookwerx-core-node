let client

let firstNewCurrency = {symbol: 'DLX', title: 'Dilithium Crystals'}
let secondNewCurrency = {symbol: 'QLO', title: 'Quatloos'}

exports.setClient = function (c) { client = c }

exports.tests = function () {
  // 1. GET /currencies and look for the correct operation of returning
  // an array of zero, one, or > 1 elements.
  return new Promise((resolve, reject) => {
    console.log('GET /currencies, sb empty')
    client.get('/currencies', function (err, req, res, obj) {
      if (err) reject(err)
      if (obj.length !== 0) reject('accounts should be empty')
      console.log('accounts=%j', obj)
      resolve(true)
    })
  })

  .then((result) => {
    console.log('POST /currencies, 1st new document')
    return new Promise((resolve, reject) => {
      client.post('/currencies', firstNewCurrency, function (err, req, res, obj) {
        if (err) reject(err)
        firstNewCurrency = obj
        console.log('%j', firstNewCurrency)
        resolve(true)
      })
    })
  })

  .then((result) => {
    console.log('GET /currencies, sb only 1 document')
    return new Promise((resolve, reject) => {
      client.get('/currencies', function (err, req, res, obj) {
        if (err) reject(err)
        if (obj.length !== 1) reject('accounts should only have one document')
        console.log('accounts=%j', obj)
        resolve(true)
      })
    })
  })

  .then((result) => {
    console.log('POST /currencies, 2nd new document')
    return new Promise((resolve, reject) => {
      client.post('/currencies', secondNewCurrency, function (err, req, res, obj) {
        if (err) reject(err)
        console.log('%j', obj)
        resolve(true)
      })
    })
  })

  .then((result) => {
    console.log('GET /currencies, sb two documents')
    return new Promise((resolve, reject) => {
      client.get('/currencies', function (err, req, res, obj) {
        if (err) reject(err)
        if (obj.length !== 2) reject('accounts should only have two documents')
        console.log('accounts=%j', obj)
        resolve(true)
      })
    })
  })

  // 3. POST /currencies
  // We already know that POST works.

  // 4. PUT /accounts/:id
  .then((result) => {
    console.log('PUT /currencies, good id')
    return new Promise((resolve, reject) => {
      client.put('/currencies/' + firstNewCurrency._id, {title: 'first amended title'}, function (err, req, res, obj) {
        if (err) {
          console.log(err)
          reject(err)
        }
        console.log('correct result:%j', obj)
        resolve(true)
      })
    })
  })

  .then((result) => {
    console.log('PUT /currencies, bad id')
    return new Promise((resolve, reject) => {
      client.put('/currencies/666666b816070328224cf098', {}, function (err, req, res, obj) {
        if (err) {
          console.log(err)
          reject(err)
        }
        console.log('correct result:%j', obj)
        resolve(true)
      })
    })
  })

  // 5. DELETE /accounts/:id
  .then((result) => {
    console.log('DELETE /currencies, bad id')
    return new Promise((resolve, reject) => {
      client.del('/currencies/666666b816070328224cf098', function (err, req, res, obj) {
        if (err) {
          console.log(err)
          reject(err)
        }
        console.log('correct result:%j', obj)
        resolve(true)
      })
    })
  })

  .then((result) => {
    console.log('DELETE /currencies, good id')
    return new Promise((resolve, reject) => {
      client.del('/currencies/' + firstNewCurrency._id, function (err, req, res, obj) {
        if (err) {
          console.log(err)
          reject(err)
        }
        console.log('correct result:%j', obj)
        resolve(true)
      })
    })
  })
}
