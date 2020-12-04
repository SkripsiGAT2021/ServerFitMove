const app = getDom("#app");
const roomKey = getDom("#roomKey");

/**
 *
 * @param {String} message
 */
const showError = (message) => {
  const modal = getDom(".error-connection");
  modal.style.display = "flex";
  modal.querySelector("h1").innerHTML = message;
};
