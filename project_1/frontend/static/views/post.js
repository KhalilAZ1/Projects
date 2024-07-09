import AbstractView from "./abstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Exchange rates");
    }

    async getHtml() {
        return `
            <h1>Exchange rates</h1>
            <ul id="exchange-list"></ul>
        `
    }
}