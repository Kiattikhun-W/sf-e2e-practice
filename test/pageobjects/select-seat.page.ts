import Page from "./page.js";
class SelectSeat extends Page {
  get seatButton() {
    return (seatName: string) => {
      return $(`button[seatname="${seatName}"]`);
    };
  }

  public async selectSeat(seats: string[]) {
    for (const seat of seats) {
      await (
        await this.seatButton(seat)
      ).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      if ((await this.seatButton(seat)).isEnabled()) {
        await this.seatButton(seat).click();
        // await expect(await this.seatButton(seat)).toHaveAttributeContaining(
        //   "class",
        //   "seat-selected"
        // );
      }
    }
  }
}
export default new SelectSeat();
