const Category = (function() {
  // atributes
  return {

    new(name, callback) {
      let query = `insert into category (name) values ('${name}')`;
      let connect = require('./../../config/connect')
      connect.query(query, callback)
    },

    getAll(callback) {
      let query = 'select * from category';
      let connect = require('./../../config/connect')
      connect.query(query, callback)
    },

    getById(id, callback) {
      let query = 'select * from category where id = ' + id;
      let connect = require('./../../config/connect')
      connect.query(query, callback)
    },

    update(data, callback) {
      let query = `update category set name = '${data.name}' where id = ${data.id}`
      const connect = require('./../../config/connect')
      connect.query(query, callback)
    },
    
  }
})()

module.exports = Category