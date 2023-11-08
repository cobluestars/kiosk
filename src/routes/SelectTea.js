import "./SelectTea.css";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import closebtn from "../media/closebtn.png";
import plus from "../media/plus.png";
import minus from "../media/minus.png";
import coffee from "../media/coffee.png";
import extra from "../media/extra.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function SelectTea() {
  const barcode_data = [
    {
      id: 1,
      barcode: "KOKEE_1000",
      name: "블랙 리치",
      price: 5000,
      image: "./img/Signature/Black Lychee.png",
      desc: "블랙티와 리치의 조화로운 맛을 느낄 수 있는 음료입니다.",
      icedonly: false,
      extra_price: 500,
    },
    {
      id: 2,
      barcode: "KOKEE_3003",
      name: "삼다수 300mL",
      price: 1000,
      image: "./img/etc/samdasoo.png",
      desc: "단순여과와 자외선 살균 과정만 거친 자연그대로의 좋은 미네랄을 함유한 건강에 유익한 물",
      icedonly: false,
      extra_price: 0,
      no_option: true,
    },
    {
      id: 3,
      barcode: "KOKEE_2002",
      name: "트레비 300mL",
      price: 1000,
      image: "./img/etc/trebi.png",
      desc: "트레비는 이탈리아의 전통적인 레시피로 만들어진 천연 미네랄 탄산수입니다.",
      icedonly: false,
      extra_price: 0,
      no_option: true,
    },
    {
      id: 4,
      barcode: "KOKEE_4004",
      name: "시나몬롤",
      price: 3000,
      image: "./img/etc/cinamon.png",
      desc: "시나몬롤입니다.",
      icedonly: false,
      extra_price: 0,
      no_option: true,
    },
    {
      id: 5,
      barcode: "KOKEE_5005",
      name: "컵케이크",
      price: 3000,
      image: "./img/etc/cupcake.png",
      desc: "컵케이크입니다.",
      icedonly: false,
      extra_price: 0,
      no_option: true,
    },
  ];
  const data = [
    {
      name: "Signature",
      products: [
        {
          id: 1,
          name: "블랙 리치",
          price: 5000,
          image: "./img/Signature/Black Lychee.png",
          desc: "블랙티와 리치의 조화로운 맛을 느낄 수 있는 음료입니다.",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 2,
          name: "드래곤과 장미",
          price: 5000,
          image: "./img/Signature/Dragon and Rose.png",
          desc: "청포도와 장미의 조화로운 맛을 느낄 수 있는 음료입니다.",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 3,
          name: "나비의 꿈",
          price: 5000,
          image: "./img/Signature/Dream Of Butterfly.png",
          desc: "청포도와 자몽의 조화로운 맛을...",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 4,
          name: "조지아 온 마이 마인드",
          price: 5000,
          image: "./img/Signature/Georgia On My Mind.png",
          desc: "제주 한라봉의 달콤한 맛을 느낄 수 있는 음료입니다.",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 5,
          name: "망고 패션후르츠",
          price: 5000,
          image: "./img/Signature/Mango Passionfruit.png",
          desc: "망고와 패션후르츠의 조화로운 맛을 느낄 수 있는 음료입니다. ",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 6,
          name: "퍼플 러브",
          price: 5000,
          image: "./img/Signature/Purple Love.png",
          desc: "블루베리의 달콤한 맛을 느낄 수 있는 음료입니다.",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 7,
          name: "샌프란시스코의 장미",
          price: 5000,
          image: "./img/Signature/Rose From San Francisco.png",
          desc: "자몽의 아름다운 맛을 느낄 수 있는 음료입니다.",
          icedonly: false,
          extra_price: 500,
        },
      ],
    },
    {
      name: "Cold Cloud",
      products: [
        {
          id: 8,
          name: "브라운슈가 콜드브루",
          price: 5000,
          image: "./img/Cold Cloud/Brown Sugar Cold Brew.png",
          desc: "흑설탕과 우유의 시원한 맛을 느낄 수 있는 음료입니다.",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 9,
          name: "브라운슈가 달고나라떼",
          price: 5000,
          image: "./img/Cold Cloud/Brown Sugar Dalgonatte.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 10,
          name: "오레오 브라운슈가",
          price: 5000,
          image: "./img/Cold Cloud/Oreo Brown Sugar.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 11,
          name: "솜사탕 콜드브루",
          price: 5000,
          image: "./img/Cold Cloud/Sweet Cloud Cold Brew.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 12,
          name: "솜사탕 그린티",
          price: 5000,
          image: "./img/Cold Cloud/Sweet Cloud Green Brew.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
      ],
    },
    {
      name: "Ice Blended",
      products: [
        {
          id: 13,
          name: "용과",
          price: 5000,
          image: "./img/Ice Blended/Dragonfruit.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 14,
          name: "리치",
          price: 5000,
          image: "./img/Ice Blended/Lychee.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 15,
          name: "망고",
          price: 5000,
          image: "./img/Ice Blended/Mango.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 16,
          name: "아이스망고 패션후르츠",
          price: 5000,
          image: "./img/Ice Blended/Ice Mango Passionfruit.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 17,
          name: "말차",
          price: 5000,
          image: "./img/Ice Blended/Matcha.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 18,
          name: "오레오",
          price: 5000,
          image: "./img/Ice Blended/Oreo.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 19,
          name: "피나콜라다",
          price: 5000,
          image: "./img/Ice Blended/Pina Colada.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 20,
          name: "스트로베리",
          price: 5000,
          image: "./img/Ice Blended/Strawberry.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 21,
          name: "타로",
          price: 5000,
          image: "./img/Ice Blended/Taro.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
      ],
    },
    {
      name: "KOKEE Fruit Tea",
      products: [
        {
          id: 22,
          name: "청포도 차",
          price: 5000,
          image: "./img/Fruit Tea/Green Grape Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 23,
          name: "허니 자몽 블랙티",
          price: 5000,
          image: "./img/Fruit Tea/Honey Grapefruit Black Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 24,
          name: "오렌지 상그리아",
          price: 5000,
          image: "./img/Fruit Tea/Orange Sangria.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 25,
          name: "스트로베리 버진 모히토",
          price: 5000,
          image: "./img/Fruit Tea/Strawberry Virgin mojito.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
      ],
    },
    {
      name: "Milk Tea",
      products: [
        {
          id: 26,
          name: "브라운슈가 밀크티",
          price: 5000,
          image: "./img/Milk Tea/Brown Sugar Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 27,
          name: "클래식 차이티",
          price: 5000,
          image: "./img/Milk Tea/Classic Thai Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 28,
          name: "코코넛 밀크티",
          price: 5000,
          image: "./img/Milk Tea/Coconut Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 29,
          name: "커피 밀크티",
          price: 5000,
          image: "./img/Milk Tea/Coffee Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 30,
          name: "허니 밀크티",
          price: 5000,
          image: "./img/Milk Tea/Honey Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 31,
          name: "하우스 밀크티",
          price: 5000,
          image: "./img/Milk Tea/House Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 32,
          name: "코키 밀크티",
          price: 5000,
          image: "./img/Milk Tea/KOKEE Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 33,
          name: "말차 라떼",
          price: 5000,
          image: "./img/Milk Tea/Matcha Latte.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 34,
          name: "오레오 밀크티",
          price: 5000,
          image: "./img/Milk Tea/Oreo Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
        {
          id: 35,
          name: "스트로베리 밀크티",
          price: 5000,
          image: "./img/Milk Tea/Strawberry Milk Tea.png",
          desc: "기본 설명",
          icedonly: false,
          extra_price: 500,
        },
      ],
    },
  ];
  const [current, setCurrent] = useState(data[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_2, setIsOpen_2] = useState(false);

  const [count, setCount] = useState(1);
  const [isiced, setIsiced] = useState(true);
  const [regular, setRegular] = useState(true);
  const [orderdata, setOrderdata] = useState(null);
  const navigate = useNavigate();
  const [basket, setBasket] = useState([]);
  const [totalprice, setTotalprice] = useState(0);
  const [category, setCategory] = useState("밀크티");
  const [filtered, setFiltered] = useState([]);
  const [cookies, setCookie] = useCookies(["basket"]);
  const [barcodeerror, setBarcodeerror] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    filterdata(category);
  }, [category]);

  useEffect(() => {
    document.title = "메뉴 선택 | 코키티 키오스크";
  }, []);

  const filterdata = (category) => {
    let temp = [];
    if (category === "시그니처") {
      temp = data[0].products;
    } else if (category === "콜드 클라우드") {
      temp = data[1].products;
    } else if (category === "아이스 블렌디드") {
      temp = data[2].products;
    } else if (category === "과일차") {
      temp = data[3].products;
    } else if (category === "밀크티") {
      temp = data[4].products;
    }
    setFiltered(temp);
  };

  const changecount = (num) => {
    if (count + num < 1) {
      return;
    }
    setCount(count + num);
  };

  useEffect(() => {
    let temp = 0;
    basket.forEach((item) => {
      temp += item.price * item.count;
      0;
    });
    setTotalprice(temp);
  }, [basket]);

  const openModalHandler = () => {
    setCount(1);
    setIsiced(true);
    setRegular(true);
    setIsOpen(!isOpen);
  };

  const closeModalHandler = () => {
    setCount(1);
    setIsOpen(!isOpen);
  };

  function onClick(index) {
    setCurrent(filtered[index]);
    setIsOpen(true);
  }

  function click_tempature() {
    setIsiced(!isiced);
  }

  function click_size() {
    setRegular(!regular);
    current.price = regular ? current.price + 500 : current.price - 500;
  }

  function puttobasket() {
    let temp = {
      name: current.name,
      price: current.price,
      count: count,
      image: current.image,
      tempature: isiced ? "ICED" : "HOT",
      size: regular ? "Regular" : "Extra",
    };
    let flag = false;
    let temp2 = [...basket];
    temp2.forEach((item) => {
      if (
        item.name === temp.name &&
        item.tempature === temp.tempature &&
        item.size === temp.size
      ) {
        item.count += temp.count;
        flag = true;
      }
    });
    if (!flag) {
      temp2.push(temp);
    }
    setBasket(temp2);
    closeModalHandler();
  }

  function gobuy_basket() {
    if (basket.length === 0) {
      return;
    }
    setCookie("basket", basket, { path: "/" });
    navigate("/purchase");
  }

  function basket_remove(index) {
    let temp = [...basket];
    temp.splice(index, 1);
    setBasket(temp);
  }

  function basket_addone(index) {
    let temp = [...basket];
    temp[index].count += 1;
    setBasket(temp);
  }

  function basket_minusone(index) {
    let temp = [...basket];
    temp[index].count -= 1;
    if (temp[index].count < 1) {
      temp.splice(index, 1);
    }
    setBasket(temp);
  }

  function change_category(category) {
    setCategory(category);
  }

  function limittext(text) {
    if (text.length > 10) {
      return text.substring(0, 9) + "...";
    } else {
      return text;
    }
  }

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  function onChange(e) {
    if (e.target.value.length >= 10) {
      setTimeout(() => {
        let flag = false;
        barcode_data.forEach((item) => {
          if (item.barcode === e.target.value) {
            setBarcodeerror(false);
            setCurrent(item);
            setIsOpen(true);
            setIsOpen_2(false);
            flag = true;
          }
        });
        if (!flag) {
          setBarcodeerror(true);
        }
      }, 100);
    }
  }

  function barcode_open() {
    setIsOpen_2(true);
  }

  function close_modal2() {
    setBarcodeerror(false);
    setIsOpen_2(false);
  }

  return (
    <div className="st_background">
      <button className="reset_button barcode_button" onClick={barcode_open}>
        <img src="/img/barcode.png"></img>
      </button>
      <Modal
        isOpen={isOpen}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "absolute",
            top: "60px",
            left: "40px",
            right: "40px",
            bottom: "80px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "25px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <div className="modal_inside">
          <img
            src={closebtn}
            className="closebtn"
            onClick={openModalHandler}
          ></img>
          <div className="modal_info">
            <img src={current.image} alt="달고나" className="modal_img" />
            <p className="modal_name">{current.name}</p>
            <p className="modal_desc">{current.desc}</p>
            <p className="modal_price">
              {/* {current.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 */}
            </p>
          </div>
          <div className="modal_counts">
            <img
              src={minus}
              onClick={() => changecount(-1)}
              className="modal_button_1"
            ></img>
            <p className="modal_count">{count}</p>
            <img
              src={plus}
              onClick={() => changecount(+1)}
              className="modal_button_1"
            ></img>
          </div>
          <br />
          <br />
          <div className={current.no_option ? "hidden" : ""}>
            <div className="modal_tea_options">
              <p className="tempature">온도</p>
              {current.icedonly ? (
                <p className="tempature_btn selected">ICED ONLY</p>
              ) : (
                <>
                  <p
                    className={
                      isiced ? "tempature_btn" : "tempature_btn selected"
                    }
                    onClick={click_tempature}
                  >
                    HOT
                  </p>
                  <p
                    className={
                      isiced ? "tempature_btn selected" : "tempature_btn"
                    }
                    onClick={click_tempature}
                  >
                    ICED
                  </p>
                </>
              )}
            </div>
            <br />
            <div className="modal_tea_options">
              <p className="text_size">사이즈</p>
              <div
                className={regular ? "size_btn selected_size" : "size_btn"}
                onClick={click_size}
              >
                <img src={coffee}></img>
                <p>Regular</p>
                <p>+0</p>
              </div>
              <div
                className={
                  regular ? "size_btn extra" : "size_btn extra selected_size"
                }
                onClick={click_size}
              >
                <img src={extra}></img>
                <p>Extra</p>
                <p>+{current.extra_price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_buttons">
          <p className="bottom_price">
            {(current.price * count)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
          <p onClick={puttobasket} className="bottom_buy">
            장바구니 담기 ▶
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={isOpen_2}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "absolute",
            top: "30%",
            left: "10%",
            right: "10%",
            bottom: "30%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "25px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <div className="modal_inside">
          <img src={closebtn} className="closebtn" onClick={close_modal2}></img>
          <br />
          <br />

          <div className="barcode_center">
            <img src="/img/barcode.png" className="barcode_modal_img"></img>
          </div>
          <p className={barcodeerror ? "barcode_txt red_txt" : "barcode_txt"}>
            {barcodeerror
              ? "등록되지 않은 상품입니다."
              : "바코드를 인식해주세요."}
          </p>
          <div className="barcode_center">
            <input
              type="text"
              className="barcode_input"
              ref={inputRef}
              onBlur={handleBlur}
              onChange={onChange}
              autoFocus
            ></input>
          </div>
        </div>
      </Modal>

      <div className="navbar">
        {/* <img className="kokee_logo" src="/img/코키티 로고.png"></img> */}
        <h2 onClick={() => navigate("/")} >KOKEE TEA</h2>
        <br />
        <div className="navbar_buttons">
          <button
            className={
              category === "밀크티"
                ? "reset_button cat_selected"
                : "reset_button"
            }
            onClick={() => change_category("밀크티")}
          >
            밀크티
          </button>
          <button
            className={
              category === "시그니처"
                ? "reset_button cat_selected"
                : "reset_button"
            }
            onClick={() => change_category("시그니처")}
          >
            시그니처
          </button>
          <button
            className={
              category === "과일차"
                ? "reset_button cat_selected"
                : "reset_button"
            }
            onClick={() => change_category("과일차")}
          >
            과일차
          </button>
          <button
            className={
              category === "콜드 클라우드"
                ? "reset_button cat_selected"
                : "reset_button"
            }
            onClick={() => change_category("콜드 클라우드")}
          >
            콜드 클라우드
          </button>
          <button
            className={
              category === "아이스 블렌디드"
                ? "reset_button cat_selected"
                : "reset_button"
            }
            onClick={() => change_category("아이스 블렌디드")}
          >
            아이스 블렌디드
          </button>
        </div>
      </div>
      <div className="tea_list">
        <ul>
          {filtered.map((item, index) => (
            <li key={index}>
              <div className="tea_list_item" onClick={() => onClick(index)}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="tea_list_img"
                />
                <p className="tl_item_name">{limittext(item.name)}</p>
                <p className="tl_item_price">
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="basket">
        {basket.map((item, index) => (
          <div className="basket_item" key={index}>
            <span className="basket_btn basket_count">{item.count}</span>
            <img
              src={closebtn}
              className="basket_btn basket_remove imgbtn"
              onClick={() => basket_remove(index)}
            ></img>
            <img src={item.image} className="basket_img"></img>
            <img
              src={plus}
              className="basket_btn basket_addone imgbtn"
              onClick={() => basket_addone(index)}
            ></img>
            <img
              src={minus}
              className="basket_btn basket_minusone imgbtn"
              onClick={() => basket_minusone(index)}
            ></img>
          </div>
        ))}
      </div>

      <button
        className={
          basket.length === 0 ? "basket_buy basket_hidden" : "basket_buy"
        }
        onClick={gobuy_basket}
      >
        {totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        <br />
        결제하기
      </button>
    </div>
  );
}
export default SelectTea;
