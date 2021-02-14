import React from 'react';
import QuantityDropdown from "../QuantityDropdown/QuantityDropdown";

const UserCardContent = (props) => {
    return (
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{props.name}</p>
              <p className="subtitle is-6">${props.price} per {props.unitSize}-{props.unitType}</p>
              <p className="subtitle is-6">{props.description}</p>
              <QuantityDropdown
                dropDownState = {props.dropDownState}
                setDropDownState = {props.setDropDownState}
              />
            </div>
          </div>
          <footer className="card-footer">
                {props.quantity === 0 ? (
                  <div className="card-footer-item">Out of Stock</div>
                ) : (
                  <button
                    href="#"
                    className="card-footer-item"
                    onClick={props.handleAddClick}
                  >
                    Add
                  </button>
                )}
          </footer>
        </div>
    );
};

export default UserCardContent;