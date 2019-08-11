function RotatingGallery() {
    // Constants
    const rotatingGallery = document.querySelector(".rotatingGallery"),
        rotatingGallerySlides = rotatingGallery.querySelector(".rotatingGallery-slides"),
        rotatingGallerySlide = rotatingGallerySlides.querySelectorAll(".rotatingGallery-slide"),
        rotatingGallerySlideCount = rotatingGallerySlide.length;
  
    /**
     * @function slide()
     *
     * Gets the data attribute of the gallery element that was clicked and based
     * on it's `data-arrival-index` value, we move the slides in the gallery
     * left or right.
     *
     * @returns null
     */
    function slide() {
      var dataArrivalAttribute = this.getAttribute("data-arrival-index");
  
      // Move slides to the left
      if (dataArrivalAttribute == 2) {
        slideDirection("right");
  
        // Move slides to the right
      } else if (dataArrivalAttribute == 4) {
        slideDirection("left");
      }
    }
  
    /**
     * @function slideDirection()
     *
     * The logic for how we move the slides in the gallery left and right
     *
     * @param direction {string} Either 'left' or 'right'
     * @returns null
     */
    function slideDirection(direction) {
      // Loop over all of the items in the gallery
      for (var i = 0; i < rotatingGallerySlideCount; i++) {
        var slide = rotatingGallerySlide[i],
          slideIndex = parseInt(slide.getAttribute("data-arrival-index")),
          leftSlideIndex = slideIndex - 1,
          rightSlideIndex = slideIndex + 1;
  
        // Move slides to the left
        if (direction == "left") {
          // The slides are numbered 1–X so if we are subtracting one from the index
          // of each slide so that they move to the left, we have to target the
          // element whose index would be `0` so that we can move it to the end
          // of the gallery and set the right data attribute
          if (leftSlideIndex === 0) {
            rotatingGallerySlides.appendChild(slide);
            slide.setAttribute("data-arrival-index", rotatingGallerySlideCount);
          } else {
            slide.setAttribute("data-arrival-index", leftSlideIndex);
          }
  
          // Move slides to the right
        } else if (direction == "right") {
          // The slides are numbered 1–X so if we are adding one to the index of
          // each slide so that they move to the right, we have to target the
          // element whose index would be (total slides + 1) so that we can move
          // it to the beginning of the gallery and set the right data attribute
          if (rightSlideIndex === rotatingGallerySlideCount + 1) {
            rotatingGallerySlides.insertAdjacentElement("afterbegin", slide);
            slide.setAttribute("data-arrival-index", 1);
          } else {
            slide.setAttribute("data-arrival-index", rightSlideIndex);
          }
        }
      }
    }
  
    /**
     * @function setGalleryHeight()
     *
     * Due to the CSS positioning used for the image gallery, we need to
     * dynamically update the size of our image gallery so that things stay
     * proportional as images change in size
     *
     * @returns null
     */
    function setGalleryHeight() {
      var slideHeight = rotatingGallerySlide[0].offsetHeight;
  
      rotatingGallery.style.paddingBottom = slideHeight + "px";
    }
  
    /**
     * @function init()
     *
     * Binds event listeners for the gallery interactions and run functions
     * necessary for initialization
     *
     * @returns null
     */
    function init() {
      rotatingGallerySlide.forEach(function(element) {
        element.addEventListener("click", slide);
      });
  
      setGalleryHeight();
    }
  
    return init();
  }
  
  /**
   * Initialize the gallery
   */
  window.addEventListener("load", function() {
    var gallery = new RotatingGallery();
  });
  
  window.addEventListener("resize", function() {
    var gallery = new RotatingGallery();
  });
  