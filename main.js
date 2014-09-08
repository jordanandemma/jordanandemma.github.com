$(document).ready(function(){
	// scroll smooth
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
    
    $('form').submit(function(e){
      e.preventDefault();

      $.ajax({
          url: "//forms.brace.io/emmaandjordangethitched@gmail.com", 
          method: "POST",
          data: {coming: "YES", message: "hello!", from: 'blalalala', dietry: "none"},
          dataType: "json",
          success: function(){
            $('#already_rsvp').fadeOut(500);
            $('#need_to_rsvp').fadeIn(500);
          }
      });
    });
    
    $('#show_rsvp').click(function(e){
      e.preventDefault();
      $('#already_rsvp').hide();
      $('#need_to_rsvp').show();
    })
    
})