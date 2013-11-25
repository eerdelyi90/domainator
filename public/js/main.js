var deleteItem = function(id, path) {
  $.ajax({
    url: '/'+path+'/'+id,
    type: 'delete',
    success: function(data){
      // alert('yeahahaha');
    },
    error: function(a, b, c) {
      console.log(a, b, c);
    }
  });
}

var updateDate = function(path, action, id, date) {
  
  $.ajax({
     url: '/'+path+'/quickedit',
     data: { action: action, date : date, 'id': id },
     type:'post',
    success: function(data){
      // alert(action + ' has been updated');
    },
    error: function(a, b, c) {
      console.log(a, b, c);
    }
  });
}


var generatePassword = function(){
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
Date.prototype.format = function(){
                    
    var year   = this.getFullYear();
    var month  = this.getMonth()+1;
    var day    = this.getDate();
    var date   = day + '/'+ month + '/' + year;
   
    return date ;
}

var dateChecked = function(domObj) {

  var now_unformat = new Date();
  now = now_unformat.format();

  if(domObj.is(':checked')){
    domObj.siblings().html(' '+ now);
    return now_unformat;
  }
  else{
    domObj.siblings().html(' ');
    domObj.siblings().remove('.invoiced-change','.paid-change','.renewed-change');
    return null;
  }


}




$(document).ready(function(){
  var pass = '';
  $('.generate').click(function(){
    pass = generatePassword();
     console.log(pass);
     $('.password').val(pass);
    });
    $('.delete-domain-path').click(function(){
      deleteItem(
        $(this).attr('data-id'), 'domains');
      $(this).parents('tr').remove();
    });


     $('.invoiced').click(function()
        {
         var timestamp = dateChecked($(this));

          $('.invoiced-date').unbind('click');
          $('.invoiced-date').click(function() {
            var _this = $(this);
            $('.invoiced-change').remove();
            $(this).after('<input type="date"  class="form-control invoiced-change">');
            $('.invoiced-change').change(function() {
              var date = new Date($('.invoiced-change').val());
              timestamp = date;
              _this.html( '<span class="invoiced-date">'+ date.format() +'</span>');
              $('.invoiced-change').remove();
              updateDate('domains', 'invoiced', _this.parents('tr').data('id'),  timestamp  );
            });

        });
          // console.log(timestamp);
        updateDate('domains', 'invoiced', $(this).parents('tr').data('id'), timestamp );
    });

    $('.paid').click(function()
    {
     var timestamp = dateChecked($(this));

      $('.paid-date').unbind('click');
      $('.paid-date').click(function() {
            var _this = $(this);
            $('.paid-change').remove();
            $(this).after('<input type="date"  class="form-control paid-change">');
            $('.paid-change').change(function() {
                var date = new Date($('.paid-change').val());
                timestamp = date;
                _this.html( '<span class="paid-date">'+ date.format() +'</span>');
                $('.paid-change').remove();
                updateDate('domains', 'paid', _this.parents('tr').data('id'),  timestamp  );
            });      
        });
        updateDate('domains', 'paid', $(this).parents('tr').data('id'),  timestamp  );
    });

     $('.renewed').click(function() {
        var timestamp =  dateChecked($(this));
             $('.renewed-date').unbind('click');
          $('.renewed-date').click(function() {
            var _this = $(this);
            $('.renewed-change').remove();
            $(this).after('<input type="date"  class="form-control renewed-change">');
            $('.renewed-change').change(function() {
              var date = new Date($('.renewed-change').val());
              timestamp = date;
              _this.html( '<span class="renewed-date">'+ date.format() +'</span>');
              $('.renewed-change').remove();
              updateDate('domains', 'renewed', _this.parents('tr').data('id'),  timestamp  );
            });

        });
        updateDate('domains', 'renewed', $(this).parents('tr').data('id'),  timestamp  );
      });

    $('.delete-user-path').click(function(){
      deleteItem(
        $(this).attr('data-id'), 'users');
      $(this).parents('tr').remove();
    });

    

});