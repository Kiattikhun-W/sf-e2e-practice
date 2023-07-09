import Page from "./page.js";

class ShowTimePage extends Page {
  get searchMovieBar() {
    return $(".input-wrapper > input");
  }
  get showTimeActiveBtn() {
    return $("button.button.button-showtime.active");
  }
  get showTimeBoxes() {
    return $$("div.showtime-box");
  }

  public async setCinemaLocation(cinemaLocation: string) {
    await this.searchMovieBar.setValue(cinemaLocation);
    await browser.waitUntil(
      async () => {
        return (await this.showTimeBoxes).length === 1;
      },
      {
        timeout: 10000,
        timeoutMsg: "Showtime box is not found",
      }
    );
    await this.showTimeActiveBtn.click();
  }
}

export default new ShowTimePage();
