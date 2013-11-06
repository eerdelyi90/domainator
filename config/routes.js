module.exports = function routes() {

  // home page
  this.match('/', 'pages#main');
  this.match('/', 'pages#login', { via: 'POST' });
  this.match('settings/', 'pages#settings');
  // this.match('login/', 'pages#login');
  this.resource('account');
  this.match('login', 'account#loginForm', { via: 'get' });
  this.match('login', 'account#login', { via: 'post' });
  this.match('logout', 'account#logout');

  // this.match('/login', passport.authenticate('local', { successRedirect: '/',
  //                                                    failureRedirect: '/login' ));


  // user resources
  this.resources('users');

  // Domain related routes
  this.match('domains/alerts', 'domains#alerts');
  this.resources('domains');
}
