const superagent = require('superagent');

superagent
  .get('http://localhost:8976/')
  .end((err, res) => {
    console.log(res)
  });
  