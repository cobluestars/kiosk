import { Link } from "react-router-dom";
import "./purchase.css";
import img1 from "../media/buy.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function purchase() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [totalprice, setTotalprice] = useState(0);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [cookies, setCookie] = useCookies(["basket"]);
  const [cardnumber, Setcardnumber] = useCookies(["cardnumber"]);

  useEffect(() => {
    if (!loaded) {
      let temp = cookies.basket;
      setData(temp);
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    let temp = 0;
    data.forEach((item) => {
      temp += item.price * item.count;
    });
    setTotalprice(temp);
  }, [data]);

  useEffect(() => {
    document.title = "결제하기 | 코키티 키오스크";
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line
  }, []);
  function onChange(e) {
    if (e.target.value.length >= 30) {
      setTimeout(() => {
        try {
          navigate("/done?data=" + inputRef.current.value.toString());
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    }
  }

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  async function payFunction() {
    try {
      const result = await axios.post(
        "http://192.168.10.121:8080/kokee/kiosk",
        data
      );
      navigate("/done?data=" + inputRef.current.value.toString());
    } catch (error) {
      alert("네트워크에 오류가 있어요.");
    }
  }

  return (
    <div className="buy_screen">
      <p className="buy_text_1">
        <span className="text_blue">신용카드</span>를
      </p>
      <p className="buy_text_2">투입구에 꽂아주세요</p>
      <p className="buy_text_3">
        결제 오류 시 마그네틱을 아래로 향하게 긁어주세요
      </p>
      <img
        src={img1}
        className="buy_img"
        onClick={() =>
          navigate("/done?data=" + inputRef.current.value.toString())
        }
      ></img>
      <br />
      카드번호 :
      <input
        ref={inputRef}
        type="password"
        className="card_input"
        size={34}
        onBlur={handleBlur}
        onChange={onChange}
      />
      <div className="bottom_1">
        <span className="bottom_text_1">총 결제 금액</span>
        <span className="bottom_text_2">
          <span className="bottom_text_bold">
            {totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          원
        </span>
      </div>
      <br />
      <button className="buy_go" onClick={payFunction}>
        결제
      </button>
      <Link to="/" className="buy_cancel">
        결제취소
      </Link>
    </div>
  );
}
export default purchase;
