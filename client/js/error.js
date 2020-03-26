'use strict';

export function errorMessage(error) {
  window.location.href = '../html/error.html';
  let errorBox = document.querySelector(".errorBox");
  errorBox.textContent = error;
}