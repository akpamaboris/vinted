import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Offer(props) {
  const { id } = useParams();
  return <h2>Offer {id}</h2>;
}

export default Offer;
