import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

//import components
import Header from "./Header.js";

function Offer() {
  const { id } = useParams();
  let location = useLocation();
  console.log(location);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
    <span>En cours de chargement ...</span>
  ) : (
    <div>
      <Header />

      <div className="card-offer">
        <div>
          <img
            src={data.offers[id].product_image.secure_url}
            alt="display the product"
          />
        </div>
        <div className="card-prod">
          <div> {data.offers[id].product_price} €</div>

          <div>
            <span>MARQUE :</span>
            {data.offers[id].product_details[0].MARQUE}
          </div>
          <div>
            <span>COULEUR : </span>
            {data.offers[id].product_details[2].COULEUR}
          </div>
          <div>
            <span>EMPLACEMENT : </span>
            {data.offers[id].product_details[3].EMPLACEMENT}
          </div>
          <div>{data.offers[id].product_description}</div>
          <div>{data.offers[id].product_details[1].ÉTAT}</div>
          <div> {data.offers[id].owner.account.username}</div>

          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
}

export default Offer;
