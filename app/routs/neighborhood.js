module.exports = (app) => {
  app.get('/new-neighborhood', (req, res) => {
    require('./../control/neighborhood.js').new(req, res)
  }),

  app.post('/new-neighborhood', (req, res) => {
    require('./../control/neighborhood.js').new(req, res)
  }),

  app.get('/show-neighborhood', (req, res) => {
    require('./../control/neighborhood.js').show(req, res)
  }),

  app.get('/edit-neighborhood', (req, res) => {
    require('./../control/neighborhood.js').edit(req, res)
  }),

  app.post('/edit-neighborhood', (req, res) => {
    require('./../control/neighborhood.js').edit(req, res)
  }),

  app.get('/deactivate-neighborhood', (req, res) => {
    require('./../control/neighborhood.js').deactivate(req, res)
  }),

  app.get('/activate-neighborhood', (req, res) => {
    require('./../control/neighborhood.js').activate(req, res)
  })
}
