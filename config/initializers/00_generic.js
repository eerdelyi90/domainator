String.prototype.prettify = function() {
			var string = this.replace("_"," ");
	return  string.charAt(0).toUpperCase() + string.slice(1);

}

module.exports = function() {
};
