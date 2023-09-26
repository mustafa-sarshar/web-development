const txtUsernameEl = document.getElementById("username");
const fileImageEl = document.getElementById("image");
const imgPreviewContainerEl = document.getElementById("img-preview_container");
const imgPreviewEl = document.getElementById("img-preview");
const btnSubmitEl = document.getElementById("btn-submit");

fileImageEl.addEventListener("change", (evt) => {
  imgPreviewContainerEl.classList.add("hidden");

  const file = evt.target.files[0];

  if (file) {
    const fileReader = new FileReader();
    let fileData;

    fileReader.onload = () => {
      fileData = fileReader.result;
      imgPreviewEl.setAttribute("src", fileData);
      imgPreviewContainerEl.classList.remove("hidden");
    };
    fileReader.readAsDataURL(file);
  }
});

btnSubmitEl.addEventListener("click", (evt) => {
  evt.preventDefault();
  const fd = new FormData();
  fd.append("username", txtUsernameEl.value);
  fd.append("image", fileImageEl.value);

  for (let pair of fd.entries()) {
    console.log(pair[0], pair[1]);
  }
});
