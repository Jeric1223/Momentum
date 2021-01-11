const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){ //삭제이벤트
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDo;
  saveToDos();
}

function saveToDos(){ //로컬스토리지에 저장 문자열로
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){ //html 안에 뜨게 하기
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length +1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text : text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(){ //인풋이벤트 form 이벤트
  event.preventDefault();
  const currentvalue = toDoInput.value;
  paintToDo(currentvalue);
  toDoInput.value="";
}

function loadToDos() //불러오기
{
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !==  null){
    const parsedToDos = JSON.parse(loadedToDos); //object변환
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
}

function init(){ //실행
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();