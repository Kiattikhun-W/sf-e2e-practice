import LandingPage from "../pageobjects/landing.page.js";

describe("SF CINEMA", () => {
  before(async () => {
    await browser.maximizeWindow();
  });
  describe("Landing Page", () => {
    it("Should see a landing page with a Privacy Modal ", async () => {
      await LandingPage.open();
      await expect(LandingPage.privacyPolicyModal).toBeExisting();
    });
    it("Should close the Privacy Modal ", async () => {
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
    it("Can select a movie ", async () => {
      await LandingPage.selectMovie(
        "Mission: Impossible - Dead Reckoning Part One"
      );
      await browser.pause(5000);
    });
  });
});
