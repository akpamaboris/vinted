import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

import banner from "../vinted_banner.jpeg";

import Header from "./Header.js";

function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
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
      <Header />

      <div className="banner">
        <img src={banner} alt="banner of vinted" />
        <div className="text">
          <p>Prêts à faire du tri dans vos placards?</p>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <main>
        {data.offers.map((x, index) => {
          return (
            <Link to={{ pathname: `/offer/${index}`, data: { data } }}>
              <div key={index} className="gallery-img">
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
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
