module.exports = function(app){
    const user = require('../src/userController');

    app.get('/users', user.listAllUsers);
    app.post('/users/register', user.user_register);
    app.post('/users/login', user.user_login);
    app.delete('/users/delete', user.deleteUser);
};



