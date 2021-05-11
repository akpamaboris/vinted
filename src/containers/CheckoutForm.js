import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

import { Redirect } from "react-router-dom";

const CheckoutForm = ({ userToken, setUser }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const { data } = useLocation();

  let history = useHistory();

  let total = Math.round(data.product_price + 0.4 + 0.8);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {});
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          amount: total,
          title: data.product_description,
          name: data.product_description,
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let formCheck = () => {
    return (
      <>
        {!completed ? (
          <div className="container-check">
            <div className="check">
              <div>Résumé de la commande</div>

              <div>
                <span>Commande</span>
                <span>{data.product_price} €</span>
              </div>
              <div>
                <span>Frais protection acheteurs</span>
                <span>0.40€</span>
              </div>
              <div>
                <span>Frais de port</span>
                <span>0.80€</span>
              </div>
              <div>
                <span>Total</span>
                <span>{total}€</span>
              </div>
              <div>
                <span>
                  Il ne vous reste qu'une étape pour vous offrir votre
                  {data.product_details[0].MARQUE} . Vous allez payer {total} €
                  (frais de protection et frais de port inclus).
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <CardElement
                className="card"
                options={{
                  style: {
                    base: {
                      fontSize: "26px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <button className="button-check" type="submit">
                Valider
              </button>
            </form>
          </div>
        ) : (
          <>
            <span>
              Payement effectué, vous allez être redirigés vers l'accueil
              <span style={{ display: "none" }}>
                {setTimeout(() => {
                  history.push("/");
                }, 2000)}
              </span>
            </span>
          </>
        )}
      </>
    );
  };

  return <>{userToken ? formCheck() : <Redirect to="/login" />}</>;
};

export default CheckoutForm;
