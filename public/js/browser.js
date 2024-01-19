const inputName = document.querySelector("#name");
const inputMail = document.querySelector("#email");
const submitBtn = document.querySelector("button");

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

    inputName.value = "";
    inputMail.value = "";

    let result = await response.json();
    alert(result.message);
  } catch (err) {
    alert(err.message);
  }
};

submitBtn.addEventListener("click", postSubscriber);
