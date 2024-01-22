const inputName = document.querySelector("#name");
const inputMail = document.querySelector("#email");
const submitBtn = document.querySelector("button");
const resMessage = document.querySelector("p");

const displayMessage = (message) => {
  resMessage.textContent = message;
  setTimeout(() => {
    resMessage.textContent = "";
  }, 5000);
};

const restoreInputs = () => {
  inputName.value = "";
  inputMail.value = "";
};

const makeTextRed = () => {
  resMessage.classList.remove("green");
  resMessage.classList.add("red");
};

const makeTextGreen = () => {
  resMessage.classList.remove("red");
  resMessage.classList.add("green");
};

// fetch function
const postSubscriber = async (e) => {
  e.preventDefault();

  const subscriber = {
    name: inputName.value,
    email: inputMail.value,
  };

  try {
    let response = await fetch("/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber),
    });

    restoreInputs();

    let result = await response.json();

    if (result.success) {
      makeTextGreen();
    } else {
      makeTextRed();
    }

    displayMessage(result.message);
  } catch (err) {
    makeTextRed();
    displayMessage(err);
  }
};

submitBtn.addEventListener("click", postSubscriber);
