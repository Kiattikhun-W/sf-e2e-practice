import LandingPage from "../pageobjects/landing.page.js";
import ShowTime from "../pageobjects/showtime.page.js";
import SelectSeat from "../pageobjects/select-seat.page.js";
describe("SF CINEMA", () => {
  before(async () => {});
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
    });

    it("Can open login modal", async function () {
      await LandingPage.openLoginModal();
    });

    it("Can open movie menu", async function () {
      await LandingPage.openMovieMenu();
    });
  });
  describe("Resever seat functionality", () => {
    /* 
      Prequsite:
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
      await LandingPage.selectMovie(movieName);
      await expect(browser).toHaveUrlContaining("showtime");
    });
  });
});
// it("Can select movie", async () => {
//   const movieName = "Mission: Impossible - Dead Reckoning Part One";
//   await LandingPage.selectMovie(movieName);
//   await expect(browser).toHaveUrlContaining("showtime");
// });
// describe("Showtime Page", () => {
//   it("Can search cinema by location and select a highlight time", async () => {
//     const cinemaLocation = "Buriram";
//     await ShowTime.searchMovieBar.setValue(cinemaLocation);
//     await ShowTime.showTimeActiveBtn.click();
//     await expect(browser).toHaveUrlContaining("select-seat");
//   });
// });
// describe("Select Seat Page", () => {
//   it("Can select a seat", async () => {
//     const seats = ["H1", "H2"];
//     await SelectSeat.selectSeat(seats);
//   });
// });
