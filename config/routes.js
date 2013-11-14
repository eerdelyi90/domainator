module.exports = function routes() {


  // home page
  this.match('/', 'account#show');

  // Account resources
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

  // ':' prior to a link turns it into a variable for the controller
  // Domain related routes
  this.match('logs/:moduleRef/:moduleName', 'logs#show');
  this.resources('logs')
  
}

