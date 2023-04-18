/* toggle menu open while hover */
function toggleDropdown (e) {
  const _d = $(e.target).closest('.dropdown'),
      _m = $('.dropdown-menu', _d);
  setTimeout(function(){
    const shouldOpen = e.type !== 'click' && _d.is(':hover');
    _m.toggleClass('show', shouldOpen);
    _d.toggleClass('show', shouldOpen);
    $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
  }, e.type === 'mouseleave' ? 300 : 0);
}
$('body')
  .on('mouseenter mouseleave','.dropdown',toggleDropdown)
  .on('click', '.dropdown-menu a', toggleDropdown);
/* not needed, prevents page reload for SO example on menu link clicked */
//$('.dropdown a').on('click tap', e => e.preventDefault())


$(".forgot-password").click(function(){
$('#signup-activation-modal').modal('hide');
});
$('.open-modal-custom').click(function(){
$('#signup-activation-modal').modal('show');
$('#email-activation-modal').modal('hide');
$('#m88-signin-tab').addClass('active');
$('#m88-signup-tab').removeClass('active');
$('#signin-form').addClass('active show');
$('#signup-form').removeClass('active show');
});

//To remove SearchModal duplication in mobile/tablet
$('#SearchModal').on('shown.bs.modal', function () {
$('.typeahead-desktop').remove();
});
$("#gotIt").click(function(){
$('#pwd-update-sucess-modal').modal('hide');
});
$(".sign-up-mobile").click(function(){
$('#SignInModal').modal('hide');
});

$(document).ready(function(){
  $(".carousel-indicators li:first-child").addClass('active');
});

$(".popup-close").click(function(){
$('#forgot-password-email-modal').modal('hide');
});

$("#logoClick").click(function(){
var homeUrl=document.getElementById("homepage").value;
$('#exit').attr('href',homeUrl);
$('#car-reservation-exit-modal').appendTo("body").modal('show');

});
$("#profileClick").click(function(){
 var profile=document.getElementById("profilepage").value;
$('#exit').attr('href',profile);
$('#car-reservation-exit-modal').appendTo("body").modal('show');
});

jQuery(document).ready(function($) {
   var all_oembed_videos = $("iframe[src*='youtube']");
 
   all_oembed_videos.each(function() {
      $(this).removeAttr('height').removeAttr('width').wrap( "<div class='embed-container'></div>" );
   });
})
