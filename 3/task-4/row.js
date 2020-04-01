const cTemplate = document.createElement("template");
cTemplate.innerHTML = `<tr></tr>`;

class MyRow extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({ mode: "open" });
        this.element.appendChild(cTemplate.content.cloneNode(true));
        this.displayEl = this.element.querySelector("tr");
    }

    insertNewColumn() {
        
    }

    connectedCallback() { }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "count") this.render();
    }

    render() {
        this.displayEl.textContent = this.count;
    }
}

customElements.define("my-row", MyRow);
