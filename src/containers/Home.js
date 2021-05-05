import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Offer from "./Offer";
import { Link, useParams } from "react-router-dom";

import logo from "../vinted-logo.png";
import banner from "../vinted_banner.jpeg";

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
      <header>
        <img src={logo} alt="Logo of Vinted" />
        <input type="text" />
        <button>S'inscrire</button>
        <button>Se connecter</button>
        <button>Vends tes articles</button>
      </header>
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
            <Link to="/offer" id={x.owner.account.username}>
              <div
                key={index}
                className="gallery-img"
                onClick={() => console.log(x)}
              >
                <div className="product">
                  {x.owner.account.username}
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
