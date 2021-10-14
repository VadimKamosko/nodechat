async function getUser() {
  if (localStorage.getItem("token")) {
    let response = await fetch("/chat/getAll");
    let result = await response.json();
    let roomid;
    for (let i = 0; i < result.length; i++) {
      let a = document.createElement("a");
      if (localStorage.getItem("id") > result[i].id)
        roomid = result[i].id + "" + localStorage.getItem("id");
      else roomid = localStorage.getItem("id") + "" + result[i].id;
      a.href = `/chat/room/${roomid}`;
      a.innerHTML = result[i].email;
      document.querySelector("#users").appendChild(a);
    }
  } else window.location.href = "/reg";
}

getUser();
