const todo=document.querySelector("#todo");
const progress=document.querySelector("#progress");
const done=document.querySelector("#done");

let dragElement=null;




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

})
}

addingEventOnCol(todo)
addingEventOnCol(progress)
addingEventOnCol(done)
