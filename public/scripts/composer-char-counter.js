/* eslint-disable no-undef */

$(document).ready(function() {

  $('.new-tweet textarea').on('input', function() {

    // convert the plain DOM to the jQuery object using $(this)
    const $textarea = $(this);
    // Get the value of the textarea using .val()
    const textareaValue = $textarea.val();
    // Calculate the number of characters left
    const characterLeft = 140 - textareaValue.length;
    console.log(`Characters left: ${characterLeft}`);

    // Find the .counter element by traversing up to the parent and back down
    const $counter = $textarea.closest('.new-tweet').find('.counter');

    // Update the counter text and style based on the character count
    $counter.text(characterLeft);

    // Add event handler and remove the event handler
    if (characterLeft < 0) {
      $counter.addClass('negative');
    } else {
      $counter.removeClass('negative');
    }

  });
});