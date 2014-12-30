/*********************************************************
gets the value of a cookie
**********************************************************/
document.getCookie = function(sName)
{
    sName = sName.toLowerCase();
    var oCrumbles = document.cookie.split(';');
    for(var i=0; i<oCrumbles.length;i++)
    {
        var oPair= oCrumbles[i].split('=');
        var sKey = decodeURIComponent(oPair[0].trim().toLowerCase());
        var sValue = oPair.length>1?oPair[1]:'';
        if(sKey == sName)
            return decodeURIComponent(sValue);
    }
    return '';
}
/*********************************************************
sets the value of a cookie
**********************************************************/
document.setCookie = function(sName,sValue)
{
    var oDate = new Date();
    oDate.setYear(oDate.getFullYear()+1);
    var sCookie = encodeURIComponent(sName) + '=' + encodeURIComponent(sValue) + ';expires=' + oDate.toGMTString() + ';path=/';
    document.cookie= sCookie;
}

$(document).ready(function(){
	// scroll smooth
  function showRsvp() {
    $('#already_rsvp').fadeOut(500, 
      function(){ 
        $('#need_to_rsvp').fadeIn(500)
      }
    );
  } 
  
    function hideRsvp() {
      $('#need_to_rsvp').fadeOut(500, 
        function(){ 
          $('#already_rsvp').fadeIn(500)
        }
      );
    }
    
    if(document.getCookie('rsvpd')){
      hideRsvp();
    } 
    
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
      var to = 'emmaandjordangethitched'
      
      if ($(this).parsley().isValid()) {
        $.ajax({
            url: "//formspree.io/" + to + "@gmail.com", 
            method: "POST",
            data: {
              coming: $(this).find('[name="coming"]:checked').val(),
              guests: $(this).find('#form_name').val(), 
              email: $(this).find('#form_email').val(), 
              comments: $(this).find('#form_comments').val(),
              evening_guest: $(this).find('[name="evening_plus_one"]:checked').val(),
              evening_guest_name: $(this).find('#form_evening_plus_one_name').val()
            },
            dataType: "json",
          })
          .done(
            function(){
              hideRsvp();
              document.setCookie('rsvpd', 1);
            }.bind(this)
          )
          .fail(function() {
            alert( "There was a problem submitting this try again" );
          })

        }
      });
    
    $('#show_rsvp').click(function(e){
      e.preventDefault();
      showRsvp();  
    })
    
    $('[for="form_evening_plus_one_no"], #form_evening_plus_one_no').click(function(){
      $('[for="form_evening_plus_one_name"]').fadeOut(500);
      $('#form_evening_plus_one_name').val('');
    });
    
    $('[for="form_evening_plus_one_yes"], #form_evening_plus_one_yes').click(function(){
      $('[for="form_evening_plus_one_name"]').fadeIn(500);
    });
})
