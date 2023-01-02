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
const articlesData = {
  name: "Introduction",
  link: "",
  children: [
    {
      name: "DevOps",
      link: "",
    },
    { 
      name: "Network",
      link: "",
    },
  ],
};
const articlesCanvas = d3.select("#articles-canvas");

function preparingArticleArea() {
  const articleTree = d3.tree().size([400, 400]);
  const nodes = d3.hierarchy(articlesData, data => data.children);

  articleTree(nodes);

  let node = articlesCanvas
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (data) {
      return "translate(" + data.x + " " + data.y + ")";
    });

  node
    .append("circle")
    .attr("r", 8)
    .attr("fill", "#e2e2e2");

  node.append("text").text(function (schema) {
    return schema.data.name;
  });

  articlesCanvas
    .selectAll(".link")
    .data(articleTree(nodes).links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("d", function(data) {
      return "M" + data.target.x + "," + data.target.y
      + "C" + (data.source.y + 200) + "," + data.source.x
      + " " + (data.source.y + 200) + "," + data.source.x
      + " " + data.source.x + "," + data.source.y
    });
}
preparingArticleArea();
