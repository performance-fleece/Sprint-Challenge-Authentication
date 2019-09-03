const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findbyId,
  findbyFilter
};

function find() {
  return db('users');
}

function findbyId(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return findbyId(ids[0]);
    });
}
function findbyFilter(filter) {
  return db('users').where(filter);
}
