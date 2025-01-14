

const userData = checkLocal();
showCar();

// Form

document.getElementById('login').addEventListener('click', function() {
    document.getElementById('logoForm').classList.remove('hidden');
    document.getElementById('loginNav').classList.add('hidden');
})

document.getElementById('btnin').addEventListener('click', function() {
    showSignForm();
})

document.getElementById('btnup').addEventListener('click', function() {
    showSignForm();
})

document.getElementById('btn-signup').addEventListener('click', function() {
    const formName1 = document.getElementById('form-signup')
    const valid1 = true;
    const form = document.forms.upForm;
    isValid(checkValid('form-signup'), form, formName1, valid1);
})

document.getElementById('btn-signin').addEventListener('click', function() {
    checkLogin();
})

document.getElementById('btn-save').addEventListener('click', function() {
    const formName2 = document.getElementById('form-crud')
    const valid2 = false;
    const form = document.forms.saveForm;
    isValid(checkValid('form-crud'), form, formName2, valid2);
})

// Dropdown function

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if ((!event.target.matches('.dropbtn')) && (!event.target.matches('.dropbtntext'))) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

