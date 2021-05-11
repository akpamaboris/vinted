import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

//import components

function Offer() {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const newTo = {
    pathname: "/checkout",
    data: data,
  };
  return isLoading ? (
    <span>En cours de chargement ...</span>
  ) : (
    <div>
      <div className="card-offer">
        <div>
          <img src={data.product_image.secure_url} alt="display the product" />
        </div>
        <div className="card-prod">
          <div> {data.product_price} €</div>

          <div>
            {data.product_details[0].MARQUE ? (
              <span>MARQUE : {data.product_details[0].MARQUE}</span>
            ) : null}
          </div>
          <div>
            {data.product_details[2].COULEUR ? (
              <span>COULEUR : {data.product_details[2].COULEUR} </span>
            ) : null}
          </div>
          <div>
            <span>EMPLACEMENT : </span>
            {data.product_details[3].EMPLACEMENT}
          </div>
          <div>{data.product_description}</div>
          <div>{data.product_details[1].ÉTAT}</div>
          <div> {data.owner.account.username}</div>
          <Link to={newTo}>
            <button>Acheter</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Offer;
