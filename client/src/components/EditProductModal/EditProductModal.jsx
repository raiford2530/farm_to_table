import { useState, useEffect } from "react";
import API from "../../utils/API";
import productImages from "../../images.json";

const productType = [
  {
    value: "fruit",
    label: "fruit",
  },
  {
    value: "vegetable",
    label: "vegetable",
  },
  {
    value: "meat",
    label: "meat",
  },
  {
    value: "dairy",
    label: "dairy",
  },
];

const EditProductModal = (props) => {
  const [productObject, setProductObject] = useState({
    name: "",
    unitSize: 0,
    price: 0,
    quantity: 0,
    category: "",
    unitType: "",
    description: "",
    pathway: "",
  });

  const [errorMessage, setErrorMessage] = useState({});

  const validateForm = (value) => {
    let errors = {};
    let isValid = false;

    const regQuant = /^\d+$/;
    const regPrice = /^\d+(?:\.\d{1,2})?$/;

    // product name check
    if (!value.name.trim()) {
      errors.name = "Product Name required";
    }

    if (!value.unitSize) {
      errors.unitSize = "Unit size required";
    } else if (!regQuant.test(value.unitSize)) {
      errors.unitSize = "Enter a valid unit size";
    }

    if (!value.unitType) {
      errors.unitType = "Quantity required";
    }

    if (!value.description) {
      errors.description = "Description required";
    } else if (value.description.length > 50) {
      errors.description = "Description is too long (40 character limit)";
    }

    if (!value.price) {
      errors.price = "Price required";
    } else if (!regPrice.test(value.price)) {
      errors.price = "Enter a valid price";
    }

    if (Object.keys(errors).length === 0) {
      isValid = true;
    }

    setErrorMessage(errors);

    return isValid;
  };

  useEffect(() => {
    if (props.id) {
      API.getOneProduct(props.id).then((res) => {
        setProductObject({
          name: res.data.name,
          unitSize: res.data.unitSize,
          price: res.data.price,
          quantity: res.data.quantity,
          category: res.data.category,
          unitType: res.data.unitType,
          description: res.data.description,
          pathway: res.data.pathway,
        });
      });
    }
  }, [props.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductObject({ ...productObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let newPathway;

    let isValid = validateForm(productObject);

    if (isValid) {
      props.handleModalState();
      for (let i = 0; i < productImages.length; i++) {
        if (
          productImages[i].productName.includes(
            productObject.name.toLowerCase()
          )
        ) {
          newPathway = process.env.PUBLIC_URL + productImages[i].imagePathway;
        }
      }
      if (!newPathway) {
        let placeholder = "/assets/product_images/placeholder.png";
        newPathway = process.env.PUBLIC_URL + placeholder;
      }
      API.updateProduct(props.id, {
        name: productObject.name,
        unitSize: productObject.unitSize,
        price: productObject.price,
        quantity: productObject.quantity,
        category: productObject.category,
        unitType: productObject.unitType,
        description: productObject.description,
        pathway: newPathway,
      })
        .then(() => {
          props.handleModalState();
          props.loadProducts();
          setProductObject({
            name: "",
            unitSize: 0,
            price: 0,
            quantity: 0,
            category: "",
            unitType: "",
            description: "",
            pathway: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="modal-background"></div>
      <div className="modal-card is-mobile">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-centered add-product-headline">
            Edit Product
          </p>
        </header>
        <section className="modal-card-body">
          <form className="create-form">
            <div className="container has-text-centered">
              <div className="column is-10 is-offset-1">
                <img
                  title="Stock Image"
                  id="product-image-edit"
                  src="./assets/icons/addproducts.svg"
                  alt="fresh produce"
                  height="auto"
                />
                <br />

                {/* What kind of product it is */}

                <div className="field is-grouped is-grouped-centered">
                  <div className="field is-inline-block add-products-fields">
                    <label className="label">Category</label>
                    <div className="control">
                      <div className="select">
                        <select
                          id="selectCategoryEdit"
                          label="Select Type"
                          name="category"
                          onChange={handleInputChange}
                          value={productObject.category || ""}
                        >
                          {productType.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                          <option key="Out of Season" value="Out of Season">
                            Out of Season
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* the name of the product */}

                  <div className="field add-products-fields">
                    <label className="label">Product</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Strawberries"
                        id="productNameEdit"
                        onChange={handleInputChange}
                        name="name"
                        value={productObject.name || ""}
                      />
                    </div>
                    {errorMessage.name && (
                      <p className="addProd-errors">{errorMessage.name}</p>
                    )}
                  </div>

                  {/* This is the total number of "units" that are available to be sold. It is calculated for you as you enter the total amount of each product and the unit size to sell by. */}

                  <div className="field add-products-fields">
                    <label className="label">Quantity</label>
                    <div className="control">
                      <input
                        required
                        className="input"
                        type="number"
                        id="quantityEdit"
                        onChange={handleInputChange}
                        name="quantity"
                        value={productObject.quantity || 0}
                      />
                    </div>
                  </div>
                </div>

                <div className="field is-grouped is-grouped-centered">
                  {/* The size of which each unit will be sold (Example: you buy strawberries by the pound in most places, but costco sells them in 3 pound boxes. So a "unit" is either 1 pound or 3 pounds respectively.) */}

                  <div className="field add-products-fields">
                    <label className="label">Unit Size</label>
                    <div className="control">
                      <input
                        className="input"
                        id="unitSizeEdit"
                        min="1"
                        onChange={handleInputChange}
                        name="unitSize"
                        value={productObject.unitSize || 0}
                        required
                        type="number"
                      />
                    </div>
                    {errorMessage.unitSize && (
                      <p className="addProd-errors">{errorMessage.unitSize}</p>
                    )}
                  </div>

                  {/* The unit type the product will be sold by */}
                  <div className="field add-products-fields">
                    <label className="label">Unit Type</label>
                    <div className="control">
                      <input
                        className="input"
                        id="unitTypeEdit"
                        required
                        name="unitType"
                        placeholder="lbs"
                        value={productObject.unitType || ""}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    {errorMessage.unitType && (
                      <p className="addProd-errors">{errorMessage.unitType}</p>
                    )}
                  </div>

                  {/* the price at which each unit is sold per unit */}
                  <div className="field add-products-fields">
                    <label className="label">Price</label>
                    <div className="control has-icons-left">
                      <span className="icon is-small is-left">$</span>
                      <input
                        className="input"
                        id="productPriceEdit"
                        onChange={handleInputChange}
                        name="price"
                        value={productObject.price || 0}
                        data-type="currency"
                        required
                        type="number"
                      />
                    </div>
                    {errorMessage.price && (
                      <p className="addProd-errors">{errorMessage.price}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* description of the product */}

              <div className="field add-products-fields">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    type="text"
                    placeholder="Organic Strawberries"
                    multiline="true"
                    rows={2}
                    id="descriptionEdit"
                    variant="outlined"
                    onChange={handleInputChange}
                    name="description"
                    maxLength={50}
                    value={productObject.description || ""}
                  ></textarea>
                </div>
                {errorMessage.description && (
                  <p className="addProd-errors">{errorMessage.description}</p>
                )}
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot field is-grouped is-grouped-centered">
          <button
            className="button is-success"
            id="edit-save"
            onClick={handleFormSubmit}
          >
            Save
          </button>
          <button
            className="button"
            id="edit-cancel"
            onClick={props.handleModalState}
          >
            Cancel
          </button>
        </footer>
      </div>
    </>
  );
};

export default EditProductModal;
