function fetchData(value = "all") {

  const div = document.querySelector(".row");

  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerHTML = `<div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>`;
  div.innerHTML = ""; 
  div.appendChild(loader); 

  let apiUrl =
    value === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${value}`;


  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          "Category not found or no products available in this category"
        );
      }
      return res.json();
    })
    .then((data) => {
      div.innerHTML = ""; // Clear the loader

      if (data.length === 0) {
        div.innerHTML = "<p>No products found.</p>";
      } else {
        // Create and append product cards to avoid excessive innerHTML manipulation
        const productCards = data.map((product) => {
          const { title, category, description, image, price, rating } =
            product;
          const stars = Math.round(rating.rate);

          const card = document.createElement("div");
          card.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");
          card.innerHTML = `
            <div class="card text-black">
                <img src=${image} class="card-img-top p-4" style="height:300px;" alt="${title}" />
                <div class="card-body">
                    <div>
                        <h5 class="card-title text-start my-2" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</h5>
                        <p class="text-muted mb-4" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${description}</p>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between">
                            <span>Category</span><span>${category}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Rating</span><span>${
                              rating.rate
                            } ${'<i class="fa-solid fa-star text-warning"></i>'.repeat(
            stars
          )}</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between fw-bold mt-4">
                        <span>Price</span><span>$${price}</span>
                    </div>
                </div>
            </div>`;
          return card;
        });

        // Append all product cards at once
        div.append(...productCards);
      }
    })
    .catch((err) => {
      console.log(err);
      div.innerHTML = "<p>Error fetching products. Please try again later.</p>";
    });
}

document
  .querySelector("#categorySelect")
  .addEventListener("change", (event) => {
    let category = event.target.value;
    fetchData(category);
  });

// Trigger fetchData on page load with default value 'all'
window.addEventListener("load", () => {
  fetchData("all"); // Fetch all products by default
});
