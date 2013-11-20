var deleteItem = function(id, path) {
  $.ajax({
    url: '/'+path+'/'+id,
    type: 'delete',
    success: function(data){
      
    },
    error: function(a, b, c) {
      console.log(a, b, c);
    }
  });
}

var generatePassword = function(elem){
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 8;
  var randomstring = '';
  var charCount = 0;
  var numCount = 0;

  for (var i=0; i<string_length; i++) {
      // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
      if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
          var rnum = Math.floor(Math.random() * 10);
          randomstring += rnum;
          numCount += 1;
      } else {
          // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum,rnum+1);
          charCount += 1;
      }
  }
  return randomstring;
}





$(document).ready(function(){

    $('.delete-domain-path').click(function(){
      deleteItem(
        $(this).attr('data-id'), 'domains');
      $(this).parents('tr').remove();
    });

    $('.delete-user-path').click(function(){
      deleteItem(
        $(this).attr('data-id'), 'users');
      $(this).parents('tr').remove();
    });

    

});