import React from "react";
import "../styles/components/header.css";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import Mealdblogo from "../asserts/mealdblogo.png";

export default function Header() {
  return (
    <div className="headercon">
      <ul>
        <li>
          <img src={Mealdblogo} alt="" />
        </li>
        <li>
          <button type="button">Home</button>
        </li>
        <li>
          <button type="button">Api</button>
        </li>
        <li>
          <button type="button">Forum</button>
        </li>
        <li>
          <FaFacebookSquare style={{ fontSize: 30, color: "blue" }} />
        </li>
        <li>
          <AiFillTwitterSquare style={{ fontSize: 30, color: "skyblue" }} />
        </li>
        <li>
          <input className="searchbar" type="text" placeholder="Search" />
        </li>
      </ul>
    </div>
  );
}
