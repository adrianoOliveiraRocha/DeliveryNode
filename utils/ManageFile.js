const ManageFile = (function() {

  var _public = __dirname + '/../app/public' 

  function getPublicFolder() {
    return _public;
  } 

  return {    
    uploadFile: function(file, folder, callback) {
      const path = require('path');
      var fileName = new Date().getTime() + path.extname(file.name);
      file.mv(`${getPublicFolder()}/${folder}/${fileName}`, (err) => {
        if (err) {
          callback(`Error trying upload file: ${err}`, null)
        } else {
          callback(null, fileName)
        }
      })      
    },

    deleteFile: function(folder, fileName, callback) {
      let completePath = `${getPublicFolder()}/${folder}/${fileName}`
      const fs = require('fs')

      if(fs.existsSync(completePath)) {
        fs.unlink(completePath, (err, response) => {
          if (err) {
            callback(`Error trying delete old file of the object ${err}`)
          } else {
            console.log("delete ok")
            callback(null)
          }
        })
      } else {
        console.error('File not found')
        callback(null)
      }            
    } 
  }
})()

module.exports = ManageFile