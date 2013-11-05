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