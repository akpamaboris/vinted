import { useParams, useLocation } from "react-router-dom";

//import components
import Header from "./Header.js";

function Offer({ name }) {
  const { id } = useParams();
  let location = useLocation();
  console.log(location);
  console.log(location.data.data.offers[id].owner.account.username);

  return (
    <div>
      <Header />
      <div className="card-offer">
        <div>
          <img
            src={location.data.data.offers[id].product_image.secure_url}
            alt="display the product"
          />
        </div>
        <div className="card-prod">
          <div> {location.data.data.offers[id].product_price} €</div>

          <div>
            <span>MARQUE :</span>
            {location.data.data.offers[id].product_details[0].MARQUE}
          </div>
          <div>
            <span>COULEUR : </span>
            {location.data.data.offers[id].product_details[2].COULEUR}
          </div>
          <div>
            <span>EMPLACEMENT : </span>
            {location.data.data.offers[id].product_details[3].EMPLACEMENT}
          </div>
          <div>{location.data.data.offers[id].product_description}</div>
          <div>{location.data.data.offers[id].product_details[1].ÉTAT}</div>
          <div> {location.data.data.offers[id].owner.account.username}</div>

          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
}

export default Offer;
