const txtInputEl = document.getElementById("txt-input");
const txtResultEl = document.getElementById("txt-result");
const btnTranslateEl = document.getElementById("btn-translate")!;

btnTranslateEl.addEventListener("click", async (evt: Event) => {
  evt.preventDefault();

  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
      q: "big",
      source: "auto",
      target: "de",
      format: "text",
      api_key: "",
    }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(await res.json());
});
