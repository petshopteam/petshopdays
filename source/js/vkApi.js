(function(){


  // &access_token=94217bb8d09bc8b84ac8aa8552a27cb99af2d7480839945d011ed2375307d5aabed0ecd6b53d148955eb0&expires_in=offine&user_id=173947858

  var token = '94217bb8d09bc8b84ac8aa8552a27cb99af2d7480839945d011ed2375307d5aabed0ecd6b53d148955eb0',
      id = '173947858', //user id
      albumId = '246690306'; //test_album

$.ajax({
  url: "http://api.vk.com/method/photos.get?album_id=173947858&owner_id=246690306",
  dataType: 'jsonp',
  type: 'GET',
  success: function(result){
    // var resp = result.response;
    console.log(result);
    // for (var i = 0; i < resp.length; i++) {
    //   console.log(result);
    //   console.log(resp[i]);
    // }
  },
  error: function(result){
    // console.log(result);
  }
});




}());
