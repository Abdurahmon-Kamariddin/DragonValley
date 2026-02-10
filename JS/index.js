function checkLogin() {
  if (sessionStorage.loggedInUsern !== undefined) {
    let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsern]);
    document.getElementById("logininfo").innerHTML = usrObj.username + " logged in";
  } else {
    document.getElementById("logininfo").innerHTML = "";
  }
}
window.onload = checkLogin();

// Regular expressions that are checked against later
var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})")
var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
// Storing the users username, password, email, age and starting score
function storeUser() {
  // Build object that we will store
  var usrObject = {};
  usrObject.username = document.getElementById("username").value;
  usrObject.password = document.getElementById("password").value;
  usrObject.email = document.getElementById("email").value;
  usrObject.age = document.getElementById("age").value;
  usrObject.score = 0;
  // Store user
  localStorage[usrObject.username] = JSON.stringify(usrObject);
  // Inform that registration was successfull 
  document.getElementById("title").innerHTML = "Registration successful!"
}

function checkEmail() {
  let email = document.getElementById("email").value;
  if (!emailRegex.test(email)) {
    noemail.innerHTML = "'" + email + "' is not a valid email."
    return false;
  }
  noemail.innerHTML = "";
  console.log(email);
  return true;
}
function checkAge() {
  let age = document.getElementById("age").value;
  if (age < 13) {
    document.getElementById('noage').innerHTML = "User must be above 13 years old to register."
    return false;
  }
  document.getElementById('noage').innerHTML = "";
  console.log(age);
  return true;
}

function checkPassword() {
  let password = document.getElementById("password").value;
  if (!passwordRegex.test(password)) {
    document.getElementById('nopass').innerHTML = "'" + password + "' is not secure."
    return false;
  }
  document.getElementById('nopass').innerHTML = "";
  console.log(password);
  return true;
}
function checkUsername() {
  let username = document.getElementById("username").value;
  if (localStorage.getItem(username) !== null) {
    document.getElementById('nolog').innerHTML = 'Username is taken. Please choose another.';
    setTimeout(function () {
      document.getElementById('nolog').innerHTML = '';
    }, 5000);
    return false;
  } else {
    document.getElementById('nolog').innerHTML = '';
    return true;
  }
}

// Submit function that checks against the regular exressions
function submit() {
  if (sessionStorage.loggedInUsern !== undefined) {
    let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsern]);
    document.getElementById("logininfo").innerHTML = usrObj.username + " is already logged in. Please signout to register a new account.";
    return;
  }
  if (checkPassword() && checkEmail() && checkAge() && checkUsername()) {
    storeUser();
  }
  return (checkPassword() && checkAge() && checkEmail() && checkUsername());
}

function login() {
  // Get username 
  let usern = document.getElementById("username").value;
  //If user is already logged in and presses the button again
  if (sessionStorage.loggedInUsern !== undefined) {
    let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsern]);
    document.getElementById("logininfo").innerHTML = usrObj.username + " is already logged in";

    // If user didnt already register
  } else if (localStorage[usern] === undefined) {
    // Inform the new user that they may not have an account
    document.getElementById("loginfail").innerHTML = "Username not recognised. Do you have an account?";
    return;
  }
  else { //If user has an account
    let usrObj = JSON.parse(localStorage[usern]); //convert from string to object
    let password = document.getElementById("password").value;
    if (password === usrObj.password) { //Login success
      document.getElementById("loginfail").innerHTML = "";
      document.getElementById("loginsuccess").innerHTML = "Login Success. Welcome " + usern;
      setTimeout(function () {
        document.getElementById('loginsuccess').innerHTML = '';
      }, 10000); //after 10 seconds the signed out message will disappear
      sessionStorage.loggedInUsern = usrObj.username;
    }
    else {
      document.getElementById("loginfail").innerHTML = "Password not correct, please try again"
    }

  }




}
function signout() {
  if (sessionStorage.loggedInUsern !== undefined) {
    let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsern]);
    sessionStorage.clear();
    document.getElementById('logininfo').innerHTML = "Signout successful.";
    setTimeout(function () {
      document.getElementById('logininfo').innerHTML = '';
    }, 10000); //after 10 seconds the signed out message will disappear
  } else if (sessionStorage.loggedInUsern == undefined) {
    document.getElementById('logininfo').innerHTML = "Please sign in.";
  }
}