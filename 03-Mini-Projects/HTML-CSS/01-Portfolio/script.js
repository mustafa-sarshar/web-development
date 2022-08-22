const txtEmailEl = document.querySelector("#email");
const txtMessageEl = document.querySelector("#message");
const btnSubmitEl = document.querySelector("#submit");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript (accessed on 22.08.2022)
const validateEmail = emailAddress => String(emailAddress).toLowerCase().match(EMAIL_REGEX);

btnSubmitEl.addEventListener("click", (event) => {
    event.preventDefault();
    const email = txtEmailEl.value.replace(/\s/g,'');
    const msg = txtMessageEl.value.replace(/\s/g,'');

    console.log(typeof validateEmail(email));
    if ((!validateEmail(email)) | (msg.length === 0))
        alert("Something went wrong!!!\nPlease try again.");
    else
        alert(`Sender: ${email}\nMessage: ${msg}\nThank you for your message!!!`);
})


  