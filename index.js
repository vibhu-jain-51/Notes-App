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

    id++;

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
  //   console.log(typeof obj);
  //   console.log(obj);
  for (var x in obj) {
    date = `<div>${obj[x].date} ${obj[x].month} ${obj[x].year} / ${obj[x].hour}:${obj[x].min}</div>`;
    slip += `<div class="cards">
    <div>
        <p class="card-title">${obj[x].title}</p>
        <div id ="date-container" class="date-time">${date}</div>
        <div class="card-dec">
        ${obj[x].dec}</div>
        <button type = "button" class="edit-card-button">Edit</button>
        <button type = "button" class="delete-card-button">Delete</button>
    </div>
    </div>`;
    // let a = document.getElementById("date-container");
    // a.innerHTML = date;
    let temp = document.getElementById("ntc");
    temp.innerHTML = slip;
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
