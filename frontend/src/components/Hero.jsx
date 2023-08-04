import React from "react";

function Hero() {
  return (
    <div class="px-4 pt-5 my-5 text-center border-bottom">
    <h1 class="display-4 fw-bold text-body-emphasis">Kitchen Buddy</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">No More Thinking What To Make Just What Not To Make</p>
    </div>
    <div class="overflow-hidden">
      <div class="container px-5">
        <img src="https://www.thedailymeal.com/img/gallery/the-most-popular-fast-food-restaurants-the-year-you-were-born/intro-1680536027.jpg" class="img-fluid border rounded-3 shadow-lg mb-4" alt="Burger And Chips" width="700" height="500" loading="lazy" />
      </div>
    </div>
  </div>
  );
}

export default Hero;
