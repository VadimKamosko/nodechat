let user;
document.querySelector("#btn").addEventListener("click", async () => {
  user = {
    name: document.querySelector("#email").value.toLowerCase(),
  };

  let response = await fetch("/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();
  second();
  console.log(result);
});
function second() {
  document.querySelector("#first").style.display = "none";
  document.querySelector(
    "#headersecond"
  ).textContent = `Введите код отправленный на почту ${user.name}`;
  document.querySelector("#second").style.display = "block";
}

document.querySelector("#btn-2").addEventListener("click", async () => {
  let code = { code: document.querySelector("#code").value, email: user.name };
  let response = await fetch("/checkcode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(code),
  });
  let result = await response.json();
  if (result.ans) {
    document.querySelector("#second").style.display = "none";
    document.querySelector("#third").style.display = "block";
  }
});

document.querySelector("#btn-3").addEventListener("click", async () => {
  if (document.querySelector("#newpass").value == document.querySelector("#repeat").value) {
    let usernewPass = {
      name: user.name,
      password: document.querySelector("#newpass").value,
    };
    let response = await fetch("/updatepass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(usernewPass),
    });
    let result = await response.json();
    if (result.reg) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("id", result.id);
      window.location.href = "/chat";
    }
  }
});
