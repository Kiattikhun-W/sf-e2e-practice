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

  get movieMenuBtn() {
    return $(".navigation.nav-normal >ul > li:nth-child(2) > a");
  }

  get movieLists() {
    return $$(".movie-card.flex-item");
  }

  public open() {
    return super.open("");
  }

  public async preparePageStartUp() {
    await this.privacyPolicyModalCloseButton.click();

    const isHaveCoverPage: boolean = await (
      await this.getCoverPage
    ).isExisting();
    if (isHaveCoverPage) {
      await this.getCoverPage.click();
    }
  }

  public async changeLanguage() {
    const signInText = await (await this.signinBtn).getText();
    if (!signInText.match(/.*Login.*/g)) {
      await (await this.engLangBtn).click();
    } else {
      await (await this.thLangBtn).click();
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
    await (await this.signinBtn).click();
  }
  public async openMovieMenu() {
    await (await this.movieMenuBtn).click();
  }
}

export default new LandingPage();
