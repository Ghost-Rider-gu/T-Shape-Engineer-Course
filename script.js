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
const schemaCanvas = d3.select("#schema-canvas");
d3.json("assets/topics.json").then(function (data) {
  preparingSchemaArea(data);
});

function preparingSchemaArea(topicsData) {
  const circlePack = d3.pack().size([500, 500]).padding(25);
  const root = d3.hierarchy(topicsData).sum(function (data) {
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
    .attr("class", "circle")
    .attr("r", function (data) {
      return data.r;
    })
    .attr("fill", "#d56b4d")
    .attr("opacity", 0.25)
    .attr("stroke", "#f89d42")
    .attr("stroke-width", 2);

  const startAngle = Math.PI * 0.1;
  const labelArc = d3
    .arc()
    .innerRadius(function (data) {
      return data.r - 5;
    })
    .outerRadius(function (data) {
      return data.r + 10;
    })
    .startAngle(startAngle)
    .endAngle(function (d) {
      const total = d.data.name.length;
      const step = 10 / d.r;
      return startAngle + total * step;
    });

  const groupLabels = schemaCanvas
    .selectAll(".group")
    .data(root)
    .enter()
    .append("g")
    .attr("class", "group")
    .attr("transform", function (data) {
      return `translate(${data.x}, ${data.y})`;
    });

  groupLabels
    .append("path")
    .attr("class", "group-arc")
    .attr("id", function (data, i) {
      return `arc${i}`;
    })
    .attr("d", labelArc);

  groupLabels
    .append("text")
    .attr("class", "group-label")
    .attr("x", 5)
    .attr("dy", 7)
    .append("textPath")
    .attr("xlink:href", function (data, i) {
      return `#arc${i}`;
    })
    .text(function (d) {
      return !d.data.children ? "" : d.data.name;
    });

  node.append("text").text(function (schema) {
    return schema.data.children ? "" : schema.data.name;
  });
}

// preparing and drawing T-Shape Engineer articles graph
const articlesCanvas = d3.select("#articles-canvas");

function preparingArticleArea(articlesData) {
  const articleTree = d3.tree().size([400, 400]);
  const nodes = d3.hierarchy(articlesData, (data) => data.children);

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

  node.append("circle").attr("r", 8).attr("fill", "#e2e2e2");

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
    .attr("d", function (data) {
      return (
        "M" +
        data.target.x +
        "," +
        data.target.y +
        "C" +
        (data.source.y + 200) +
        "," +
        data.source.x +
        " " +
        (data.source.y + 200) +
        "," +
        data.source.x +
        " " +
        data.source.x +
        "," +
        data.source.y
      );
    });
}
