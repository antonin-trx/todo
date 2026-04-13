// éléments
const input = document.getElementById("task");
const button = document.querySelector("button");
const clearBtn = document.getElementById("clear")
const list = document.getElementById("list");

// tableau des tâches
let tasks = [];
let filter = "all";

// ajouter
button.addEventListener("click", function () {
    const value = input.value;
    if (value === "") return;

    tasks.push({
        nom: value,
        statut: true
    });

    input.value = "";

    save();
    render();
});

// supprimer
function deleteTask(index) {
    tasks.splice(index, 1);
    save();
    render();
}

// tout supprimer
clearBtn.addEventListener("click", () => {
    tasks = [];
    save();
    render();
});

function setFilter(f) {
    filter = f;
    render();
}

// afficher
function render() {
    list.innerHTML = "";

    tasks
    
    .filter(function (task) {
            if (filter === "actif") return task.statut === true;
            if (filter === "terminé") return task.statut === false;
            return true; // all
        })
    
    .forEach(function (task, index) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.nom;

        const btntask = document.createElement("button");

        if (task.statut) {
            btntask.textContent = "Terminé";
        } else {
            btntask.textContent = "Actif";
        }

        btntask.addEventListener("click", function () {
            tasks[index].statut = !tasks[index].statut;
            save();
            render();
        });

        const btn = document.createElement("button");
        btn.textContent = "Supprimer";

        btn.addEventListener("click", function () {
            deleteTask(index);
        });

        if (task.statut === false) {
            span.classList.add("done");
        }
        li.appendChild(span)
        li.appendChild(btntask);
        li.appendChild(btn);
        list.appendChild(li);
    });
}


// sauvegarder
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// charger
function load() {
    const data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data);
    }
}

// démarrage
load();
render();