class Animal {
  constructor(nome, especie) {
    this.nome = nome;
    this.especie = especie;
    this.felicidade = 0;
  }

    alimentar() {
        this.felicidade += 1;
    }
}

module.exports = Animal;