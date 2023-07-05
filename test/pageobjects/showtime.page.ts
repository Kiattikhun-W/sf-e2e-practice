import Page from "./page.js";

class ShowTime extends Page {
  get searchMovieBar() {
    return $(".input-wrapper > input");
  }
  get showTimeActiveBtn() {
    return $("button.button.button-showtime.active");
  }
}

export default new ShowTime();
