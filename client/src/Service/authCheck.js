import axios from "axios";
import { useState } from "react";

export const authCheck = () => {
  let accessToken = localStorage.getItem("user-token");
  if (accessToken) {
    return axios
      .get("http://localhost:8080/jwt-check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
  }
};
