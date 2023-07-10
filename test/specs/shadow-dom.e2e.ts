describe("shadow dom shop", () => {
  it("Can open shop page", async () => {
    await browser.url("https://shop.polymer-project.org/");
    const shopPage = await $("shop-app");
    await shopPage.shadow$("shop-home");
    const shopHome = await shopPage.shadow$("shop-home");
    await shopHome.shadow$("shop-button");
    const shopButton = await shopHome.shadow$("shop-button");
    await shopButton.click();
  });
});
