String.prototype.prettify = function() {
			var string = this.replace("_"," ");
	return  string.charAt(0).toUpperCase() + string.slice(1);

}

Date.prototype.format = function(){
                    
                    var year   = this.getFullYear();
                    var month  = this.getMonth()+1;
                    var day    = this.getDate();
                    var date   = day + '/'+ month + '/' + year;
                   
                    return date ;
}
module.exports = function() {
};
