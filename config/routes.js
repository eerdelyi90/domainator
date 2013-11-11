module.exports = function routes() {


  // home page
  this.match('/', 'account#show');

  this.resource('account');
  this.match('login', 'account#loginForm', { via: 'get' });
  this.match('login', 'account#login', { via: 'post' });
  this.match('logout', 'account#logout');
  this.match('error404', 'pages#error404');



  // user resources
  this.resources('users');

  // Domain related routes
  this.match('domains/alerts', 'domains#alerts');
  this.resources('domains');

  this.resources('logs');
}

