let user;
document.querySelector("#reg").addEventListener("click", async () => {
  user = {
    name: document.querySelector("#username").value.toLowerCase(),
    password: document.querySelector("#password").value,
  };
  let response = await fetch("/newuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
  let result = await response.json();
  if (result.login) {
    let response = await fetch("/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    result = await response.json();
    document.querySelector("#form").style.display = "none";
    document.querySelector("#formtwo").style.display = "block";
  }
});

document.querySelector("#regtwo").addEventListener("click", async () => {
  let code = { code: document.querySelector("#code").value, email: user.name };
  let response = await fetch("/checkcode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(code),
  });
  let result = await response.json();
  console.log(result);
  if (result.ans) {
    let response = await fetch("/addnewuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    let result = await response.json();
    if (result.reg) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("id", result.id);
      window.location.href = "/chat";
    }
  }
});
