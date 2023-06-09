import Header from "components/header";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Card from "components/card";
import MealIcon from "../asserts/mealicon.png";
import "../styles/pages/dashboard.css";
import Apis from "../api/api";

export default function dashboardone() {
  const [filtereddata, setfiltereddata] = useState([]);
  const [selectedmealdata, setselectedmealdata] = useState([]);
  const [mealselected, setmealselected] = useState(false);
  const [showshippingdetails, setshowshippingdetails] = useState(false);
  const [shippingdetails, setshippingdetails] = useState({});
  const [showalldetails, setshowalldetails] = useState(false);

  // const [showmealsdetails, setshowmealsdetails] = useState(false);
  useEffect(() => {
    const Meals = async (data) => {
      try {
        await Apis.filterbyletter(data)
          .then((res) => {
            setfiltereddata(res.data.meals);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log("error while fetching data");
      }
    };

    Meals("c");
  }, []);

  const Filtermeals = async (data) => {
    try {
      await Apis.filterbyletter(data)
        .then((res) => {
          setfiltereddata(res.data.meals);
        })
        .catch(() => {
          // console.log(err);
        });
    } catch (error) {
      console.log("error while fetching data");
    }
  };
  const SearchbyName = async () => {
    const data = document.getElementById("searchfilterid").value;

    try {
      await Apis.filterbyname(data)
        .then((res) => {
          console.log(res.data.meals);
          setfiltereddata(res.data.meals);
        })
        .catch(() => {
          // console.log(err);
        });
    } catch (error) {
      console.log("error while fetching data");
    }
  };

  const apicall = (data) => {
    Filtermeals(data);
  };
  const checkoutfn = () => {
    setshowshippingdetails(true);
    document.getElementById("selmealconid").style.filter = "blur(20px)";
  };
  // eslint-disable-next-line consistent-return
  const savedata = () => {
    const address = document.getElementById("textareaid").value;
    const phoneno = document.getElementById("phonenoid").value;
    const Name = document.getElementById("nameid").value;
    const Quantity = document.getElementById("quantityid").value;

    if (
      address.length === 0 ||
      phoneno.length === 0 ||
      Name.length === 0 ||
      Quantity.length === 0
    ) {
      return alert("Fill all details");
    }

    const data = {
      Address: address,
      Phoneno: phoneno,
      Name,
      Quantity,
    };
    setshippingdetails(data);
    setshowshippingdetails(false);
    setshowalldetails(true);
    document.getElementById("selmealconid").style.display = "none";
  };
  // console.log(state);
  return (
    <div className="dashboardcon">
      <Header />

      <div className="dash_head_con">
        <img src={MealIcon} alt="" />
        <div className="center_con_dash">
          <h1>Welcome to The Meal Db</h1>
          <p>
            Welcome to TheMealDB: An open, crowd-sourced database of Recipes
            from around the world. We also offer a free JSON API for anyone
            wanting to use it, with additional features for subscribers.
          </p>
        </div>
        <img src={MealIcon} alt="" />
      </div>
      <hr className="first_line" />
      <div className="searchmealcon">
        <input
          className="searchmealbar"
          id="searchfilterid"
          type="text"
          placeholder="Search"
        />
        <span className="bisearch_spn">
          <BiSearchAlt2 size="1.4em" onClick={() => SearchbyName()} />
        </span>
      </div>
      <h4 className="serbynane">Search By Name</h4>
      <hr className="second_line" />
      {!mealselected && (
        <div className="Meals_Coloumn">
          <h5 className="conhead">Meals</h5>
          <div>
            {filtereddata?.map((x, i) => {
              return (
                <Card
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  mealicon={x.strMealThumb}
                  title={x.strMeal}
                  data={x}
                  fn={setselectedmealdata}
                  fn1={setmealselected}
                />
              );
            })}
          </div>
        </div>
      )}
      {mealselected && (
        <div className="selmealcon" id="selmealconid">
          <h1>Meal details</h1>
          <div className="selectedmealscon">
            <img src={selectedmealdata.strMealThumb} alt="" />
            <div className="selecmealsinnercon">
              <h3>Meal id : {selectedmealdata?.idMeal}</h3>
              <h4>Ingredients</h4>
              <p>1.{selectedmealdata?.strIngredient1}</p>
              <p>2.{selectedmealdata?.strIngredient2}</p>
              <p>3.{selectedmealdata?.strIngredient3}</p>
              <p>4.{selectedmealdata?.strIngredient4}</p>

              {selectedmealdata?.strIngredient5 !== null && (
                <p>5.{selectedmealdata?.strIngredient5}</p>
              )}
              {selectedmealdata?.strIngredient6 !== null && (
                <p>6.{selectedmealdata?.strIngredient6}</p>
              )}
              {selectedmealdata?.strIngredient7 !== null && (
                <p>7.{selectedmealdata?.strIngredient7}</p>
              )}
              {selectedmealdata?.strIngredient8 !== null && (
                <p>8.{selectedmealdata?.strIngredient8}</p>
              )}
              <button
                type="button"
                className="checkoutbtn"
                onClick={() => checkoutfn()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      {showshippingdetails && (
        <div className="shippingcon">
          <p>Shipping Address</p>
          <textarea placeholder="Address" id="textareaid" />
          <p>Contact Details</p>
          <input placeholder="phoneno" id="phonenoid" />
          <p>Name</p>
          <input placeholder="name" id="nameid" />
          <p>Quantity</p>
          <input placeholder="quantity" id="quantityid" />
          <div>
            <button
              className="savebtn"
              type="button"
              onClick={() => savedata()}
            >
              save
            </button>
          </div>
        </div>
      )}
      {showalldetails && (
        <div className="selmealcon alldetcon" id="selmealconid">
          <h1>Order details</h1>
          <div className="selectedmealscon">
            <img src={selectedmealdata.strMealThumb} alt="" />
            <div>
              <h3>Meal id : {selectedmealdata?.idMeal}</h3>
              <h4>Ingredients</h4>
              <p>1.{selectedmealdata?.strIngredient1}</p>
              <p>2.{selectedmealdata?.strIngredient2}</p>
              <p>3.{selectedmealdata?.strIngredient3}</p>
              <p>4.{selectedmealdata?.strIngredient4}</p>
              {selectedmealdata?.strIngredient5 !== null && (
                <p>5.{selectedmealdata?.strIngredient5}</p>
              )}
              {selectedmealdata?.strIngredient6 !== null && (
                <p>6.{selectedmealdata?.strIngredient6}</p>
              )}
              {selectedmealdata?.strIngredient7 !== null && (
                <p>7.{selectedmealdata?.strIngredient7}</p>
              )}
              {selectedmealdata?.strIngredient8 !== null && (
                <p>8.{selectedmealdata?.strIngredient8}</p>
              )}
              <div className="orderdetailscon">
                <h5>
                  <span>Name</span>: {shippingdetails.Name}
                </h5>
                <h5>
                  <span>Quantity</span> :{shippingdetails.Quantity}
                </h5>
                <h5>
                  <span>Address</span> : {shippingdetails.Address}
                </h5>
                <h5>
                  <span>PhoneNo</span> :{shippingdetails.Phoneno}
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="filbylettercon">
        <h4>Browse By First Letter</h4>
        <div className="spn_let_con">
          <span className="spn_let" onClick={() => apicall("a")}>
            A
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("b")}>
            B
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("c")}>
            C
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("d")}>
            D
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("e")}>
            E
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("f")}>
            F
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("g")}>
            G
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("h")}>
            H
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("i")}>
            I
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("j")}>
            J
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("k")}>
            K
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("l")}>
            L
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("m")}>
            M
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("n")}>
            N
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("o")}>
            O
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("p")}>
            P
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("q")}>
            Q
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("r")}>
            R
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("s")}>
            S
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("t")}>
            T
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("u")}>
            U
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("v")}>
            V
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("w")}>
            W
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("x")}>
            X
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("y")}>
            Y
          </span>
          <span className="slach">/</span>
          <span className="spn_let" onClick={() => apicall("z")}>
            Z
          </span>
        </div>
      </div>
    </div>
  );
}
