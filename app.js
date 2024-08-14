function fetchData() {
  const div = document.querySelector(".row");
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => {
      for (const key in data) {
        let { title, category, description, image, price, rating } = data[key];
        const stars = Math.round(rating.rate);
        div.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="card text-black">
                        <img src=${image}
                            class="card-img-top p-4" style="height:300px;"  alt="Apple Computer" />
                        <div class="card-body">
                            <div>
                                <h5 class="card-title text-start my-2" style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">${title}</h5>
                                <p class="text-muted mb-4" style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">${description}</p>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between">
                                    <span>Category</span><span>${category}</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span>Rating</span><span>${rating.rate}
                                    ${'<i class="fa-solid fa-star text-warning"></i>'.repeat(
                                      stars
                                    )}</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between fw-bold mt-4">
                                <span>Price</span><span>$${price}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
      }
    })
    .catch((err) => console.log(err));
}

fetchData();
