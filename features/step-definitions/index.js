const {Given} = require('cucumber');
const {When} = require('cucumber');
const {Then} = require('cucumber');
const expect = require('chai').expect;

Given('I go to losestudiantes home screen', () => {
  browser.url('/');
  if($('button=Cerrar').isDisplayed()) {
    $('button=Cerrar').click();
  }
});

When('I open the login screen', () => {
  $('button=Ingresar').waitForExist(5000);
  $('button=Ingresar').waitForDisplayed(5000);
  $('button=Ingresar').click();
});

When('I fill a wrong email and password', () => {
  var cajaLogIn = $('.cajaLogIn');

  var mailInput = cajaLogIn.$('input[name="correo"]');
  mailInput.click();
  mailInput.setValue('wrongemail@example.com');

  var passwordInput = cajaLogIn.$('input[name="password"]');
  passwordInput.click();
  passwordInput.setValue('123467891');
});

When('I try to login', () => {
  var cajaLogIn = $('.cajaLogIn');
  cajaLogIn.$('button=Ingresar').click();
});

When(/^I fill with (.*) and (.*)$/ , (email, password) => {
  var cajaLogIn = $('.cajaLogIn');

 var mailInput = cajaLogIn.$('input[name="correo"]');
 mailInput.click();
 mailInput.keys(email);

 var passwordInput = cajaLogIn.$('input[name="password"]');
 passwordInput.click();
 passwordInput.keys(password)
});

Then(/^I expect to see (.*)$/, (error) => {
  console.log(error);
  let alert = $('form.jsx-902927190.loginForm div[role=alert]');
  alert.waitForDisplayed(5000);
  expect(alert.getText()).to.include(error);
});

Then('I should see fa-user-circle', () => {
  $('span.jsx-4152177179.usrImage.fa.fa-user-circle.fa-2x').waitForDisplayed(5000);
});

When(/^I enter (.*) and (.*) and (.*) and (.*) and (.*) and (.*) and (.*) and (.*)$/ , 
  (nombre, apellido, correo, universidad, maestria, programa, password, check_condiciones) => {

    let inputNombre = $('form.jsx-527058112.loginForm input[name=nombre]');
    inputNombre.click();
    inputNombre.keys(nombre);

    let inputApellido = $('form.jsx-527058112.loginForm input[name=apellido]');
    inputApellido.click();
    inputApellido.keys(apellido);

    if (correo.includes('[time]')) {
      let now = new Date();
      let secondsSinceEpoch = Math.round(now.getTime() / 1000);
      correo = correo.replace('[time]', secondsSinceEpoch.toString());
    }
    let inputCorreo = $('form.jsx-527058112.loginForm input[name=correo]');
    inputCorreo.click();
    inputCorreo.keys(correo);

    $('form.jsx-527058112.loginForm select[name=idUniversidad] option[value=' + universidad + ']').waitForExist();
    let selectUniversidad = $('form.jsx-527058112.loginForm select[name=idUniversidad]');
    if (selectUniversidad.getValue() != universidad) {
      selectUniversidad.selectByAttribute('value', universidad);
    }

    let checkMaestria = $('form.jsx-527058112.loginForm input[type=checkbox].jsx-527058112');
    if (checkMaestria.isExisting()) {
      if (maestria == 'yes' && !checkMaestria.isSelected()) {
        checkMaestria.click();
      }
      if (maestria == 'no' && checkMaestria.isSelected()) {
        checkMaestria.click();
      }
    }

    if (universidad != "inicial") {
      if (universidad == "universidad-de-los-andes") {
        $('form.jsx-527058112.loginForm select[name=idPrograma] option[value="' + programa + '"]').waitForExist();
        let selectPrograma = $('form.jsx-527058112.loginForm select[name=idPrograma]');
        selectPrograma.selectByAttribute('value', programa);
      }
      if (universidad == "universidad-nacional") {
        $('form.jsx-527058112.loginForm select[name=idPrograma] option[value="' + programa + '"]').waitForExist();
        let selectPrograma = $('form.jsx-527058112.loginForm select[name=idPrograma]');
        selectPrograma.selectByAttribute('value', programa);
      }
    }

    let inputPassword = $('form.jsx-527058112.loginForm input[name=password]');
    inputPassword.click();
    inputPassword.keys(password);

    let checkCondiciones = $('form.jsx-527058112.loginForm input[name=acepta]');
    if (check_condiciones == 'yes' && checkCondiciones.isSelected() == false) {
      checkCondiciones.click();
    }
    if (check_condiciones == 'no' && checkCondiciones.isSelected() == true) {
      checkCondiciones.click();
    }
  });

  When('I try to register', () => {
    let botonRegistrarse = $('form.jsx-527058112.loginForm button[type=submit].jsx-527058112.logInButton.fullWidth.btn.btn-primary');
    botonRegistrarse.click();
  });

  Then(/^Error (.*) should be shown in the register form$/, (error) => {
    // jsx-2777811044 glyphicon glyphicon-remove form-control-feedback
    // jsx-2777811044 glyphicon glyphicon-ok form-control-feedback

    if (error == 'input[name=nombre]' || error == 'input[name=apellido]') {
      redMark = $('form.jsx-527058112.loginForm ' + error + ' + span.jsx-2777811044.glyphicon.glyphicon-remove.form-control-feedback');
      redMark.waitForDisplayed(5000);
    }
    else if (error == 'select[name=idUniversidad]' || error == 'select[name=idPrograma]') {
      redMark = $('form.jsx-527058112.loginForm ' + error + ' + span.jsx-1373336998.ok.glyphicon.glyphicon-remove.form-control-feedback');
      redMark.waitForDisplayed(5000);
    }
    else {
      let fieldsetIndex;
      if (error == 'Ingresa tu correo' || error == 'Ingresa un correo valido') {
        fieldsetIndex = 3;
      }
      else if (error == 'Ingresa una contraseña') {
        fieldsetIndex = 6;
      }
      else if (error == 'Debes aceptar los términos y condiciones') {
        fieldsetIndex = 7;
        let botonRegistrarse = $('form.jsx-527058112.loginForm button[type=submit].jsx-527058112.logInButton.fullWidth.btn.btn-primary');
        botonRegistrarse.click();
      }
      let alert = $('form.jsx-527058112.loginForm fieldset:nth-child(' + fieldsetIndex + ') div[role=alert]');
      alert.waitForDisplayed(5000);
      expect(alert.getText()).to.include(error);
    }
  });