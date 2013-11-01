module.exports = function routes() {
  // home page
  this.root('pages#main');
  // this.match('domains/', 'pages#domains');
  this.match('settings/', 'pages#settings');

  // user resources
  this.resources('users');
  this.resources('domains');
}
