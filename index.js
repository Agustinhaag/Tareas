let tareas= [];
const form = document.getElementById("form");
document.addEventListener("DOMContentLoaded", ()=>{
    render()
});
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const inputId = document.getElementById("id");
  const text = document.getElementById("text");
  const errorMsg = document.getElementById("error-msg");
  if (text.value.trim() === '') {
    errorMsg.style.display = 'block'; 
    return;
  } else {
    errorMsg.style.display = 'none'; 
  }
  if (inputId.value){
     tareas.forEach(tarea =>{
      if(tarea.id == inputId.value){
        tarea.texto = text.value;
      }
     })
  }else{
     tareas.push({
    texto: text.value ,
    id: Date.now(),
    complete: false
  })
  }
  inputId.value= "";
  e.target.reset();
  localStorage.setItem("tareas",JSON.stringify(tareas));
  render();
}) 

function render(){
  tareas =JSON.parse(localStorage.getItem("tareas")) || []; 
  let tabla = document.getElementById("tabla");
  tabla.innerHTML= "";
  tareas.forEach(tarea => 
    tabla.innerHTML += `
  <tr>
  <td id="td" class="${tarea.complete ? "complete" : " "}">${tarea.texto}</td>
  <td class="buttons">
     <button onclick="completar(${tarea.id} )" class="btn-complete"> <i class="fa-solid fa-check"></i></button>
     <button onclick="borrar(${tarea.id})" class="btn-delete"><i class="fa-solid fa-trash"></i></button>
     <button onclick="editar(${tarea.id})" class="btn-edit"><i class="fa-solid fa-pen"></i></button>
 </td>
</tr>`
  );
}

function completar(id) {
  tareas.forEach(tarea =>{
    if (tarea.id == id){
        tarea.complete = !tarea.complete
    }
  })
  localStorage.setItem("tareas",JSON.stringify(tareas));
  render();
} 

function borrar(id){
    if(confirm("¿Estas seguro de eliminar esta tarea?")){
        const filtrar = tareas.filter((tarea)=>
        tarea.id != id
    )
    localStorage.setItem("tareas",JSON.stringify(filtrar));
  render(); 
    }
}

function editar(id){
  const task = tareas.find((tarea)=>tarea.id == id);
    if(task){
     const inputId = document.getElementById("id");
     inputId.value = task.id;
     let inputtext = document.getElementById("text");
     inputtext.value = task.texto;
     inputtext.focus();
    }
}

let fecha= document.getElementById("date");
let nuevafecha =function(){
    let date = new Date();
    let dia = date.toLocaleString("es",{ day:'numeric'});
    let semana = date.toLocaleString("es",{ weekday:'long'});
    let mes = date.toLocaleString('es',{month:'long'});
    fecha.textContent += `${semana} ${dia} de ${mes} `;
} 
nuevafecha();