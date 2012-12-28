module.exports = {
  registerModel : function(model) {
    this[model.name] = model;
  }
};
