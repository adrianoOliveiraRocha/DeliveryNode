if('serviceWorker' in navigator) {  
  window.addEventListener('load', function() {
    
    navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log("service work registred"))
    .catch(err => console.log("service work not registred: ", err));      
  });      
} 

function installButton() {
  let deferredPrompt;
  var addBtn = document.getElementById('enable-banner-install');
  
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt...');
    addBtn.style.display = 'block';
    e.preventDefault();
    deferredPrompt = e;
    addBtn.addEventListener('click', (e) => {
      addBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the prompt');            
        } else {
          console.log('User dismissed the prompt');
        }
        deferredPrompt = null;
      });
    });
});

}





