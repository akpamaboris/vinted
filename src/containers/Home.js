import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

//import React Slider andStyled Component
import ReactSlider from "react-slider";
import styled from "styled-components";

//import the Vinted banner
import banner from "../vinted_banner.jpeg";
import React from "react";

//import the Switch
import Switch from "react-switch";

//import anonyous image
import anonymous from "../anonymous.png";

const StyledSlider = styled(ReactSlider)`
  width: 25%;
  height: 15px;
`; // this handles the slider slider

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  font-size: 7px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  position: relative;
  bottom: 40px;
`;

//this handles the buttons

const Thumb = (props, state) => (
  <StyledThumb {...props}>{`${state.valueNow} €`}</StyledThumb>
);

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "black" : props.index === 1 ? "#0BAEB7" : "#ddd"};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sliderMinPrice, setSliderMinPrice] = useState(20);
  const [sliderMaxPrice, setSliderMaxPrice] = useState(50);
  const [checked, setChecked] = useState(false);

  const minSlider = 1;
  const maxSlider = 400;

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    console.log("nextChecked", nextChecked);
    if (nextChecked === true) {
      data.sort(function (a, b) {
        return b.product_price - a.product_price;
      });
      let cop_2 = [...data];
      setData(cop_2);
    }
    if (nextChecked === false) {
      data.sort(function (a, b) {
        return a.product_price - b.product_price;
      });
      let cop_ = [...data];
      setData(cop_);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <div>
        <div className="sl-price">
          <span>Trier par prix</span>
          <span>
            <Switch
              onChange={handleChange}
              checked={checked}
              offColor="#08f"
              onColor="#0ff"
              offHandleColor="#0ff"
              onHandleColor="#08f"
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    color: "orange",
                    paddingRight: 2,
                  }}
                >
                  ⬆️
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    color: "blue",
                    paddingRight: 2,
                  }}
                >
                  ⬇️
                </div>
              }
            />
          </span>

          <span className="pr-ent">Prix entre </span>
          <StyledSlider
            defaultValue={[sliderMinPrice, sliderMaxPrice]}
            className="Slider-Price"
            renderTrack={Track}
            renderThumb={Thumb}
            onChange={(val) => {
              setSliderMinPrice(val[0]);
              setSliderMaxPrice(val[1]);
            }}
            max={maxSlider}
            min={minSlider}
          />
        </div>
      </div>
      <div className="banner">
        <img src={banner} alt="banner of vinted" />
        <div className="text">
          <p>Prêts à faire du tri dans vos placards?</p>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <main>
        {console.log(data)}
        {data.map((x, index) => {
          return x.product_price >= sliderMinPrice &&
            x.product_price <= sliderMaxPrice ? (
            <>
              <Link to={{ pathname: `/offer/${index}`, data: { data } }}>
                {console.log(x)}
                <div className="gallery-img" key={index}>
                  <div className="product">
                    <div className="bar-img-user">
                      <span>
                        {x.owner.account.avatar ? (
                          <img
                            src={x.owner.account.avatar.secure_url}
                            alt="user avatar"
                            className="avatar-img"
                          />
                        ) : (
                          <img
                            src={anonymous}
                            alt="user avatar"
                            className="avatar-img"
                          />
                        )}
                      </span>
                      <span>{x.owner.account.username}</span>
                    </div>

                    <img
                      className="img-prod"
                      src={x.product_image.secure_url}
                      alt="product"
                    />

                    <div className="price-bar">
                      <span>{x.product_price}</span> <span>€</span>
                    </div>
                    <div className="size-clothe">
                      <span>{x.product_details[1].TAILLE}</span>
                    </div>
                    <div className="brand">
                      <span>{x.product_details[0].MARQUE}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ) : null;
        })}
      </main>
    </div>
  );
}

export default Home;
