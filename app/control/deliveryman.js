module.exports.home = (req, res) => {
  var message = req.session.message; req.session.message=null;
  const Delivery = require('./../models/Delivery');

  Delivery.getDeliveryByUserId(req.session.user.id, (error, deliveries) => {
    console.log(deliveries);
    if(error) {
      var errorMessage = "Não foi possível recuperar as entregas: " + error;
      res.render('admin/error.ejs', {errorMessage});
    } else {
      res.render('deliveryman/index.ejs', {
        user: req.session.user,
        deliveries, 
        message  
      });
    }
  });  
}

module.exports.profile = (req, res) => {
  var message = req.session.message;
  req.session.message = null;
  res.render('deliveryman/profile.ejs', {
    user: req.session.user,
    message
  });
}

module.exports.updateProfile = (req, res) => {
  var imageSended = req.files ? true : false;
  let data = req.body;
  data.id = req.session.user.id;
  const UserFactory = require('../models/UserFactory');
  const factory = new UserFactory();
  const user = factory.createUser(1);

  var ManageFile, folder;
  if(imageSended) {
    ManageFile = require('../../utils/ManageFile');
    folder = 'admin/images/user';
  } 

  async function deleteOldimage() {
    return new Promise((resolve, reject) => {
      if(imageSended) {        
        ManageFile.deleteFile(folder, req.session.user.imageName, error => {
          error ? reject(error) : resolve(true)
        })
      } else {
        resolve(false);
      }
    })    
  }

  async function uploadNewImage() {
    let responseUpload = await deleteOldimage();
    return new Promise((resolve, reject) => {
      if(responseUpload) {
        ManageFile.uploadFile(req.files['profileImage'], folder, (error, fileName) => {
          error ? reject(error) : resolve(fileName);
        })
      } else {
        resolve(null);
      }
    })
  }

  async function updateDataBase() {
    data.imageName = await uploadNewImage();
    return new Promise((resolve, reject) => {
      user.updateProfile(data, (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(true);               
        }
      })
    })    
  }

  async function updateSession() {
    const response = await updateDataBase();
    return new Promise((resolve, reject) => {
      if(response) {
        user.getUser(req.session.user.id, (err, result) => {
          if(err) reject(err);
          else {
            req.session.user = result[0]
            resolve(true);
          }
        })
      }
    })    
  }

  updateSession()
    .then((result) => {
      if(result) {
        res.render('user/message.ejs', {
          message: `Suas informações foram atualizadas com sucesso. 
          Se você alterou a imagem de perfil, atualize a página para ver a 
          nova imagem`
        });
      } else {
        throw new Error("A Sessão não foi atualizada");
      }      
    })
    .catch(err => {
      // console.error(err)
      res.end(`
          <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Houve um problema ao tentar atualizar suas informações: ${err.sqlMessage}</div>
        `);
    });  

}