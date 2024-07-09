export default class {
    constructor(params) {
        this.params = params
    }

    setTitle(title) {
        document.title = title
    }

    async getHtml() {
        return ""
    }

    async getRates() {
        const apiUrl = 'https://openexchangerates.org/api/latest.json'
        const apiKey = '02f8a01dcac74e70ac40ad2d1e82d795'

        const baseCurrency = 'USD'
        const targetCurrencies = ['EUR', 'GBP', 'JPY']

        const urlSpecific = `${apiUrl}?app_id=${apiKey}&base=${baseCurrency}&symbols=${targetCurrencies.join(',')}`;
        const url = `${apiUrl}?app_id=${apiKey}&base=${baseCurrency}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const exchangeRates = data.rates;
            return exchangeRates;
        }   catch (error) {
            const errorMessage = `Error fetching exchange rates: ${error.message}`;
            throw new Error(errorMessage);
        }
    }
}