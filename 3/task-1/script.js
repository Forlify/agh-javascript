const body = document.querySelector("body");
const def = { ...body.styles };
function setStyle() {
    let title = document.querySelector(".title");
    title.style.color = "black";
    title.style.transition = "color 500ms ease-in";

    let main = document.querySelector("main");

    main.style.width = "20rem";
    main.style.margin = "1rem 0";
    main.style.clear = "left";

    let nav = document.querySelector("nav");

    nav.style.width = "10rem";
    nav.style.margin = "1rem 0";
    nav.style.float = "left";

    let azure = document.querySelectorAll(".azure");
    for (i = 0; i < azure.length; i++) {
        azure[i].style.background = "lightblue";
        azure[i].style.padding = "1rem 0.4rem";
        azure[i].style.border = ".1rem solid black";
        azure[i].style.boxShadow = "0 0 .4rem black";
    }

    let aside = document.querySelector("aside");
    aside.style.width = "20rem";
    aside.style.margin = "1rem 0";
    aside.style.float = "right";

    let h1 = document.querySelectorAll("h1");
    for (i = 0; i < h1.length; i++) {
        h1[i].style.margin = "0";
    }

    let mainH1 = document.querySelector("main > h1");

    mainH1.style.animation = "colors 2s infinite alternate-reverse";
}



function reformat(node) {
    node.style = def;
    for (let i = 0; i < node.children.length; i++) {
      node.children[i].style = def;
  
      if (node.children[i].children.length != 0) {
        reformat(node.children[i]);
      }
    }
  };

function deleteStyle() {
    reformat(body);
}