import { renderHeader } from "./header.js";

let cookie = localStorage.getItem("user");

const initApp = () => {
  sessionStorage.removeItem("postLoginRedirect");
  if (cookie) {
    window.location.href = "/user/bmi.html";
  } else {
    const getHtml = document.querySelector("#overlay");
    getHtml?.remove();
    renderHeader();
  }
};

initApp();
