import img from "../media/homepic.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import img1 from "../media/eatandgo.svg";
import img2 from "../media/pojang.svg";
import { useCookies } from "react-cookie";
import axios from "axios";
function Home() {
  const [cookies, setCookie] = useCookies(["basket"]);
  const [products, setProducts] = useCookies(["products"]);

  useEffect(() => {
    setCookie("basket", [], { path: "/" });
    setCookie("cardnumber", "", { path: "/" });
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   axios.get("/products.json").then((data) => {
  //     setProducts(data.data.categories);
  //   });
  // }, []);

  useEffect(() => {
    document.title = "홈 | 코키티 키오스크";
  }, []);

  return (
    <div className="home_background">
      <img src={img} alt="homepic" className="homepic" />
      <br />
      <Link to="/selecttea">
        <img src={img1} alt="먹고가기" className="eatandgo home_btn" />
      </Link>
      <Link to="/selecttea">
        <img src={img2} alt="포장하기" className="pojang home_btn" />
      </Link>
    </div>
  );
}
export default Home;
