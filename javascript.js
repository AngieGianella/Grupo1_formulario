function mostrarFormulario() {
  document.getElementById("formularioCurso").style.display = "block";
}

function mostrarCursos() {
  const listaCursos = document.getElementById("listaCursos");
  listaCursos.innerHTML = "";
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  if (cursos.length > 0) {
    document.getElementById("botonEliminarTodos").style.display = "block";
  } else {
    document.getElementById("botonEliminarTodos").style.display = "none";
  }

  cursos.reverse().forEach((curso) => {
    const div = document.createElement("div");
    div.className = "curso";
    div.innerHTML = `
      <img src="${curso.imagen}" alt="${curso.nombre}">
      <div class="curso-detalles">
        <h3>${curso.nombre}</h3>
        <p><strong>ID:</strong> ${curso.id}</p>
        <p><strong>Créditos:</strong> ${curso.creditos}</p>
        <p><strong>Docentes:</strong> ${curso.docentes}</p>
        <p><strong>Temas:</strong> ${curso.temas}</p>
        <p><strong>Alumnos:</strong> ${curso.alumnos}</p>
        <p><strong>Duración:</strong> ${curso.duracion} semanas</p>
        <p><strong>Nota mínima:</strong> ${curso.notaMinima}</p>
        <button class="boton-eliminar-curso" onclick="eliminarCurso('${curso.id}')">🗑️ Eliminar</button>
      </div>
    `;
    listaCursos.appendChild(div);
  });
}

function eliminarCurso(id) {
  let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  cursos = cursos.filter((curso) => curso.id !== id);
  localStorage.setItem("cursos", JSON.stringify(cursos));
  mostrarCursos();
}

function eliminarTodos() {
  if (
    confirm(
      "¿Estás seguro de eliminar todos los cursos guardados? Esta acción no se puede deshacer."
    )
  ) {
    localStorage.removeItem("cursos");
    mostrarCursos();
  }
}

document
  .getElementById("nuevoCursoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const nuevoCurso = {};
    formData.forEach((value, key) => (nuevoCurso[key] = value));
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    cursos.push(nuevoCurso);
    localStorage.setItem("cursos", JSON.stringify(cursos));
    this.reset();
    document.getElementById("formularioCurso").style.display = "none";
    mostrarCursos();
  });

window.onload = mostrarCursos;
