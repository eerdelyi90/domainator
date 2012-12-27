module.exports = function routes() {
  // home page
  this.root('pages#main');

  // user resources
  this.resources('users');
}
