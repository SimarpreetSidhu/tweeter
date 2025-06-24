$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on( "input", function() {
   const inputLength = $(this).val().length;
   const remaining = 140 - inputLength;
   console.log(`Remaining characters: ${remaining}`);

   const counter = $(this).closest('form').find('.counter');
   counter.text(remaining);
   if(remaining < 0) {
    counter.addClass('negative');
   } else {
    counter.removeClass('negative');
   }
 });
})