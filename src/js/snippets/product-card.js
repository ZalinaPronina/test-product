class ProductCard extends HTMLElement {
    constructor() {
      super();
      this.productHandle = this.getAttribute('data-product-handle');
      this.variantIdInputs = this.querySelectorAll('input.swatch-input__input');
  
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

    _renderProductVariant(optionId) {
      fetch(`/products/${this.productHandle}?section_id=product-card-info&option_values=${optionId}`)
      .then(response => response.text())
      .then(data => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = data;
        const updateSourceFromDestination = (id, shouldHide = (source) => false) => {
          const source = tempElement.querySelector(`#${id}`);
          const destination = this.querySelector(`#${id}`);
          if (source && destination) {
            destination.innerHTML = source.innerHTML;
            destination.classList.toggle('hidden', shouldHide(source));
          }
        };
        
        updateSourceFromDestination('price');
        updateSourceFromDestination('sale-badge', ({ classList }) => classList.contains('hidden'));
        this._updateProductImages(tempElement)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    _updateProductImages(html) {
      const imageTypes = ['main', 'hover'];
      imageTypes.forEach(type => {
        const selector = `[data-image-type="${type}"]`;
        const source = html.querySelector(selector);
        const destination = this.querySelector(selector);
        if (destination) {
          if (source) {
            destination.outerHTML = source.outerHTML;
          } else {
            destination.classList.add('hidden');
          }
        }
      });
    }
  }
  
  customElements.define('product-card', ProductCard);
  
  