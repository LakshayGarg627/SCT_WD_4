let inputTxt = document.querySelector(".inputArea");
let todoContainer = document.querySelector(".todoTasks");
let addBtn = document.querySelector(".adding");
let markAsDone = document.querySelector(".markAsDone");
let DeleteBtn = document.querySelector(".DeleteBtn");
let FormEle = document.querySelector(".FormEle");
let editingTask = null;

let editingIndex = null;

let todoArr = JSON.parse(localStorage.getItem("todoList")) || [];
function addTaskToTodo() {
    localStorage.setItem("todoList", JSON.stringify(todoArr));
}
function renderTasks() {

    todoContainer.innerHTML = "";
    todoArr.forEach((taskObj, index) => {
        const taskli = document.createElement("li");
        taskli.classList.add("taskList");

        const tasktext = document.createElement("span");
        tasktext.classList.add("taskText");
        tasktext.innerText = taskObj.text;

        const taskDate = document.createElement("span");
        taskDate.classList.add("taskDate");
        taskDate.innerHTML = taskObj.date;

        const EditBtn = document.createElement("span");
        EditBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        EditBtn.classList.add("EditBtn");
        EditBtn.addEventListener("click", () => {
            inputTxt.value = tasktext.innerText;
            inputTxt.focus();
            addBtn.innerText = "Update";
            editingTask = taskli;
            editingIndex = index;
        });
        const DoneBtn = document.createElement("span");
        DoneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        DoneBtn.classList.add("DoneBtn");
        DoneBtn.addEventListener("click", () => {
            doneTask(taskli, index);
        });

        const DelBtn = document.createElement("span");
        DelBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        DelBtn.classList.add("DelBtn");
        DelBtn.addEventListener("click", () => {
            todoArr.splice(index, 1);
            addTaskToTodo();
            renderTasks();
        });

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttonDiv");
        buttonDiv.append(EditBtn);
        buttonDiv.append(DoneBtn);
        buttonDiv.append(DelBtn);

        taskli.append(tasktext);
        taskli.append(taskDate);
        taskli.append(buttonDiv);
        if (taskObj.completed) {
            doneTask(taskli, index);
        }
        todoContainer.append(taskli);
        updateProgress();

    });
}

// function addTaskinTodo(){
//     let task= inputTxt.value.trim();
//     if(task==""){
//         alert("Please Enter a valid task");
//         return;
//     }

//     if(editingTask!=null){
//         const tasktextSpan=editingTask.querySelector(".taskText");;
//         tasktextSpan.innerText=task;
//         inputTxt.value="";
//         addBtn.innerText="Add";
//         editingTask=null;
//         return;

//     }
//     const taskli=document.createElement("li");
//     taskli.classList.add("taskList");

//     const tasktext=document.createElement("span");
//     tasktext.classList.add("taskText");
//     tasktext.innerText=task;

//     const taskDate=document.createElement("span");
//     taskDate.classList.add("taskDate");

//     const now=new Date();
//     taskDate.innerHTML=`${now.toLocaleDateString()} &nbsp; &nbsp; ${now.toLocaleTimeString()}`;




//     const EditBtn=document.createElement("span");
//     EditBtn.innerHTML=`<i class="fa-solid fa-pen"></i>`;
//     EditBtn.classList.add("EditBtn");
//     EditBtn.addEventListener("click",()=>{
//         inputTxt.value=tasktext.innerText;
//         inputTxt.focus();
//         addBtn.innerText="Update";
//         editingTask=taskli;
//     })

//     const DoneBtn=document.createElement("span");
//     DoneBtn.innerHTML=`<i class="fa-solid fa-check"></i>`;
//     DoneBtn.classList.add("DoneBtn");
//     DoneBtn.addEventListener("click",()=>{
//         doneTask(taskli);
//     });

//     const DelBtn=document.createElement("span");
//     DelBtn.innerHTML=`<i class="fa-solid fa-trash"></i>`;
//     DelBtn.classList.add("DelBtn");
//     DelBtn.addEventListener("click",()=>{
//         delTask(taskli);
//     });

//     const buttonDiv=document.createElement("div");
//     buttonDiv.classList.add("buttonDiv");
//     buttonDiv.append(EditBtn);
//     buttonDiv.append(DoneBtn);
//     buttonDiv.append(DelBtn);

//     taskli.append(tasktext);
//     taskli.append(taskDate);
//     taskli.append(buttonDiv);
//     todoContainer.append(taskli);

//     inputTxt.value="";
// }

function addTaskinTodo() {
    let task = inputTxt.value.trim();
    if (task == "") {
        alert("Please Enter a valid task");
        return;
    }
    const now = new Date();
    const dateStr = `${now.toLocaleDateString()} &nbsp; &nbsp; ${now.toLocaleTimeString()}`;

    if (editingIndex != null) {
        todoArr[editingIndex].text = task;      
        todoArr[editingIndex].date = dateStr;   
        editingIndex = null;
        editingTask = null;
        addBtn.innerText = "Add";
    } else {
        const isDuplicate = todoArr.some(t => t.text.toLowerCase() === task.toLowerCase());
        if (isDuplicate) {
            alert("Task already existed");
            return;
        }
        todoArr.push({ text: task, date: dateStr, completed: false });
    }

    addTaskToTodo();
    renderTasks();

    inputTxt.value = "";
    updateProgress();
}


FormEle.addEventListener("submit", (e) => {
    e.preventDefault();
    addTaskinTodo();


})
addBtn.addEventListener("click", () => {
    addTaskinTodo();
});

function delTask(li) {
    console.log("Delete FXN ACT");
    li.remove();
    updateProgress();

};
function doneTask(li, index) {
    if (index != null) {
        todoArr[index].completed = true;
        addTaskToTodo();
    }

    li.style.backgroundColor = "#0ec614";
    const tasktextSpan = li.querySelector(".taskText");
    const taskDate = li.querySelector(".taskDate");
    const Doneicon = li.querySelector(".buttonDiv").querySelector(".DoneBtn");
    const Editicon = li.querySelector(".buttonDiv").querySelector(".EditBtn");

    if (tasktextSpan) {
        tasktextSpan.style.textDecoration = "line-through";
        taskDate.innerText = "Task Completed";
        taskDate.style.color = "black";
        taskDate.style.fontWeight = "700";
        Doneicon.style.color = "#d1c8c8ff";
        Editicon.style.display = "none";
    }
    updateProgress();
};

DeleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
        todoArr = [];
        addTaskToTodo();
        renderTasks();
    }
    updateProgress();
    // todoContainer.innerHTML="";
});

// markAsDone.addEventListener("click", () => {
//     const allTasks = todoContainer.querySelectorAll("li");
//     allTasks.forEach(li => {
//         li.style.backgroundColor = "#0ec614"
//         const taskText = li.querySelector(".taskText");
//         const taskDate = li.querySelector(".taskDate");
//         const Doneicon = li.querySelector(".buttonDiv").querySelector(".DoneBtn");
//         const Editicon = li.querySelector(".buttonDiv").querySelector(".EditBtn");
//         if (taskText) {
//             taskText.style.textDecoration = "line-through";
//         }
//         if (taskDate) {
//             taskDate.innerText = "Task Completed";
//             taskDate.style.color = "black";
//             taskDate.style.fontWeight = "700";
//             Doneicon.style.color = "#d1c8c8ff";
//             Editicon.style.display = "none";
//         }
//     });
//     updateProgress();

// });

markAsDone.addEventListener("click", () => {
    todoArr.forEach(task => task.completed = true);

    addTaskToTodo();

    renderTasks();
});


// voice adding
let micBtn = document.querySelector(".micBtn");
window.SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
let isRecognizing = false;

if (window.SpeechRecognition) {
    const recognition = new SpeechRecognition();
    console.log(recognition);
    recognition.continuous = false;
    recognition.lang = "en-IN";
    micBtn.addEventListener("click", () => {
        if (!isRecognizing) {
            recognition.start();
            micBtn.style.color = "red";
            isRecognizing = true;
        } else {
            alert("Already Listening");
        }
    });
    recognition.addEventListener("result", (event) => {
        console.log("RECO STARTED");
        console.log(event);
        const transcript = event.results[0][0].transcript.trim();
        inputTxt.value = transcript.toUpperCase();
        addTaskToTodo();
        micBtn.style.color = "white";
    });
    recognition.addEventListener("end", () => {
        isRecognizing = false;
        micBtn.style.color = "white";
    });
    recognition.addEventListener("error", () => {
        isRecognizing = false;
        console.log(error);
        micBtn.style.color = "white";
    });
} else {
    alert("Sorry Your browser doesnot support Speech recognition");
}


// progress Bar

function updateProgress() {
    const allTasks = todoContainer.querySelectorAll("li");
    const CompletedTasks = Array.from(allTasks).filter(li => {
        const taskText = li.querySelector(".taskText");
        return taskText && taskText.style.textDecoration === "line-through";
    });
    const total = allTasks.length;
    const completed = CompletedTasks.length;

    document.getElementById("taskCount").innerText = `${completed}/${total} Tasks Completed`;

    const fill = document.getElementById("progressFill");
    let percentage = total == 0 ? 0 : (completed / total) * 100;
    fill.style.width = `${percentage}%`;
};

renderTasks();


