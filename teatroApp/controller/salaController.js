document.addEventListener('DOMContentLoaded', () => {
  renderSalas();

  document.getElementById('form-sala').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('salaId').value;
    const nombre = document.getElementById('nombre').value.trim();
    const capacidad = parseInt(document.getElementById('capacidad').value, 10);

    if (nombre && capacidad > 0) {
      if (editando && id) {
        window.salaModel.actualizarSala(Number(id), {
          nombre, capacidad
        });
      } else {
        const nuevaSala = {
          id: Date.now(),
          nombre,
          capacidad,
          asientosOcupados: [],
          asientosReservados: []
        };
        window.salaModel.agregarSala(nuevaSala);
      }
      renderSalas();
      limpiarFormulario();
    }
  });

  document.getElementById('btn-cancelar').addEventListener('click', limpiarFormulario);
});

let editando = false;

function renderSalas() {
  const salas = window.salaModel.getSalas();
  const salaList = document.getElementById('sala-list');
  salaList.innerHTML = '';
  salas.forEach((sala) => {
    const ocupados = sala.asientosOcupados ? sala.asientosOcupados.length : 0;
    const reservados = sala.asientosReservados ? sala.asientosReservados.length : 0;
    const libres = sala.capacidad - ocupados - reservados;
    const total = sala.capacidad;

    const div = document.createElement('div');
    div.className = 'sala-item';
    div.innerHTML = `
      <h2>${sala.nombre}</h2>
      <div class="info">
        <b>${libres}</b> libres &nbsp;|&nbsp;
        <span style="color:#2ecc71;">${ocupados} usados</span> &nbsp;|&nbsp;
        <span style="color:#f6b93b;">${reservados} reservados</span> &nbsp;|&nbsp;
        <span style="color:#aaa;">Total: ${total}</span>
      </div>
      <div class="acciones">
        <button class="btn" onclick="editarSala(${sala.id})">Editar</button>
        <button class="btn" onclick="eliminarSala(${sala.id})" style="background:#e74c3c;">Eliminar</button>
      </div>
    `;
    salaList.appendChild(div);
  });
}

function eliminarSala(id) {
  window.salaModel.eliminarSala(id);
  renderSalas();
  limpiarFormulario();
}

function editarSala(id) {
  const sala = window.salaModel.getSalaById(id);
  if (sala) {
    document.getElementById('salaId').value = sala.id;
    document.getElementById('nombre').value = sala.nombre;
    document.getElementById('capacidad').value = sala.capacidad;
    document.getElementById('form-title').textContent = "Editar Sala";
    document.getElementById('btn-guardar').textContent = "Actualizar Sala";
    document.getElementById('btn-cancelar').style.display = "inline-block";
    editando = true;
  }
}

function limpiarFormulario() {
  document.getElementById('form-sala').reset();
  document.getElementById('salaId').value = "";
  document.getElementById('form-title').textContent = "Agregar Nueva Sala";
  document.getElementById('btn-guardar').textContent = "Agregar Sala";
  document.getElementById('btn-cancelar').style.display = "none";
  editando = false;
}

// Exponer funciones globales para los botones
window.eliminarSala = eliminarSala;
window.editarSala = editarSala;