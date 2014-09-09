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
            url: "//forms.brace.io/" + to + "@gmail.com", 
            method: "POST",
            data: {
              coming: $(this).find('[name="coming"]:checked').val(),
              guests: $(this).find('#form_name').val(), 
              email: $(this).find('#form_email').val(), 
              comments: $(this).find('#form_comments').val()
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
    
    
})