let result;
async function getUser() {
  if (localStorage.getItem("token")) {
    let response = await fetch("/chat/getAll");
    result = await response.json();
    let roomid;
    for (let i = 0; i < result.length; i++) {
      let a = document.createElement("a");
      if (localStorage.getItem("id") > result[i].id)
        roomid = result[i].id + "_" + localStorage.getItem("id");
      else roomid = localStorage.getItem("id") + "_" + result[i].id;
      a.href = `/chat/room/${roomid}`;
      a.innerHTML = result[i].email;
      let li = document.createElement("li");
      li.appendChild(a);
      document.querySelector("#rectangle").appendChild(li);
    }

    let responseGroup = await fetch("/chat/getAllGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: localStorage.getItem("id") }),
    });
    let group = await responseGroup.json();
    for (let i = 0; i < group.length; i++) {
      let a = document.createElement("a");
      a.href = `/chat/room/${group[i].id_group}`;
      a.innerHTML = group[i].name;
      let li = document.createElement("li");
      li.appendChild(a);
      document.querySelector("#rectangle").appendChild(li);
    }
  } else window.location.href = "/reg";
}

document.querySelector("#newroom").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "block";
  document.querySelector("#users").style.display = "none";
  let s = document.querySelector("#select");
  for (let i = 0; i < result.length; i++) {
    let newOption = new Option(result[i].email, result[i].id);
    s.appendChild(newOption);
  }
});

getUser();

document.querySelector("#create").addEventListener("click", async () => {
  let group = {
    users: [...document.querySelector("#select").selectedOptions].map((option) => +option.value),
    groupname: document.querySelector("#name").value,
  };
  let response = await fetch("/chat/creategroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(group),
  });
  let ans = await response.json();
});
