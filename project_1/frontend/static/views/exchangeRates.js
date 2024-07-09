import AbstractView from "./abstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Exchange rates");
    }

    async getHtml() {
        try {
          const exchangeRates = await this.getRates();
          const exchangeList = Object.entries(exchangeRates).map(([currency, rate]) => `<li>${currency}: ${rate}</li>`).join('');
          return `
            <h1>Exchange Rates</h1>
            <ul>${exchangeList}</ul>
          `;
        } catch (error) {
          return `<h1>Error</h1><p>${error.message}</p>`;
        }
      }
      
}