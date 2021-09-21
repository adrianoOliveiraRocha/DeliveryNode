module.exports = (app) => {

  app.get('/user', (req, res) => {
    require('../control/user').user(req, res);
  }),

  app.get('/login', (req, res) => {
    require('../control/user').login(req, res);
  }),

  app.post('/login', (req, res) => {
    require('../control/user').login(req, res);
  }),

  app.get('/logout', (req, res) => {
    require('../control/user').logout(req, res);
  }),

  app.get('/register', function(req, res) {
    require('../control/user').register(req, res);
  }),

  app.post('/register', function(req, res) {
    require('../control/user').register(req, res);
  }),

  app.get('/user-profile', function(req, res) {
    require('./../control/user').profile(req, res);
  });

  app.post('/update-user-profile', function(req, res) {
    require('./../control/user').updateProfile(req, res);
  }),

  app.get('/my-orders', (req, res) => {
    require('./../control/user').myOrders(req, res);
  }),

  app.get('/my-fulfilled-orders', (req, res) => {
    require('./../control/user').myFuFilledOrders(req, res);
  }),

  app.get('/my-no-fulfilled-orders', (req, res) => {
    require('./../control/user').myNoFulFilledOrders(req, res);
  }),

  app.get('/my-order-details', (req, res) => {
    require('./../control/user').myOrderDetails(req, res);
  });

  app.get('/user-whatsapp-message', function(req, res) {
    require('./../control/user').userWhatsAppMessage(req, res);
  });

  // app.post('/send-user-whatsapp-message', function(req, res) {
  //   require('./../control/user').sendUserWhatsAppMessage(req, res);
  // });

};