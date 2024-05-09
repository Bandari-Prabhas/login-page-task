const accessKey = "YjgmC9qyPVtVGAUhSoWnbpwkHxFq_Xgb6a2XdjparpE";
const formEl = document.querySelector(".head");
const inputEl = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const showMore = document.getElementById("show-more");

let page = 1;

async function searchImages() {
    const inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if (page === 1) {
        searchResults.innerHTML = ""; // Clear existing results
    }
    results.forEach(result => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

// Add event listener for "Generate Image" button
document.getElementById('search-button').addEventListener('click', () => {
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
