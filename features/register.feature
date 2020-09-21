Feature: Register into losestudiantes
    As a new user I want to register into losestudiantes

Scenario Outline: Registration failed

Given I go to losestudiantes home screen
When I open the login screen
And I enter <nombre> and <apellido> and <correo> and <universidad> and <maestria> and <programa> and <password> and <check_condiciones>
Then Error <error> should be shown in the register form

Examples:
|nombre|apellido|correo              |universidad             |maestria|programa|password |check_condiciones|error                                   |
|      |doe     |john.doe@yopmail.com|universidad-de-los-andes|yes     |16      |Passw0rd!|yes              |input[name=nombre]                      |
|john  |        |john.doe@yopmail.com|universidad-nacional    |no      |348     |Passw0rd!|yes              |input[name=apellido]                    |
|john  |doe     |                    |universidad-de-los-andes|no      |12      |Passw0rd!|yes              |Ingresa tu correo                       |
|john  |doe     |john doe@yopmail.com|universidad-de-los-andes|no      |12      |Passw0rd!|yes              |Ingresa un correo valido                |
|john  |doe     |john.doe%yopmail.com|universidad-de-los-andes|no      |12      |Passw0rd!|yes              |Ingresa un correo valido                |
|john  |doe     |john.doe@yopmailcom |universidad-de-los-andes|no      |12      |Passw0rd!|yes              |Ingresa un correo valido                |
|john  |doe     |john.doeyopmail.com |universidad-de-los-andes|no      |12      |Passw0rd!|yes              |Ingresa un correo valido                |
|john  |doe     |johndoeyopmailcom   |universidad-de-los-andes|no      |12      |Passw0rd!|yes              |Ingresa un correo valido                |
|john  |doe     |john.doe@yopmail.com|inicial                 |no      |12      |Passw0rd!|yes              |select[name=idUniversidad]              |
|john  |doe     |john.doe@yopmail.com|universidad-de-los-andes|no      |inicial |Passw0rd!|yes              |select[name=idPrograma]                 |
|john  |doe     |john.doe@yopmail.com|universidad-de-los-andes|no      |12      |         |yes              |Ingresa una contraseña                  |
|john  |doe     |john.doe@yopmail.com|universidad-de-los-andes|no      |12      |Passw0rd!|no               |Debes aceptar los términos y condiciones|

Scenario: Registration successful

Given I go to losestudiantes home screen
When I open the login screen
And I enter john and doe and john.doe+[time]@yopmail.com and universidad-de-los-andes and no and 12 and Passw0rd! and yes
And I try to register
Then I should see fa-user-circle