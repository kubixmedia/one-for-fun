if (!customElements.get("delivery-countdown")) {
  class DeliveryCountdown extends HTMLElement {
    constructor() {
      super();
      this.cutoffHour = parseInt(this.dataset.cutoff);
      this.hour = "";
      this.minute = "";
      this.day = ""
      this.days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      this.init();

    }

    init() {
      this.getTime();
      const readableDay = this.days[this.day]
      if (this.dataset[readableDay] == 'false' || !this.dataset[readableDay]) return
      if (this.cutoffHour > this.hour || this.cutoffHour == 0) {
        this.calculateTime();
      } else {
        this.missedCutoff();
      }
    }
    getTime() {
      const currentDate = new Date();
      this.hour = currentDate.getHours();
      this.minute = currentDate.getMinutes();
      this.day = currentDate.getDay()
    }
    missedCutoff() {
      this.textContent = this.dataset.missed;
    }
    calculateTime() {
      // remove 1 hour to account for minutes
      let hours = this.cutoffHour - 1 - this.hour;
      if (this.cutoffHour == 0) {
        hours = 23 - this.hour;
      }
      let minutes = 60 - this.minute;
      if (minutes == 60) {
        // add an hour on and set to 0 so it says 3 hours instead of 2 hours 60 minutes
        hours = hours + 1;
        minutes = 0;
      }
      if (hours > 0) {
        this.innerHTML = this.dataset.hours
          .replace("{{ hours }}", hours)
          .replace("{{ minutes }}", minutes);
      } else {
        this.innerHTML = this.dataset.minutes.replace(
          "{{ minutes }}",
          minutes
        );
      }
    }
  }

  customElements.define("delivery-countdown", DeliveryCountdown);
}