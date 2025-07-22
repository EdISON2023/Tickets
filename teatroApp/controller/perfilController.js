document.addEventListener('DOMContentLoaded', () => {
  const perfil = window.perfilModel.getPerfil();
  document.getElementById('nombre').value = perfil.nombre;
  document.getElementById('usuario').value = perfil.usuario;
  document.getElementById('email').value = perfil.email;
  document.getElementById('telefono').value = perfil.telefono;
  document.getElementById('rol').value = perfil.rol;

  document.getElementById('perfil-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    // El rol no se puede editar aquí

    window.perfilModel.actualizarPerfil({ nombre, usuario, email, telefono });

    document.getElementById('perfil-msg').textContent = "Perfil actualizado correctamente.";
    setTimeout(() => {
      document.getElementById('perfil-msg').textContent = "";
      window.location.href = "dashboard.html";
    }, 1200);
  });
});