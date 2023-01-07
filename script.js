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
const articlesCanvas = document.getElementById("articles-canvas");
d3.json("assets/articles.json").then(function (data) {
  preparingArticleArea(data);
});

function preparingArticleArea(articlesData) {
   new d3.mitchTree.boxedTree()
      .setData(articlesData)
      .setAllowFocus(true)
      .setElement(articlesCanvas)
      .setIdAccessor(function(data) {
        return data.id;
      })
      .setChildrenAccessor(function(data) {
        return data.children;
      })
      .setBodyDisplayTextAccessor(function(data) {
        return data.description;
      })
      .setTitleDisplayTextAccessor(function(data) {
        return (`<a href="#"> ${data.name} </a>`);
      })
      .setOrientation("topToBottom")
      .initialize();
}
