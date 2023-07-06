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

  get signIn() {
    return $("li.signin");
  }

  get langSwitcher() {
    return $("ul.lang-switcher");
  }

  get engLang() {
    return $("ul.lang-switcher li:nth-child(2)");
  }

  get movieLists() {
    return $$(".movie-card.flex-item");
  }

  public open() {
    return super.open("");
  }

  public async changeLanguage() {
    const signInText = await (await this.signIn).getText();
    if (!signInText.match(/.*Login.*/g)) {
      await (await this.engLang).click();
      await expect(this.signIn).toHaveTextContaining("Login");
    } else {
      await (await this.engLang).click();
      await expect(this.signIn).toHaveTextContaining("เข้าสู่ระบบ");
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
}

export default new LandingPage();
