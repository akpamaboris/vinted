import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

import banner from "../vinted_banner.jpeg";
import ReactSlider from "react-slider";

import React from "react";
import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 40px;
`; // this handles the slider slider

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`;

//this handles the buttons

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);

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
        <StyledSlider
          defaultValue={[sliderMinPrice, sliderMaxPrice]}
          renderTrack={Track}
          renderThumb={Thumb}
          onChange={(val) => {
            setSliderMinPrice(val[0]);
            setSliderMaxPrice(val[1]);
          }}
          max="400"
          min="1"
        />
      </div>
      <div className="banner">
        <img src={banner} alt="banner of vinted" />
        <div className="text">
          <p>Prêts à faire du tri dans vos placards?</p>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <main>
        {data.offers.map((x, index) => {
          return x.product_price >= sliderMinPrice &&
            x.product_price <= sliderMaxPrice ? (
            <>
              <Link
                key={index}
                to={{ pathname: `/offer/${index}`, data: { data } }}
              >
                <div className="gallery-img">
                  <div className="product">
                    <div className="bar-img-user">
                      {x.owner.account.username}
                      <img
                        src={x.owner.account.avatar.secure_url}
                        alt="user avatar"
                        className="avatar-img"
                      />
                    </div>
                    <img
                      className="img-prod"
                      src={x.product_pictures[0].secure_url}
                      alt="product"
                    />
                    <span>{x.product_price} euros</span>
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
