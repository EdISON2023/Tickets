class SalaModel {
  constructor() {
    this.salas = [
      {
        id: 1,
        nombre: "Sala Principal",
        capacidad: 15,
        asientosOcupados: [3, 5, 8], // Números de asiento vendidos
        asientosReservados: [2, 7]   // Números de asiento reservados
      }
    ];
  }

  getSalas() {
    return this.salas;
  }

  getSalaById(id) {
    return this.salas.find(s => s.id === id);
  }

  agregarSala(sala) {
    this.salas.push(sala);
  }

  actualizarSala(id, data) {
    const sala = this.getSalaById(id);
    if (sala) Object.assign(sala, data);
  }

  eliminarSala(id) {
    this.salas = this.salas.filter(s => s.id !== id);
  }

  // Marcar asientos como vendidos
  venderAsientos(id, asientos) {
    const sala = this.getSalaById(id);
    if (sala) {
      sala.asientosOcupados = [...new Set([...sala.asientosOcupados, ...asientos])];
      sala.asientosReservados = sala.asientosReservados.filter(a => !asientos.includes(a));
    }
  }

  // Reservar asientos
  reservarAsientos(id, asientos) {
    const sala = this.getSalaById(id);
    if (sala) {
      sala.asientosReservados = [...new Set([...sala.asientosReservados, ...asientos])];
    }
  }
}

window.salaModel = new SalaModel();