import abstractView from "./abstractView.js"
export default class extends abstractView {
    constructor(params) {
        super(params);
        this.setTitle("Converter")
    }

    getInput() {
        document.addEventListener('DOMContentLoaded', function() {
            const selectElement = document.getElementById("from");
            const from = selectElement.value;
            const selectE = document.getElementById("to");
            const to = selectE.value;
            console.log(from);
            console.log(to);
        })
    }

    async getHtml() {
        try {
            const exchangeRates = await this.getRates();
            const exchangeList = Object.entries(exchangeRates).map(([currency, rate]) => `<<option value="${currency}">${currency}</option>`).join('');
            return `
            <h1>Converter</h1>
            <script src="/static/views/converter.mjs"></script>
            <ul id="amount"></ul>
            <form>
            <select id="from" onclick="getInput()">
            ${exchangeList}
            </select>
            <select id="to" onclick="getInput()">
            ${exchangeList}
            </select>
            <input type="text" name="amount" placeholder="Enter the amount">
            <button type="submit">Convert</button>
            </form>
        `
          } catch (error) {
            return `<h1>Error</h1><p>${error.message}</p>`;
          }
    }
}
