import { Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ userToken, setUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState("");

  return userToken ? (
    <div>
      <h1>Publies ton annonce</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("condition", condition);
          formData.append("city", city);
          formData.append("brand", brand);
          formData.append("size", size);
          formData.append("color", color);
          formData.append("picture", file);

          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  Authorization: "Bearer " + userToken,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            alert(JSON.stringify(response.data));
          } catch (err) {
            if (err.response.status === 500) {
              console.error("An error occured");
            } else {
              console.error(err.response.data.msg);
            }
          }
        }}
        className="form-pub"
      >
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            name="description"
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="text"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </label>
        <label htmlFor="condition">
          Condition
          <input
            value={condition}
            type="text"
            name="condition"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
        </label>
        <label htmlFor="city">
          City
          <input
            value={city}
            type="text"
            name="city"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </label>
        <label htmlFor="brand">
          Brand
          <input
            value={brand}
            type="text"
            name="brand"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
        </label>
        <label htmlFor="size">
          Size
          <input
            value={size}
            type="text"
            name="size"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
        </label>
        <label htmlFor="color">
          Color
          <input
            value={color}
            type="text"
            name="color"
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
        </label>
        <label htmlFor="submitFile">
          <input
            type="file"
            name="submitFile"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </label>
        <label>
          <input type="submit" />
        </label>
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
