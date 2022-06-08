let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

create();

function add_fun() {
  let note_title = document.getElementById("note-title").value;
  let note_dec = document.getElementById("note-des").value;
  let date = new Date();
  let today_date = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    min = date.getMinutes();

  if (note_dec == "") {
    note_dec = "No description!";
  }

  if (note_title == "") {
    alert("Title Empty");
  } else {
    let notes = {};
    notes.title = note_title;
    notes.dec = note_dec;
    // notes.id = id;
    notes.date = today_date;
    notes.month = months[month];
    notes.year = year;
    notes.hour = hour;
    notes.min = min;

    // id += 1;

    fetch("https://notesnodeapi.herokuapp.com/pnote/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        create();
        clr();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
// for clearing the input boxes
function clr() {
  document.getElementById("note-title").value = "";
  document.getElementById("note-des").value = "";
}

function create() {
  let togetdata = fetch("https://notesnodeapi.herokuapp.com/gnote/");
  // fetchRes is the promise to resolve
  // it by using.then() method
  togetdata
    .then((res) => res.json())
    .then((obj) => {
      // console.log(obj);
      let slip = "";
      let date = "";
      let temp = "";
      if (obj.length == 0) {
        let temp = document.getElementById("ntc");
        temp.innerHTML = "";
      }
      for (var x in obj) {
        let id = obj[x]._id;
        // console.log(id);
        date = `<div>${obj[x].date} ${obj[x].month} ${obj[x].year} / ${obj[x].hour}:${obj[x].min}</div>`;
        slip += `<div id="${obj[x]._id}" class="cards">
    <div>
        <div id="title-container"><p class="card-title">${obj[x].title}</p></div>
        <div id ="date-container" class="date-time">${date}</div>
        <div id="desc-container"><div class="card-dec">${obj[x].dec}</div></div>
        <span id = ed-bt-ct>
        <button type = "button" id="edit-btn" class="edit-card-button" onClick="edt('${id}')">Edit</button></span>
        <span id = del-bt-ct>
        <button type = "button" id="del-btn" class="delete-card-button" onclick="del('${id}')">Delete</button></span>
    </div>
    </div>`;
        temp = document.getElementById("ntc");
        temp.innerHTML = slip;
      }
    });
}

function del(id) {
  // alert("Hii");
  // console.log(id);
  let back = `<button id="bk-btn" class="bkup-btn" onClick="backup()">Backup</button>`;
  fetch("https://notesnodeapi.herokuapp.com/dnote/" + id, {
    method: "DELETE",
  }).then(() => create()); // or res.json()
  // .then((res) => res.text());
  let togetdata = fetch("https://notesnodeapi.herokuapp.com/gnote/" + id);
  // fetchRes is the promise to resolve
  // it by using.then() method
  togetdata
    .then((res) => res.json())
    .then((obj) => {
      localStorage.setItem("del_note", JSON.stringify(obj));
    });
  let x = document.getElementById("backup-btn-container");
  x.innerHTML = back;
  //   console.log(data);
}

function edt(id) {
  let valt = "";
  let vald = "";
  let date = new Date();
  let today_date = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    min = date.getMinutes();
  let input1 = `<input type="text" id="te"class="title-edit-box">`;
  let input2 = `<input type="text" id="de"class="desc-edit-box">`;
  let save_btn = `<button type = "button" id="save-btn" class="save-card-button">Save</button>`;
  let togetdata = fetch("https://notesnodeapi.herokuapp.com/gnote/" + id);
  togetdata
    .then((res) => res.json())
    .then((obj) => {
      console.log(obj);
      valt = obj.title;
      vald = obj.dec;
      // console.log(valt);

      // console.log(vald);
      let a = document.getElementById(id);
      let x = a.querySelector("#title-container");
      // let valt = x.id.title;
      // console.log(valt);
      // let b = document.getElementById(id);
      let y = a.querySelector("#desc-container");
      // let vald = id.dec;
      x.innerHTML = input1;
      x.querySelector("#te").value = valt;
      y.innerHTML = input2;
      y.querySelector("#de").value = vald;
      let btn = a.querySelector("#ed-bt-ct");
      btn.innerHTML = save_btn;
      let w = a.querySelector("#save-btn");
      w.addEventListener("click", function save() {
        let new_t = a.querySelector("#te").value;
        let new_d = a.querySelector("#de").value;
        let notes = {};
        notes.title = new_t;
        notes.dec = new_d;
        // notes.id = id;
        notes.date = today_date;
        notes.month = months[month];
        notes.year = year;
        notes.hour = hour;
        notes.min = min;
        fetch("https://notesnodeapi.herokuapp.com/upnote/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => create());
      });
    });
}

function backup() {
  let del_items = JSON.parse(localStorage.getItem("del_note"));
  // let note_list = JSON.parse(localStorage.getItem("note"));

  fetch("https://notesnodeapi.herokuapp.com/pnote/", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(del_items),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      create();
      clr();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  let x = document.getElementById("backup-btn-container");
  x.innerHTML = "";
  localStorage.removeItem("del_note");
  create();
}
