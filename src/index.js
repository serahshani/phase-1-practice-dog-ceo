

document.addEventListener("DOMContentLoaded", () => {
    const dogBreedsUl = document.getElementById("dog-image-container");
    const baseUrl = "https://dog.ceo/api";
    const breedListUrl = `${baseUrl}/breeds/list/all`;
    //const imgUrl = `${baseUrl}/breed`;
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    // Fetch all dog breeds on page load
    fetch(breedListUrl)
        .then(response => response.json())
        .then(data => {
            const breedNames = Object.keys(data.message); // array of breed names

            // Populate breed list with all breeds
            breedNames.forEach(breedName => {
                const li = document.createElement("li");
                li.textContent = breedName;
                dogBreedsUl.appendChild(li);
            });

            // Event listener for breed letter selection change
            const breedLetterSelect = document.getElementById("breed-dropdown");
            breedLetterSelect.addEventListener("change", () => {
                const selectedLetter = breedLetterSelect.value.toLowerCase();
                // Filter breeds based on selected letter
                let child = dogBreedsUl.lastElementChild;
                while(child) {
                    dogBreedsUl.removeChild(child);
                    child = dogBreedsUl.lastElementChild;
                }
                breedNames.forEach(breedName => {
                    const li_ = document.createElement('li');
                    if (breedName.startsWith(selectedLetter)) {
                        li_.textContent = breedName;
                        dogBreedsUl.appendChild(li_);
                    } else {
                        li_.style.display = "none"; // Hide non-matching breeds
                    }
                });
            });

            fetchDogImages();
        })
        .catch(error => {
            console.error('Error fetching dog breeds:', error);
        });

    // Fetch dog images for initial breed selection
});

function fetchDogImages(breedName) {
    // Fetch dog images based on selected letter (default 'a')
    const selectedLetter = document.getElementById("breed-dropdown");
    const imageUrl = document.getElementById("dog-image-container")

    fetch(`${imgUrl}/${selectedLetter}/images/random/4`)
        .then(response => response.json())
        .then(data => {
            const images = data.message; // array of image URLs
            const dogImagesDiv = document.getElementById("dog-image-container");
            dogImagesDiv.innerHTML = ''; // Clear previous images

            images.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "dog-breeds";
                dogImagesDiv.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error fetching dog images:', error);
        });
}
