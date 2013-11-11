module.exports = function routes() {

 // var regex = new RegExp("[A-Za-z][A-Za-z0-9]");
  // home page
  this.match('/', 'account#show');
  // this.match('/', 'pages#login', { via: 'POST' });
  // this.match('settings/', 'pages#settings');
  // this.match('login/', 'pages#login');
  this.resource('account');
  this.match('login', 'account#loginForm', { via: 'get' });
  this.match('login', 'account#login', { via: 'post' });
  this.match('logout', 'account#logout');
  this.match('error404', 'pages#error404');

  
  // this.match('error404', 'pages#error404');

  // this.match('/login', passport.authenticate('local', { successRedirect: '/',
  //                                                    failureRedirect: '/login' ));


  // user resources
  this.resources('users');

  // Domain related routes
  this.match('domains/alerts', 'domains#alerts');
  this.resources('domains');

  this.resources('logs');
}

// app.get('/settings',
//   ensureLoggedIn('/login'),
//   function(req, res) {
//     res.render('settings', { user: req.user });
//   });