const aboutButton = document.getElementById("t-about");
const schemaButton = document.getElementById("t-schema");
const articlesButton = document.getElementById("t-articles");

const aboutArea = document.getElementById("about-area");
const schemaArea = document.getElementById("schema-area");
const articlesArea = document.getElementById("articles-area");

let currentArea = aboutArea;

function switchDisplayArea(areaToShow, previousArea) {
  if (areaToShow === currentArea) {
    return;
  } else {
    areaToShow.classList.add("show-data");
    previousArea.classList.remove("show-data");
    currentArea = areaToShow;
  }
}

aboutButton.addEventListener("click", () => {
  switchDisplayArea(aboutArea, currentArea);
});

schemaButton.addEventListener("click", () => {
  switchDisplayArea(schemaArea, currentArea);
});

articlesButton.addEventListener("click", () => {
  switchDisplayArea(articlesArea, currentArea);
});

// preparing and drawing T-Shape Engineer schema
const schemaData = {
  name: "Technologies",
  value: 100,
  children: [
    {
      name: "DataBases",
      value: 75,
      children: [
        {
          name: "MySQL",
          value: 25,
        },
        {
          name: "MongoDB",
          value: 25,
        },
        {
          name: "PostgreSQL",
          value: 25,
        },
      ],
    },
    {
      name: "Microservices",
      value: 75,
    },
    {
      name: "Security",
      value: 75,
    },
    {
      name: "DevOps",
      value: 75,
    },
  ],
};
const schemaCanvas = d3.select("#schema-canvas");

function preparingSchemaArea() {
  const circlePack = d3.pack().size([500, 500]).padding(10);
  const root = d3.hierarchy(schemaData).sum(function (data) {
    return data.value;
  });

  circlePack(root);

  let node = schemaCanvas
    .selectAll(".node")
    .data(root)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (data) {
      return "translate(" + data.x + " " + data.y + ")";
    })
    .append("g")
    .attr("class", "graph");

  node
    .append("circle")
    .attr("r", function (data) {
      return data.r;
    })
    .attr("fill", "#e2e2e2")
    .attr("opacity", 0.25)
    .attr("stroke", "#e2e2e2")
    .attr("stroke-width", 2);

  node.append("text").text(function (schema) {
    return schema.data.children ? "" : schema.data.name;
  });
}
preparingSchemaArea();

// preparing and drawing T-Shape Engineer articles graph
const articlesData = {};
const articlesCanvas = d3.select("#articles-canvas");

function preparingArticleArea() {
  articlesCanvas
    .append("text")
    .attr("x", 235)
    .attr("y", 250)
    .attr("fill", "black")
    .text("A TREE OF ARTICLES");
}
preparingArticleArea();
