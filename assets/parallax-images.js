if (!customElements.get('parallax-images')) {
  class ParallaxImages extends HTMLElement {
    constructor() {
      super();
      this.options = Object.assign({
        relativeInput: false,
        clipRelativeInput: false,
        hoverOnly: false,
        inputElement: null,
        calibrateX: false,
        calibrateY: true,
        invertX: true,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 10,
        scalarY: 10,
        frictionX: 0.1,
        frictionY: 0.1,
        originX: 0.5,
        originY: 0.5,
        pointerEvents: false
    }, JSON.parse(this.dataset.parallax ? this.dataset.parallax : '{}'))
    }

    connectedCallback() {
      const parallaxInstance = new Parallax(this, this.options)
      this.sortHeights()
    }

    sortHeights() {
      let height = 0
      const images = this.querySelectorAll('.parallax-images__image')
      images.forEach(image => {
        if (image.offsetHeight * 2 > height) height = image.offsetHeight * 2
      })
      this.style.height = height + 'px'
      this.style.marginBottom = height * -1 + 'px'
    }
  }

  customElements.define('parallax-images', ParallaxImages);
}
