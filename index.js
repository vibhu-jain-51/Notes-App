// let fetchRes = fetch("https://notesnodeapi.herokuapp.com/gnote/");
// // fetchRes is the promise to resolve
// // it by using.then() method
// fetchRes
//   .then((res) => res.json())
//   .then((d) => {
//     console.log(d);
//   });

// let count = localStorage.length;
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
let id = 0;
checkid();

function checkid() {
  let a = JSON.parse(localStorage.getItem("note"));
  let b = JSON.parse(localStorage.getItem("del_notes"));
  if (a == null) {
    //   console.log(a.length);
    // console.log("Now empty");
    id = 0;
  }
  if (a != null && b == null) {
    // console.log(a.length);
    id = a[a.length - 1].id + 1;
    // console.log(id);
    // id = a.id + 1;
  }
  // if (a != null && b != null) {
  //   id = a[a.length - 1].id + 1;
  // }
}
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
    notes.id = id;
    notes.date = today_date;
    notes.month = months[month];
    notes.year = year;
    notes.hour = hour;
    notes.min = min;

    id += 1;

    if (localStorage.length == 0) {
      let mynote = [];
      mynote.push(notes);
      localStorage.setItem("note", JSON.stringify(mynote));
    } else {
      let mynotes = localStorage.getItem("note");
      let temp2 = JSON.parse(mynotes);
      temp2.push(notes);

      //let mynotes.push(notes);
      localStorage.setItem("note", JSON.stringify(temp2));
    }
    // let str = JSON.stringify(notes);
    // localStorage.setItem(count, str);
    // count++;
    create();
    clr();
  }
}
// for clearing the input boxes
function clr() {
  document.getElementById("note-title").value = "";
  document.getElementById("note-des").value = "";
}

function create() {
  let slip = "";
  let date = "";
  let obj = [];
  obj = JSON.parse(localStorage.getItem("note"));
  checkid();
  //   console.log(typeof obj);
  //   console.log(obj);

  for (var x in obj) {
    if (obj.length != 0) {
      date = `<div>${obj[x].date} ${obj[x].month} ${obj[x].year} / ${obj[x].hour}:${obj[x].min}</div>`;
      slip += `<div id="${obj[x].id}" class="cards">
    <div>
        <div id="title-container"><p class="card-title">${obj[x].title}</p></div>
        <div id ="date-container" class="date-time">${date}</div>
        <div id="desc-container"><div class="card-dec">${obj[x].dec}</div></div>
        <span id = ed-bt-ct>
        <button type = "button" id=edit-btn class="edit-card-button" onclick="edt(${obj[x].id})">Edit</button></span>
        <span id = del-bt-ct>
        <button type = "button" id=del-btn class="delete-card-button" onclick="del(${obj[x].id})">Delete</button></span>
    </div>
    </div>`;
      let temp = document.getElementById("ntc");
      temp.innerHTML = slip;
    }
  }

  //   for (let index = 0; index < obj.length; index++) {
  //     console.log("Hiiiiiiii");
  //     console.log(obj[index], "\n");
  //     let parsed_data = JSON.parse(obj[index]);
  //     console.log(parsed_data);
  //     slip += `<div class="items">
  //     <div>
  //         <h5>${parsed_data.title}</h5>
  //         <p>${parsed_data.dec}</p>
  //         <button type = "button">Edit</button>
  //         <button type = "button">Delete</button>
  //     </div>
  //     </div>`;
  //     let temp = document.getElementById("ntc");
  //     temp.innerHTML = slip;
}

function del(id) {
  //   console.log(id);
  let back = `<button id="bk-btn" class="bkup-btn" onclick="backup(${id})">Backup</button>`;
  let del_note = [],
    del_obj = {};
  let index = 0;
  let data = JSON.parse(localStorage.getItem("note"));
  for (index; index < data.length; index += 1) {
    if (data[index].id == id) {
      //   console.log(index);
      //   console.log("catched id = ", id, "checked id =", data[index].id);
      del_obj = data[index];
      // console.log(del_obj);
      del_note.push(del_obj);
      localStorage.setItem("del_notes", JSON.stringify(del_note));
      data.splice(index, 1);
      localStorage.setItem("note", JSON.stringify(data));
    }
  }
  let x = document.getElementById("backup-btn-container");
  x.innerHTML = back;
  create();
  if (data.length == 0) {
    id = 0;
    let x = document.getElementById("ntc");
    x.innerHTML = "";
  }
  //   console.log(data);
}

function edt(id) {
  let date = new Date();
  let today_date = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    min = date.getMinutes();
  let input1 = `<input type="text" id="te"class="title-edit-box">`;
  let input2 = `<input type="text" id="de"class="desc-edit-box">`;
  let save_btn = `<button type = "button" id="save-btn" class="save-card-button">Save</button>`;
  let data = JSON.parse(localStorage.getItem("note"));
  // let index = 0;
  for (let index = 0; index < data.length; index += 1) {
    if (data[index].id == id) {
      let valt = data[index].title;
      // console.log(valt);
      let vald = data[index].dec;
      // console.log(vald);
      let a = document.getElementById(id);
      let x = a.querySelector("#title-container");
      // let b = document.getElementById(id);
      let y = a.querySelector("#desc-container");
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
        // console.log(new_val);
        data[index].title = new_t;
        data[index].dec = new_d;
        data[index].date = today_date;
        data[index].month = months[month];
        data[index].year = year;
        data[index].hour = hour;
        data[index].min = min;
        localStorage.setItem("note", JSON.stringify(data));
        create();
      });
    }
  }
}

function backup(t) {
  let del_items = JSON.parse(localStorage.getItem("del_notes"));
  let note_list = JSON.parse(localStorage.getItem("note"));
  // for (let index = note_list.length; index < del_items.length; index++) {
  //   del_items[index].id = id;
  //   note_list.push(del_items[index]);
  //   del_items.splice(index, 1);
  // }
  // let index = note_list.length;
  // let x = 0;
  // let y = del_items.length;
  // while (y != 0) {
  //   // del_items[x].id = id + 1;
  //   note_list.push(del_items[index]);
  //   del_items.splice(x, 1);
  //   // x += 1;
  //   y -= 1;
  // }
  for (index = 0; index < del_items.length; index++) {
    if (del_items[index].id == t) {
      note_list.splice(note_list.length, 0, del_items[index]);
      localStorage.removeItem("del_notes");
    }
  }
  localStorage.setItem("note", JSON.stringify(note_list));
  let bkupct = document.getElementById("backup-btn-container");
  bkupct.innerHTML = "";
  // localStorage.removeItem("del_items");
  create();
}

// function save(){

// }

//   for (var count in localStorage) {
//     // let data = localStorage[key];
//     let parsed_data = JSON.parse(localStorage[count]);
//     // console.log(parsed_data);
//     // let data = localStorage.getItem(localStorage.key(index));
//     // let parsed_data = JSON.parse(data);

//     slip += `<div class="items">
//     <div>
//         <h5>${parsed_data.title}</h5>
//         <p>${parsed_data.dec}</p>
//         <button type = "button">Edit</button>
//         <button type = "button">Delete</button>
//     </div>
//     </div>`;
//     let temp = document.getElementById("ntc");
//     temp.innerHTML = slip;
//   }
// }

// https://notesnodeapi.herokuapp.com/gnote
