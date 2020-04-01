const template = document.createElement("template");

template.innerHTML = `
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
<my-counter count="10"></my-counter>
`;

class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.listOfElements = this.attachShadow({ mode: "open" });
        this.listOfElements.appendChild(template.content.cloneNode(true));

        this.licznik = document.getElementById("liczba");
        this.counters = this.listOfElements.querySelectorAll("my-counter");
    }

    get value() {
        return this.getAttribute("value");
    }

    set value(val) {
        this.setAttribute("value", val);
    }

    static get observedAttributes() {
        return ["value"];
    }

    updateCounters(newValue) {
        if (newValue >= 0) {
            this.counters.forEach(counter => {

                counter.setAttribute("count", newValue);
            });
        }
    }
    connectedCallback() {

        setInterval(() => {
            this.value--;
        }, 1000);

        this.licznik.addEventListener("input", e => {
            this.value = e.target.value;
            this.updateCounters(e.target.value);
        });
        this.render();
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "value") {
            this.updateCounters(newVal);
            if (newVal == "0") this.render();
        }
    }

    render() {
        this.licznik.value = this.value;
    }
}

customElements.define("my-component", MyComponent);
