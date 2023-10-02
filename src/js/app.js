window.addEventListener("DOMContentLoaded", function () {
    let inputText = document.querySelector("#text-input");
    let create_btn = document.querySelector("#create-btn");
    let input_text_holder = document.querySelector(".div-open");
    let in_progress = document.querySelector(".div-in-progress");
    let compleated = document.querySelector(".div-compleated");
    let newTask = null;
    let divCount = 1;

    create_btn.addEventListener("click", function () {
        let tasktext = inputText.value.trim();

        if (tasktext !== "") {
            newTask = document.createElement("div");
            newTask.textContent = tasktext;
            newTask.setAttribute("draggable", "true");
            newTask.setAttribute("data-status", "open");
            newTask.setAttribute("data-name", "Task-" + divCount);

            newTask.id ="a"+divCount;

            input_text_holder.appendChild(newTask);
            inputText.value = "";

            divCount++;
        }
    })

    document.addEventListener("dragstart", function (e) {
        if (e.target.getAttribute("draggable") === "true") {
            e.dataTransfer.setData("text/plain", e.target.textContent);
            newTask = e.target;
        }
    });

    in_progress.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    in_progress.addEventListener("drop", function (e) {
        if (newTask) {
            in_progress.appendChild(newTask);
            newTask.setAttribute("data-status", "in-progress");
            newTask = null;
        }
    });

    compleated.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    compleated.addEventListener("drop", function (e) {
        if (newTask) {
            compleated.appendChild(newTask);
            newTask.setAttribute("data-status", "compleated");
            newTask = null;
        }
    });

    input_text_holder.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    input_text_holder.addEventListener("drop", function (e) {
        if (newTask) {
            input_text_holder.appendChild(newTask);
            newTask.setAttribute("data-status", "open");
            newTask = null;
        }
    });
})

