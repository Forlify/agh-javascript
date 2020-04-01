const template = document.createElement("template");

template.innerHTML = `
<table>
<tr id="row0"></tr>
<tr id="row1"></tr>
<tr id="row2"></tr>
<tr id="row3"></tr>
<tr id="row4"></tr>
<tr id="row5"></tr>
<tr id="row6"></tr>
<tr id="row7"></tr>
<tr id="row8"></tr>
<tr id="row9"></tr>
</table>
`;

class MyTable extends HTMLElement {
  constructor() {
    super();
    this.listOfElements = this.attachShadow({ mode: "open" });
    this.listOfElements.appendChild(template.content.cloneNode(true));

    this.rows = this.listOfElements.querySelectorAll("tr");
    this.score = 0;

    for (let i = 0; i < this.columns; i++) this.insertNewColumn()
  }

  get columns() {
    return this.getAttribute("columns");
  }

  set columns(val) {
    this.setAttribute("columns", val);
  }

  static get observedAttributes() {
    return ["columns"];
  }

  randomNumber() {
    return (Math.floor(Math.random() * 10) % 3) - 1;
  }

  randomTime() {
    return (Math.floor(Math.random() * 3000));
  }

  addToScore(button, add) {
    button.disabled = true;
    this.score = parseInt(this.score) + parseInt(add);
    let scoreEl = document.getElementById("score");
    scoreEl.innerHTML = this.score;
  }

  insertNewColumn() {
    this.rows.forEach(row => {
      let th = document.createElement('th');
      let button = document.createElement('button');

      let randomNumber = this.randomNumber().toString();
      button.innerHTML = randomNumber
      button.addEventListener("click", () => {
        this.addToScore(button, randomNumber)
      }, false)

      row.appendChild(th);
      th.appendChild(button)
    });
    this.columns = parseInt(this.columns) + 1
  }

  connectedCallback() {

    setInterval(() => {
      this.insertNewColumn()
      console.log(this.columns)
    }, this.randomTime());

    this.render();
  }

  attributeChangedCallback(prop, oldVal, newVal) {

  }

  render() {

  }
}

customElements.define("my-table", MyTable);
