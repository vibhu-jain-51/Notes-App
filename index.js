function add_fun(){
    let note_title = document.getElementById("note-title").value;
    let note_dec = document.getElementById("note-des").value;
    if (note_title=="") {
        // console.log("title empty");
        document.getElementById("emptyt").innerHTML="Title empty";
    }
    else{
        console.log(note_title);
    }

    if (note_dec=="") {
        document.getElementById("emptyd").innerHTML="Description empty";
    }
    else console.log(note_dec);
    // console.log(note_title);
    // console.log(note_dec);
}

// for clearing the input boxes
function clr(){
    document.getElementById("note-title").value="";
    document.getElementById("note-des").value="";
}