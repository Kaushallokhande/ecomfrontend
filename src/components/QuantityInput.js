import { useState } from "react";

const QuantityInput = ({quantity, setQuantity }) => {

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setQuantity(value); // Update the state with the new value
    }
  };

  return (
    <div>
      <label className="text-black" htmlFor="quantity">
        Add the quantity
      </label>
      <input
        type="number"
        id="quantity"
        className="text-black"
        value={quantity} // Bind the input value to state
        onChange={handleQuantityChange} // Update state on change
        placeholder="Enter the quantity"
      />
    </div>
  );
};

export default QuantityInput;
