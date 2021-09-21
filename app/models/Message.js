const Message = (function() {
  return {

    sendMessage(data, callback) {
      let query = `insert into message (name, email, phone, message) 
      values('${data.name}', '${data.email}', '${data.phone}', 
      "${data.message}")`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    getNoReadMesages(callback) {
      let query = `select * from message where _read=0`;
      const connect = require('./../../config/connect');
      connect.query(query, callback)
    },

    getById(id, callback) {
      let query = `select * from message where id = ${id}`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    changeStatusMessage(data, callback) {
      let query = `update message set _read = ${data.status} where id=${data.id}`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    getAll(callback) {
      let query = `select id, name from message`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    getReadedMessages(callback) {
      let query = `select id, name from message where _read=1`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    noReadedMessages(callback) {
      let query = `select id, name from message where _read=0`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    deleteMessage(id, callback) {
      let query = `delete from message where id = ${id}`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    },

    deleteAllReadedMessages(callback) {
      let query = `delete from message where _read = 1`;
      const connect = require('./../../config/connect');
      connect.query(query, callback);
    }

  }
})();

module.exports = Message;