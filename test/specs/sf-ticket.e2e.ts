import LandingPage from "../pageobjects/landing.page.js";
import ShowTimePage from "../pageobjects/showtime.page.js";
import SelectSeat from "../pageobjects/select-seat.page.js";
describe("SF CINEMA", () => {
  describe("Landing Page functionality", () => {
    beforeEach(async function () {
      await browser.reloadSession();
      await browser.maximizeWindow();
      await LandingPage.open();
      await LandingPage.preparePageStartUp();
    });

    afterEach(async () => {
      await browser.closeWindow();
    });

    it("Can change lauange", async function () {
      await LandingPage.changeLanguage();
      const signInText = await (await LandingPage.signinBtn).getText();
      if (signInText.match(/.*Login.*/g)) {
        await expect(LandingPage.signinBtn).toHaveTextContaining("Login");
      } else {
        await expect(LandingPage.signinBtn).toHaveTextContaining("เข้าสู่ระบบ");
      }
    });

    it.skip("Can open login modal", async function () {
      await LandingPage.openLoginModal();
      await expect(LandingPage.signinModal).toBeExisting();
    });

    it.skip("Can open movie menu", async function () {
      await LandingPage.openMovieMenu();
      await expect(LandingPage.movieMenuBtn).toHaveAttributeContaining(
        "class",
        "active"
      );
      await expect(browser).toHaveUrlContaining("movies");
    });
  });
  describe.skip("Reserve seat functionality", () => {
    /* 
      Prerequsite:
      - Landing Page is opened
      - Policy Modal is closed
      - Cover Page is closed if it's existing
      - Langaue need to changed to English
    
    */
    beforeEach(async function () {
      await browser.reloadSession();
      await browser.maximizeWindow();
      await LandingPage.open();
      await LandingPage.preparePageStartUp();
      await LandingPage.changeLanguage();
    });

    afterEach(async () => {
      await browser.closeWindow();
    });

    it("Can reserve seat from the landing page", async () => {
      const movieName = "Mission: Impossible - Dead Reckoning Part One";
      const cinemaLocation = "Buriram";
      const seats = ["H1", "H2"];

      await LandingPage.selectMovie(movieName);
      await expect(browser).toHaveUrlContaining("showtime");

      await ShowTimePage.setCinemaLocation(cinemaLocation);

      await expect(browser).toHaveUrlContaining("select-seat");
      await SelectSeat.selectSeat(seats);
    });
  });
});
