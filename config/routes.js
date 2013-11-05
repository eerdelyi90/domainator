module.exports = function routes() {

  // home page
  this.root('pages#main');
  this.match('settings/', 'pages#settings');
  this.match('login/', 'pages#login');

  // this.match('/login', passport.authenticate('local', { successRedirect: '/',
  //                                                    failureRedirect: '/login' ));


  // user resources
  this.resources('users');

  // Domain related routes
  this.match('domains/alerts', 'domains#alerts');
  this.resources('domains');
}
