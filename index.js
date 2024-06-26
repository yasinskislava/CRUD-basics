const moviesList = document.querySelector(".moviesList");
let index;
let way;
let iter;
function createMarkUp() {
  moviesList.innerHTML = "";
  fetch("http://localhost:3000/movies")
    .then((value) => value.json())
    .then((movies) => {
      index = movies.length;
      movies.map((movie) => {
        moviesList.insertAdjacentHTML(
          "beforeend",
          `
        <li id="${movie.id}">
            <h2>Title: ${movie.title}</h2>
            <p>Genre: ${movie.genre}</p>
            <p>Director: ${movie.director}</p>
            <p>Year: ${movie.year}</p>
        </li>`
        );
      });
    });
}

createMarkUp();

const backdrop = document.querySelector(".backdrop");
const addBtn = document.getElementById("addCard");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  backdrop.classList.remove("show");
  way = 1;
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
const card = document.querySelector(".newCard");
card.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  backdrop.classList.add("show");
  const fields = card.querySelectorAll("input");
  const info = {
    id: String(index + 1),
    title: fields[0].value,
    genre: fields[1].value,
    director: fields[2].value,
    year: parseInt(fields[3].value),
  };
  index = index + 1;
  if (way === 1) {
    const options = {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    fetch("http://localhost:3000/movies", options)
      .then((res) => res.json())
      .then(() => {
        createMarkUp();
      });
  } else if (way === 2) {
    const options = {
      method: "PUT",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    fetch(`http://localhost:3000/movies/${iter}`, options)
      .then((response) => response.json())
      .then((post) => console.log(post))
      .catch((error) => console.log("ERROR" + error));
  } else if (way === 3) {
    const options = {
      method: "PATCH",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    fetch(`http://localhost:3000/movies/${iter}`, options)
      .then((response) => response.json())
      .then((post) => console.log(post))
      .catch((error) => console.log("ERROR" + error));
  }
  fields.forEach((field) => {
    field.value = "";
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
const editBtn = document.getElementById("editCard");
const updateBtn = document.getElementById("updateCard");
const deleteBtn = document.getElementById("deleteCard");
//////////////////////////////////////////////////////////////////////////////////////////////////////
deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  updateBtn.classList.remove("chosen");
  editBtn.classList.remove("chosen");
  const items = document.querySelectorAll("ul.moviesList > li");
  if (deleteBtn.classList.contains("chosen")) {
    deleteBtn.classList.remove("chosen");

    createMarkUp();
    return;
  }
  deleteBtn.classList.add("chosen");
  items.forEach((item) => {
    item.classList.add("choose");
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      fetch(`http://localhost:3000/movies/${item.id}`, { method: "DELETE" });
      deleteBtn.classList.remove("chosen");

      createMarkUp();
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  updateBtn.classList.remove("chosen");
  deleteBtn.classList.remove("chosen");

  const items = document.querySelectorAll("ul.moviesList > li");
  if (editBtn.classList.contains("chosen")) {
    editBtn.classList.remove("chosen");

    createMarkUp();
    return;
  }
  way = 2;
  editBtn.classList.add("chosen");
  items.forEach((item) => {
    item.classList.add("choose");
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      backdrop.classList.remove("show");
      const fields = card.querySelectorAll("input");
      fields[0].value = item.children[0].textContent.split(": ")[1];
      fields[1].value = item.children[1].textContent.split(": ")[1];
      fields[2].value = item.children[2].textContent.split(": ")[1];
      fields[3].value = item.children[3].textContent.split(": ")[1];
      iter = item.id;
      editBtn.classList.remove("chosen");

      createMarkUp();
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  editBtn.classList.remove("chosen");
  deleteBtn.classList.remove("chosen");

  const items = document.querySelectorAll("ul.moviesList > li");
  if (updateBtn.classList.contains("chosen")) {
    updateBtn.classList.remove("chosen");

    createMarkUp();
    return;
  }
  way = 3;
  updateBtn.classList.add("chosen");
  items.forEach((item) => {
    item.classList.add("choose");
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const fields = card.querySelectorAll("input");
      fields[0].value = item.children[0].textContent.split(": ")[1];
      fields[1].value = item.children[1].textContent.split(": ")[1];
      fields[2].value = item.children[2].textContent.split(": ")[1];
      fields[3].value = item.children[3].textContent.split(": ")[1];
      backdrop.classList.remove("show");
      iter = item.id;
      updateBtn.classList.remove("chosen");

      createMarkUp();
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
const preload = document.querySelector(".info");
preload.addEventListener("click", () => {
  preload.classList.add("show");
});
