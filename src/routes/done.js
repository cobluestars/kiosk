import "./done.css";
import img1 from "../media/recipt.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
function done() {
  const [cookies, setCookie] = useCookies(["basket"]);
  const [ordernum, setOrdernum] = useState(0);
  const a4Notice = useRef();
  const [totalprice, setTotalprice] = useState(0);
  const [data, setData] = useState([]);
  const [currenttime, setCurrenttime] = useState("");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [ccn, setCcn] = useState("1234-56**-****-****");
  // const [printed, setPrinted] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get("data");

  useEffect(() => {
    if (dataParam) {
      try {
        setCcn(
          dataParam.slice(0, 4) + "-" + dataParam.slice(4, 6) + "-****-****"
        );
      } catch (error) {
        console.log("Error parsing data from URL:", error);
      }
    }
  }, [dataParam]);

  useEffect(() => {
    setData(cookies.basket);
    setOrdernum(parseInt(Math.random() * 1000));
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    setCurrenttime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    setLoaded(true);
  }, []);

  useEffect(() => {
    let temp = 0;
    data.forEach((item) => {
      temp += item.price * item.count;
    });
    setTotalprice(temp);
  }, [data]);

  const onPrintHandler = () => {
    try {
      const printContents = ReactDOM.findDOMNode(a4Notice.current).innerHTML;
      const windowObject = window.open(
        "",
        "PrintWindow",
        "width=1, height=1, top=0, left=0, location=no, toolbars=no, scrollbars=no, status=no, resizale=yes"
      );
      windowObject.document.writeln(printContents);
      windowObject.document.close();
      windowObject.focus();
      windowObject.print();
      windowObject.close();
    } catch (e) {
      console.log(e);
      setCookie("basket", [], { path: "/" });
      navigate("/");
    }
  };

  setTimeout(() => {
    setCookie("basket", [], { path: "/" });
    navigate("/");
  }, 3000);

  useEffect(() => {
    const timer = setTimeout(() => {
      onPrintHandler();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.title = "완료 | 코키티 키오스크";
  }, []);

  return (
    <>
      <div className="done">
        <p className="done_1">주문이 완료되었습니다</p>
        <p className="done_2">주문번호</p>
        <p className="done_3">{ordernum}</p>
        <p className="done_4">신용카드를 뽑은 후 출력된 영수증을 받아가세요</p>
        <img src={img1} className="done_img"></img>
      </div>
      <div style={{ display: "none" }}>
        <div
          ref={a4Notice}
          className="print_paper"
          style={{
            width: "5.8cm",
            minHeight: "21cm",
            padding: "0.3cm",
            margin: "0",
            borderRadius: "5px",
            background: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            position: "relative",
            fontSize: "0.8em",
          }}
        >
          <br />
          <h4
            className="print_title"
            style={{
              padding: "0",
              margin: "0",
              textAlign: "center",
              fontSize: "1em",
            }}
          >
            [영수증]
          </h4>
          <p style={{ margin: "0" }}>매장</p>
          <p style={{ margin: "0" }}>코키티 구로디지털점</p>
          <p style={{ margin: "0" }}>
            서울특별시 구로구 디지털로 300 지밸리비즈플라자 11층
          </p>
          <p style={{ margin: "0" }}>주문번호 : {ordernum}</p>
          <p style={{ margin: "0" }}>주문일시 : {currenttime}</p>
          <hr />
          <hr />
          <span>상품명</span>
          <span style={{ position: "absolute", right: "0.3cm" }}>수량</span>
          <hr />
          {loaded &&
            cookies.basket.map((item) => {
              return (
                <div key={item.name}>
                  <span>{item.name}</span>
                  <span style={{ position: "absolute", right: "0.3cm" }}>
                    {item.count}
                  </span>
                  <br />
                </div>
              );
            })}
          <hr />
          <hr />
          <span>공급가액</span>
          <span style={{ position: "absolute", right: "0.3cm" }}>
            {(totalprice * 0.9)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <br />
          <span>부가세</span>
          <span style={{ position: "absolute", right: "0.3cm" }}>
            {(totalprice * 0.1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <hr />
          <hr />
          <span>합계</span>
          <span style={{ position: "absolute", right: "0.3cm" }}>
            {totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <hr />
          <hr />
          <p style={{ margin: "0" }}>신용카드</p>
          <p style={{ margin: "0" }}>승인금액 : {totalprice}</p>
          <p style={{ margin: "0" }}>할부개월 : 00</p>
          <p style={{ margin: "0" }}>승인번호 : {ordernum}</p>
          <p style={{ margin: "0" }}>승인일시 : 000000</p>
          <p style={{ margin: "0" }}>카드번호 : {ccn}</p>
          <p style={{ margin: "0" }}>발급사 : KB국민카드</p>
          <hr />
          <hr />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
export default done;
