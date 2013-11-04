var deleteDomainPath = function(id) {
  $.ajax({
    url: '/domains/'+id,
    type: 'delete',
    success: function(data){
      alert(data);

    },
    error: function(a, b, c) {
      console.log(a, b, c);
    }
  });
}
var deleteUserPath = function(id) {
  $.ajax({
    url: '/users/'+id,
    type: 'delete',
    success: function(data){
      alert(data);
    },
    error: function(a, b, c) {
      console.log(a, b, c);
    }
  });
}
$(document).ready(function(){
    $('.delete-domain-path').click(function(){
      deleteDomainPath(
        $(this).attr('data-id'));
    
    });
    $('.delete-user-path').click(function(){
      deleteUserPath(
        $(this).attr('data-id'));
 
    });
});