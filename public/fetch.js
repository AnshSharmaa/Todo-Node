document.addEventListener("DOMContentLoaded", getdata());

function getdata() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            /*var main = document.getElementById("todos");
            main.innerHTML = ""; */
            separate(res);
        }
    };
    xhttp.open("GET", 'http://localhost:3000/todos', true);
    xhttp.send();
}

function separate(res) {
    JSON.parse(res).forEach(e => {
        build(e);
    });
}

function build(e) {
    var main = document.getElementById("todos");
    //ndiv houses result of a day
    var ndiv = document.createElement("div");
    ndiv.classList.add("ndiv");
    ndiv.innerHTML = `<div id="spans"><label>Name: </label><span>${e.name}</span><label>Deadline: <label><span>${e.deadline}</span></div>`
    main.appendChild(ndiv);
}