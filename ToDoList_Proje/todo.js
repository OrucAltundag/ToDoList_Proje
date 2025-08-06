const form = document.querySelector("#todo-form"); // Formu seçer
const todoInput = document.querySelector("#todo");  // Input alanını seçer
const todoList = document.querySelector(".list-group");   // Todo listesi için liste grubu
const firstCardBody = document.querySelectorAll(".card-body")[0];  // İlk kart gövdesini seçer
const secondCardBody = document.querySelectorAll(".card-body")[1]; // İkinci kart gövdesini seçer
const filter = document.querySelector("#filter"); // Filtreleme inputunu seçer
const clearButton = document.querySelector("#clear-todos"); // Tüm todo'ları temizleme butonunu seçer

eventListeners(); // Tüm eventleri yükler

function eventListeners() {
    form.addEventListener("submit", addTodo); // Form submit olayını dinler
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI); // Sayfa yüklendiğinde tüm todo'ları UI'ye yükler
secondCardBody.addEventListener("click", deleteTodo); // İkinci kart gövdesinde tıklama olayını dinler
    filter.addEventListener("keyup", filterTodos); // Filtreleme inputunda tuş basımı olayını dinler
clearButton.addEventListener("click", clearAllTodos); // Tüm todo'ları temizleme butonuna tıklama olayını dinler

}


function clearAllTodos() {
    if (confirm("Tüm todo'ları silmek istediğinize emin misiniz?")) { // Kullanıcıdan onay alır
        // Tüm todo'ları temizler
        while (todoList.firstElementChild !== null) {
            todoList.removeChild(todoList.firstElementChild); // Liste öğelerini tek tek siler
        }
        localStorage.removeItem("todos"); // Local storage'daki todo'ları temizler
        showAlert("success", "Tüm todo'lar başarıyla silindi!"); // Başarılı uyarı gösterir
    }
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase(); // Filtreleme değerini al
    const listItems = document.querySelectorAll(".list-group-item"); // Tüm liste öğelerini alır

    listItems.forEach(function(item) { // Her bir liste öğesi için
        const text = item.textContent.toLowerCase(); // Öğenin metnini al

        if (text.indexOf(filterValue) === -1) { // Eğer filtre değerini içermiyorsa
            item.setAttribute("style", "display: none !important"); // Öğeyi gizle
        } else {
            item.setAttribute("style", "display: block"); // Öğeyi göster
        }
    });
}


function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") { // Eğer tıklanan
    
    e.target.parentElement.parentElement.remove(); // Todo öğesini siler
    showAlert("success", "Todo başarıyla silindi!"); // Başarılı uyarı gösterir
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent.trim()); // Local storage'dan todo'yu siler
}
}

function deleteTodoFromStorage(deleteTodo) 
{
let todos = getTodosFromStorage(); // Local storage'dan todo'ları alır

todos.forEach(function(todo,index) { // Her bir todo için
    if (todo === deleteTodo) 
    { // Eğer todo, silinecek todo ile eşleşiyorsa
        todos.splice(index, 1); // Todo'yu diziden çıkarır
    }
})
localStorage.setItem("todos", JSON.stringify(todos)); // Güncellenmiş todo'ları local storage'a kaydeder
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage(); // Local storage'dan todo'ları alır  }

    todos.forEach(function(todo) { // Her bir todo için
        addTodoToUI(todo); // Todo'yu UI'ye ekler
    
    });
}

function addTodo(e) {


    const newTodo = todoInput.value.trim(); // Input değerini alır ve boşlukları temizler

    if (newTodo === "") { // Eğer input boş ise
        showAlert("danger", "Lütfen bir todo girin!"); // Uyarı gösterir
    } else {
        addTodoToUI(newTodo); // Todo'yu UI'ye ekler
        showAlert("success", "Todo başarıyla eklendi!"); // Başarılı uyarı gösterir
        addTodoToStorage(newTodo); // Todo'yu local storage'a ekler
    }
    e.preventDefault(); // Formun varsayılan submit davranışını engeller

}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li"); // Yeni liste öğesi oluşturur
    listItem.className = "list-group-item d-flex justify-content-between"; // Bootstrap görünümü

    const link = document.createElement("a"); // Yeni bağlantı öğesi oluşturur
    link.href = "#"; // Bağlantının hedefini ayarlar
    link.className = "delete-item"; // Sınıf ekler
    link.innerHTML = "<i class='fa fa-remove'></i>"; // Silme simgesi ekler

    listItem.appendChild(document.createTextNode(newTodo)); // Todo metnini liste öğesine ekler
    listItem.appendChild(link); // Bağlantıyı liste öğesine ekler
    todoList.appendChild(listItem); // Liste öğesini todo listesine ekler
    todoInput.value = ""; // Input alanını temizler
}




function showAlert(type, message) {
    // type: 'success' veya 'danger'
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // 1 saniye sonra alerti kaldır
    setTimeout(function () {
        alert.remove();
    }, 1000);
}



function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage(); // Local storage'dan todo'ları alır

    todos.push(newTodo); // Yeni todo'yu diziye ekler

    localStorage.setItem("todos", JSON.stringify(todos)); // Todo'ları local storage'a kaydeder
}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = []; // Eğer todo'lar yoksa yeni bir dizi oluşturur
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // Local storage'dan alınan veriyi diziye çevirir
    }
   return todos; // Todo'ları döner
}