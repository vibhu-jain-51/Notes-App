// let count = localStorage.length;
let mynotes = [];
create();
function add_fun() {
  let note_title = document.getElementById("note-title").value;
  let note_dec = document.getElementById("note-des").value;

  if (note_dec == "") {
    note_dec = "No description!";
  }

  if (note_title == "") {
    alert("Title Empty");
  } else {
    let notes = {};
    notes.title = note_title;
    notes.dec = note_dec;
    mynotes.push(notes);
    localStorage.setItem("note", JSON.stringify(mynotes));
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
  let obj = [];
  obj = JSON.parse(localStorage.getItem("note"));
  //   console.log(typeof obj);
  //   console.log(obj);
  for (var x in obj) {
    slip += `<div class="cards">
    <div>
        <p class="card-title">${obj[x].title}</p>
        <div class="card-dec">
        ${obj[x].dec}</div>
        <button type = "button" class="edit-card-button">Edit</button>
        <button type = "button" class="delete-card-button">Delete</button>
    </div>
    </div>`;
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
