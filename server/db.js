var postgres = require('pg');
postgres.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL || 'REPLACE_STRING';

const doQuery = (queryStr, values) => {
  return new Promise(function(resolve, reject) {
    postgres.connect(connectionString, function(err, client) {
      if(err) throw err;
      client
        .query(queryStr, values, function(err, result) {
          if(err) throw err;
          if(!result || !result.rowCount) {
            reject('No rows found');
          } else {
            resolve(result);
          }
        })
        .on('end', function() {
          client.end();
        });
    });
  });
}

const createAccount = (email, password) => doQuery('INSERT INTO users(email, password, signup_date) VALUES($1, $2, $3)', [email, password, new Date()]);
const retrieveUser = (email) => doQuery('SELECT * FROM users WHERE email = $1::text', [email])
  .then(result => result.rows[0])
  .catch(err => err);

module.exports = {
  createAccount: createAccount,
  retrieveUser: retrieveUser
};
