const deleteProduct = (btn) => {
  const productId = btn.parentNode.querySelector("[name=productId]").value;
  const csrfToken = btn.parentNode.querySelector("[name=_csrf]").value;
  const productEl = btn.closest("article");

  fetch(`/admin/delete-product/${productId}`, {
    method: "delete",
    headers: {
      "csrf-token": csrfToken,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((jsonData) => {
      productEl.parentNode.removeChild(productEl);
      console.log(jsonData);
    })
    .catch((error) => {
      console.log(error);
    });
};
