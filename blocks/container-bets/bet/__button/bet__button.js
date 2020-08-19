

function selected_btn(bet) {
  var header = document.getElementsByClassName("addit-info__header")[0].innerHTML = bet;
  var buttons = document.getElementsByClassName("bet__button");
  for (var i=0;i<buttons.length; i++ ) {
    if (buttons[i].classList.contains("bet_active")) {
      buttons[i].classList.remove("bet_active");
    } else if (buttons[i].classList.contains("bet__image-"+bet)) {
      buttons[i].classList.add("bet_active");
    }

  }
  var additional_info = document.getElementsByClassName("addit-info")[0].style = "visibility: visible;"

}
