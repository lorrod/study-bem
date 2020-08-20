import $ from '../local_modules/jquery/dist/jquery.min'

$('.bet__button').click(function() {
  let bet = $(this).attr('class').split('--').pop().split(' ').shift();
  console.log(bet);
  document.getElementsByClassName("additional-info--text")[0].innerText = 'Here is information about '+bet+' bet.';

  let buttons = document.getElementsByClassName("bet__button");
  for (var i=0; i < buttons.length; i++ ) {
    if (buttons[i].classList.contains("bet--active")) {
      buttons[i].classList.remove("bet--active");
    } else if (buttons[i].classList.contains("bet__image--" + bet)) {
      buttons[i].classList.add("bet--active");
    }

  }

  document.getElementsByClassName("additional-info")[0].style = "visibility: visible;";

});


$('.try-button').click(function() {
  location.href = window.location.href+'/about';
})

function selectedBtn(bet) {
  var header = document.getElementsByClassName("additional-info")[0].innerHTML = bet;
  var buttons = document.getElementsByClassName("bet__button");
  for (var i=0; i < buttons.length; i++ ) {
    if (buttons[i].classList.contains("bet--active")) {
      buttons[i].classList.remove("bet--active");
    } else if (buttons[i].classList.contains("bet__image--" + bet)) {
      buttons[i].classList.add("bet--active");
    }

  }
  var additionalInfo = document.getElementsByClassName("additional-info")[0].style = "visibility: visible;";
}


$(document).ready(() => {
    // eslint-disable-next-line no-console
    console.log(`document ready`)
})
