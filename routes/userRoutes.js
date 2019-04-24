module.exports = function(app){
    const user = require('../src/userController');

    app.post('/register', user.user_register);
    app.post('/login', user.user_login);
};



