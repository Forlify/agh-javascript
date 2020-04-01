const cTemplate = document.createElement("template");
cTemplate.innerHTML = `
<span>0</span>
`;

class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({ mode: "open" });
        this.element.appendChild(cTemplate.content.cloneNode(true));
        this.displayEl = this.element.querySelector("span");
    }

    get count() {
        return this.getAttribute("count");
    }

    set count(val) {
        console.log(val)
        this.setAttribute("count", val);
    }

    static get observedAttributes() {
        return ["count"];
    }

    connectedCallback() {}

    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "count") this.render();
    }

    render() {
        this.displayEl.textContent = this.count;
    }
}

customElements.define("my-counter", MyCounter);
