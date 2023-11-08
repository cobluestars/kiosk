import { useEffect, useState, useRef } from "react";
import "./pos.css";
function Pos() {
  const [data, setData] = useState([]);
  const [totalprice, setTotalprice] = useState(0);
  const inputRef = useRef();
  const [loaded, setLoaded] = useState(false);

  const barcode_data = [
    {
      id: 1,
      barcode: "KOKEE_1000",
      name: "케이크",
      price: 3000,
      image: "./img/etc/cake.png",
      desc: "케이크입니다.",
      icedonly: false,
      extra_price: 0,
      no_option: true,
    },
    {
      id: 2,
      barcode: "KOKEE_2002",
      name: "치즈케이크",
      price: 3000,
      image: "./img/etc/cheesecake.png",
      desc: "치즈케이크입니다.",
      icedonly: false,
      extra_price: 0,
      no_option: true,
    },
    {
      id: 3,
      barcode: "KOKEE_3003",
      name: "와플",
      price: 3000,
      image: "./img/etc/waffle.png",
      desc: "와플입니다.",
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

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    document.title = "KOKEE POS";
  }, []);

  function onChange(e) {
    if (e.target.value.length >= 10) {
      setTimeout(() => {
        let flag = false;
        barcode_data.forEach((item) => {
          if (item.barcode === e.target.value) {
            let temp = {
              id: item.id,
              name: item.name,
              price: item.price,
              count: 1,
            };
            setData([...data, temp]);
            flag = true;
            e.target.value = "";
          }
        });
        if (!flag) {
          e.target.value = "";
        }
      }, 100);
    }
  }

  function changecount(id, count) {
    let temp = data;
    temp[id].count += count;
    if (temp[id].count <= 0) {
      temp.splice(id, 1);
    }
    setData([...temp]);
  }

  function reset_data() {
    setData([]);
  }

  useEffect(() => {
    let temp = 0;
    data.forEach((item) => {
      temp += item.price * item.count;
    });
    setTotalprice(temp);
  }, [data]);

  return (
    <div>
      <table className="pos_table">
        <thead>
          <tr className="pos_th">
            <th>번호</th>
            <th>상품명</th>
            <th>단가</th>
            <th>수량</th>
            <th>금액</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="pos_tr">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="pos_countbtn"
                    onClick={() => changecount(index, -1)}
                  >
                    -
                  </button>
                  {item.count}
                  <button
                    className="pos_countbtn"
                    onClick={() => changecount(index, 1)}
                  >
                    +
                  </button>
                </td>
                <td>{item.price * item.count}</td>
                <td>
                  <button className="pos_deletebtn">삭제</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>합계 : {totalprice}원</p>
      <button className="pos_buybutton">구매</button>
      <button className="pos_buybutton" onClick={reset_data}>
        초기화
      </button>

      <input
        type="text"
        className="barcode_input"
        ref={inputRef}
        onBlur={handleBlur}
        onChange={onChange}
        autoFocus
      ></input>
    </div>
  );
}
export default Pos;
