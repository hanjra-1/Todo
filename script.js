let tasksData={};
const todo=document.querySelector("#todo");
const progress=document.querySelector("#progress");
const done=document.querySelector("#done");
const columns=[todo,progress,done]

let dragElement=null;

function updateTasksData(){
    columns.forEach(col=>{
        const tasks=col.querySelectorAll(".task")
        const count=col.querySelector(".right")
        tasksData[col.id]=Array.from(tasks).map(task=>{
            return {
                title:task.querySelector("h2").innerText,
                desc:task.querySelector("p").innerText
            }
        })
        localStorage.setItem("tasks",JSON.stringify(tasksData))
        count.innerText=tasks.length;
    })
}

function addTask(title,desc,column){
    const div=document.createElement("div") 
    div.classList.add("task")           
    div.setAttribute("draggable","true") 
    div.innerHTML=`
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
          
    `
    column.appendChild(div)
    div.addEventListener("drag",(e)=>{
        dragElement=div
    })
    div.querySelector("button").addEventListener("click",(e)=>{
        div.remove()
        updateTasksData();
    })
        return div;
}



if(localStorage.getItem("tasks")){
    const data=JSON.parse(localStorage.getItem("tasks"))
    for(const col in data){
        const column=document.getElementById(col)
        data[col].forEach(task=>{
            addTask(task.title,task.desc,column)
        })}
        updateTasksData();
}



const tasks=document.querySelectorAll(".task");
tasks.forEach(task=>{
    task.addEventListener("drag",(e)=>{
        // console.log("dragging",e)
        dragElement=task;
    })
})



function addingEventOnCol(column){
column.addEventListener("dragenter",(e)=>{
    e.preventDefault();
    column.classList.add("hover-over")
})
column.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    column.classList.remove("hover-over")
})
column.addEventListener("dragover",(e)=>{
    e.preventDefault();
})
column.addEventListener("drop",(e)=>{
    e.preventDefault();
    
    column.appendChild(dragElement);
    column.classList.remove("hover-over")

    updateTasksData();
    

})
}

addingEventOnCol(todo)
addingEventOnCol(progress)
addingEventOnCol(done)



const toggleModelButton=document.querySelector("#toggle-model")
const modelBg=document.querySelector(".bg")
const model=document.querySelector(".model")
const addTaskButton=document.querySelector(".add-task-btn")

modelBg.addEventListener("click",()=>{
    model.classList.remove("active")
})

toggleModelButton.addEventListener("click",()=>{
model.classList.toggle("active")
})


addTaskButton.addEventListener("click",()=>{
    const taskTitle=document.querySelector("#task-title-input").value
    const taskDesc=document.querySelector("#task-desc-input").value
    addTask(taskTitle,taskDesc,todo)
    updateTasksData();
    model.classList.remove("active")

    document.querySelector("#task-title-input").value=""
    document.querySelector("#task-desc-input").value=""
    
})