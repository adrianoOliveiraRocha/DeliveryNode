var Helper = (function() {
  return {

    fixPrice(obj, event) {
      var key = event.which || event.keyCode;
      var accepted = false;
      if(key >= 48 && key <= 57
        || key == 188
        || key == 8
        || key == 46
        || key >= 97 && key <= 105
        || key >= 37 && key <= 40) {
        accepted = true;
      }

      if(!accepted) {
        //Delete the last value and update the input
        var valueArray = obj.value.split('');
        var length = valueArray.length;
        valueArray[length - 1] = "";
        var updateValue = valueArray.join("");
        document.getElementById(obj.id).value = updateValue;
      }
    },

    seePwd(event) {
      event.preventDefault();
      var pwdInput = document.getElementById('pwd');
      var buttonSeePwd = document.getElementById('buttonSeePwd');
      if(pwdInput.type === 'password') {
        pwdInput.type = 'text';
        buttonSeePwd.innerText = "Ocultar Senha";
      } else {
        pwdInput.type = 'password';
        buttonSeePwd.innerText = "Exibir Senha";
      }
    },

    fixPhone(phone) {
      phone = phone.replace('(', '').replace(')','');
      if(phone.length == 2) {
        document.getElementById('phone').value = '(' + phone + ')';
      }
    },

    messageDetails(id) {
      simpleGetAjax('/message-details?id=' + id);
    },

    changeMessageStatus(id, status) {
      simpleGetAjax('/change-status-message?id=' + id + "&status=" + status);
    },

    deleteMessage(id) {
      simpleGetAjax('/delete-message?id=' + id);
    },

    deleteReadedMessage() {
      simpleGetAjax('/delete-readed-messages');
    },

    printData(id, title) {
      var content = document.getElementById(id); // it is a table
      var fontSize = document.getElementById('fontSize').value;
      content.style.fontSize = fontSize + 'px';

      var myWindow = window.open("");
      myWindow.document.write('<html><head>');
      myWindow.document.write('<title>' + title + '</title>');
      myWindow.document.write('</head><body>');
      myWindow.document.write(content.outerHTML);
      myWindow.document.write('</body></html>');
      myWindow.print();
      content.style.fontSize = '16px';
      myWindow.close();

    },

    sendToDeliveryman(orderId) {
      var stdmForm = document.createElement('form');
      stdmForm.method="POST";
      stdmForm.action="/send-to-deliveryman";
      
      // public place
      var publicPlace = document.getElementById('publicPlace').innerHTML;
      var publicPlaceInput = document.createElement('input');
      publicPlaceInput.name='publicPlace';
      publicPlaceInput.value=publicPlace;
      stdmForm.appendChild(publicPlaceInput);

      // number
      var _number = document.getElementById('number').innerHTML;
      var _numberInput = document.createElement('input');
      _numberInput.name='_number';
      _numberInput.value=_number;
      stdmForm.appendChild(_numberInput);

      // neighborhood
      var neighborhood = document.getElementById('neighborhood').innerHTML;
      var neighborhoodInput = document.createElement('input');
      neighborhoodInput.name='neighborhood';
      neighborhoodInput.value=neighborhood;
      stdmForm.appendChild(neighborhoodInput);

      simplePostAjax(null, stdmForm);
    }

  }
})();

function simpleGetAjax(url) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      variableContent.innerHTML = xhr.response;
    } else {
      variableContent.innerHTML = "<h3>Carregando...</h3>"
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

function simplePostAjax(url=null, form=null) {
  var xhr = new XMLHttpRequest();
  var formData = new FormData(form)

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      variableContent.innerHTML = xhr.response;
    } else {
      variableContent.innerHTML = "<h3>Carregando...</h3>"
    }
  }

  xhr.open("POST", form.getAttribute('action'), true);
  xhr.send(formData);
}

var Deliveryman = (function() {
  return {
    profile: function() {
      // show the formulary
      var variableContent = document.getElementById('variableContent');
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          variableContent.innerHTML = this.response;
        } else {
          variableContent.innerHTML = "<h3 class='text-canter'>carregando...</h3>";
        }
      }
      xhr.open('GET', '/deliveryman-profile', true);
      xhr.send();
    },

    updateProfile: function(event) {
      event.preventDefault();
      var email = document.getElementById('email').value;
      var pwd = document.getElementById('pwd').value;
      if(email == '' || pwd == '') {
        alert('Email e senha são obrigatórios');
      } else {
        var variableContent = document.getElementById('variableContent');
        var profileForm = document.getElementById('profileForm');
        var formData = new FormData(profileForm)
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200) {
            variableContent.innerHTML = this.response;
          } else {
            variableContent.innerHTML = "<h3 class='text-canter'>carregando...</h3>"
          }
        }
        xhr.open('POST', profileForm.getAttribute('action'), true);
        xhr.send(formData);
      }
      
    }, 
  }
})();