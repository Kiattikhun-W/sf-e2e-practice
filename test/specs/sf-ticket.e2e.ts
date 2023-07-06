import LandingPage from "../pageobjects/landing.page.js";
import ShowTime from "../pageobjects/showtime.page.js";
import SelectSeat from "../pageobjects/select-seat.page.js";
describe("SF CINEMA", () => {
  before(async () => {
    await browser.maximizeWindow();
  });
  describe(" Landing Page functionality", () => {
    beforeEach(async () => {
      await LandingPage.open();
      await LandingPage.open();
      await expect(LandingPage.privacyPolicyModal).toBeExisting();
      await LandingPage.privacyPolicyModalCloseButton.click();
      await expect(LandingPage.privacyPolicyModal).not.toBeExisting();
    });
    it("if have a coverpage need to close ", async function () {
      const isHaveCoverPage = (await LandingPage.getCoverPage).isExisting();
      if (isHaveCoverPage) {
        await LandingPage.getCoverPage.click();
        await expect(LandingPage.getCoverPage).not.toBeExisting();
      } else {
        this.skip();
      }
    });
    it("Can change lauange if not english language ", async function () {
      await expect(LandingPage.signIn).toBeExisting();
      const signInText = await LandingPage.signIn.getText();
      if (!signInText.match(/.*Login.*/g)) {
        await LandingPage.engLang.click();
        await expect(LandingPage.signIn).toHaveTextContaining("Login");
      } else {
        this.skip();
      }
    });
    it("Can select movie", async () => {
      const movieName = "Mission: Impossible - Dead Reckoning Part One";
      await LandingPage.selectMovie(movieName);
      await expect(browser).toHaveUrlContaining("showtime");
    });
    describe("Showtime Page", () => {
      it("Can search cinema by location and select a highlight time", async () => {
        const cinemaLocation = "Buriram";
        await ShowTime.searchMovieBar.setValue(cinemaLocation);
        await ShowTime.showTimeActiveBtn.click();
        await expect(browser).toHaveUrlContaining("select-seat");
      });
    });
    describe("Select Seat Page", () => {
      it("Can select a seat", async () => {
        const seats = ["H1", "H2"];
        await SelectSeat.selectSeat(seats);
      });
    });
  });
});
