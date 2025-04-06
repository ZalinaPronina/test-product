class ProductCard extends HTMLElement {
    constructor() {
      super();
      // Initialize the product handle and variant inputs for the product card
      this.productHandle = this.getAttribute('data-product-handle');
      this.variantIdInputs = this.querySelectorAll('input.swatch-input__input');
  
      // If there are variant inputs, add event listeners for the change event
      if (this.variantIdInputs) {
        this.variantIdInputs.forEach(input => {
          input.addEventListener('change', (event) => {
            this.variantIdInputs.forEach(input => {
              input.checked = false;
            });
            event.target.checked = true;

            const selectedOptionId = event.target.id;
            this._renderProductVariant(selectedOptionId);
          });
        });
      }
    }

    // Method to render the product variant based on the selected option
    _renderProductVariant(optionId) {
      fetch(`/products/${this.productHandle}?section_id=product-card-info&option_values=${optionId}`)
      .then(response => response.text())
      .then(data => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = data;
        // Function to update content from source to destination element
        const updateSourceFromDestination = (id, shouldHide = (source) => false) => {
          const source = tempElement.querySelector(`#${id}`);
          const destination = this.querySelector(`#${id}`);
          if (source && destination) {
            destination.innerHTML = source.innerHTML;
            destination.classList.toggle('hidden', shouldHide(source));
          }
        };
        // Update price and sale badge visibility
        updateSourceFromDestination('price');
        updateSourceFromDestination('sale-badge', ({ classList }) => classList.contains('hidden'));

        this._updateProductImages(tempElement)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    // Method to update product images (main and hover images)
    _updateProductImages(html) {
      const imageTypes = ['main', 'hover'];
      // Iterate over each image type (main, hover)
      imageTypes.forEach(type => {
        const selector = `[data-image-type="${type}"]`;
        const source = html.querySelector(selector);
        const destination = this.querySelector(selector);
        if (destination) {
          if (source) {
            // If source image exists, replace the destination image HTML with source image HTML
            destination.outerHTML = source.outerHTML;
          } else {
            // If no source image, hide the destination image
            destination.classList.add('hidden');
          }
        }
      });
    }
  }
  
  customElements.define('product-card', ProductCard);
  
  