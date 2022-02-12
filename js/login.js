document.querySelector("#login").addEventListener("click", async () => {
  let user = {
    login: document.querySelector("#username").value.toLowerCase(),
    password: document.querySelector("#password").value,
  };
  let response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
  let result = await response.json();
  if (result.login) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("id", result.id);
    window.location.href = "/chat";
  }

  console.log(result);
});
