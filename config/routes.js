module.exports = function routes() {

  // home page
  this.match('/', 'pages#main');
  this.match('/', 'pages#login', { via: 'POST' });
  this.match('settings/', 'pages#settings');
  // this.match('login/', 'pages#login');

  // this.match('/login', passport.authenticate('local', { successRedirect: '/',
  //                                                    failureRedirect: '/login' ));


  // user resources
  this.resources('users');

  // Domain related routes
  this.match('domains/alerts', 'domains#alerts');
  this.resources('domains');
}
