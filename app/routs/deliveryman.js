module.exports = (app) => {
  app.get('/deliveryman', (req, res) => {
    require('./../control/deliveryman').home(req, res);
  });  

  app.get('/deliveryman-profile', (req, res) => {
    require('./../control/deliveryman').profile(req, res);
  });

  app.post('/update-deliveryman-profile', (req, res) => {
    require('./../control/deliveryman').updateProfile(req, res);
  });

}