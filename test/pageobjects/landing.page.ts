import Page from "./page.js";

class LandingPage extends Page {
  get privacyPolicyModal() {
    return $(".ajs-modal");
  }

  get privacyPolicyModalCloseButton() {
    return $("button.ajs-button.ajs-ok");
  }

  get getCoverPage() {
    return $(".cover-page");
  }

  get signinBtn() {
    return $("li.signin");
  }
  get signinModal() {
    return $(".popup-signin");
  }

  get langSwitcher() {
    return $("ul.lang-switcher");
  }

  get thLangBtn() {
    return $("ul.lang-switcher li:nth-child(1)");
  }

  get engLangBtn() {
    return $("ul.lang-switcher li:nth-child(2)");
  }

  get movieLists() {
    return $$(".movie-card.flex-item");
  }

  public open() {
    return super.open("");
  }

  public async preparePageStartUp() {
    await expect(this.privacyPolicyModal).toBeExisting();
    await this.privacyPolicyModalCloseButton.click();
    await expect(this.privacyPolicyModal).not.toBeExisting();

    const isHaveCoverPage = (await this.getCoverPage).isExisting();
    if (isHaveCoverPage) {
      await this.getCoverPage.click();
      await expect(this.getCoverPage).not.toBeExisting();
    }
  }

  public async changeLanguage() {
    await expect(this.signinBtn).toBeExisting();

    const signInText = await (await this.signinBtn).getText();
    if (!signInText.match(/.*Login.*/g)) {
      await (await this.engLangBtn).click();
      await expect(this.signinBtn).toHaveTextContaining("Login");
    } else {
      await (await this.thLangBtn).click();
      await expect(this.signinBtn).toHaveTextContaining("เข้าสู่ระบบ");
    }
  }

  public async selectMovie(movieName: string) {
    const movieLists = await this.movieLists;

    for (const movieList of movieLists) {
      const movieTitle: string = await (
        await movieList.$("a")
      ).getAttribute("title");

      if (movieTitle === movieName) {
        await movieList.scrollIntoView();
        await movieList.$("a").click();
        break;
      }
    }
  }
  public async openLoginModal() {
    await expect(this.signinBtn).toBeExisting();
    await (await this.signinBtn).click();
    await expect(this.signinModal).toBeExisting();
  }
}

export default new LandingPage();
