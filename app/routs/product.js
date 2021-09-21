module.exports = (app) => {
  app.get('/new-product', (req, res) => {
    require('./../control/product').new(req, res)
  }),

  app.post('/new-product', (req, res) => {
    require('./../control/product').new(req, res)
  }),

  app.get('/show-products', (req, res) => {
    require('./../control/product').showAll(req, res)
  }),

  app.get('/edit-product', (req, res) => {
    require('./../control/product').editProduct(req, res)
  }),

  app.post('/edit-product', (req, res) => {
    require('./../control/product').editProduct(req, res)
  }),

  app.get('/deactivate', (req, res) => {
    require('./../control/product').deactivate(req, res);
  }),

  app.get('/activate', (req, res) => {
    require('./../control/product').activate(req, res);
  }),

  app.get('/send-info-search', function(req, res) {
    require('./../control/product').searchResult(req, res);
  })

}
