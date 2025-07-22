class PerfilModel {
  constructor() {
    // Simulación de un solo perfil (puedes adaptar para multiusuario)
    this.perfil = {
      id: 1,
      nombre: "Administrador",
      usuario: "admin",
      email: "admin@teatroapp.com",
      telefono: "0999999999",
      rol: "admin"
    };
  }

  getPerfil() {
    return this.perfil;
  }

  actualizarPerfil(data) {
    this.perfil = { ...this.perfil, ...data };
  }
}

window.perfilModel = new PerfilModel();