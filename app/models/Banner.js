const Banner = (function() {
  return {
    new(fileName, callback) {
      let query = `insert into banner (name) values ('${fileName}')`;
      let connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    getAll(callback) {
      let query = 'select * from banner';
      let connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    delete(id, callback) {
      let query = `delete from banner where id = ${id}`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    }
  }
})();

module.exports = Banner;