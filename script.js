const aboutButton = document.getElementById('t-about');
const schemaButton = document.getElementById('t-schema');
const articlesButton = document.getElementById('t-articles');

const aboutArea = document.getElementById('about-area');
const schemaArea = document.getElementById('schema-area');
const articlesArea = document.getElementById('articles-area');

let currentArea = aboutArea;

function switchDisplayArea(areaToShow, previousArea) {
    if (areaToShow === currentArea) {
        return;
    } else {
        areaToShow.classList.add('show-data');
        previousArea.classList.remove('show-data');
        currentArea = areaToShow;
    }
};

aboutButton.addEventListener('click', () => {
    switchDisplayArea(aboutArea, currentArea);
});

schemaButton.addEventListener('click', () => {
    switchDisplayArea(schemaArea, currentArea);
});

articlesButton.addEventListener('click', () => {
    switchDisplayArea(articlesArea, currentArea);
});
