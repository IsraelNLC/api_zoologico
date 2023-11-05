class Recinto {
    constructor(nome, especieAceita, tratamento, animais = []) {
      this.nome = nome;
      this.especieAceita = especieAceita;
      this.tratamento = tratamento;
      this.animais = animais;
      this.renda = 0;
    }

    removerAnimal(nome) {
        for (var i = 0; i < this.animais.length; i++) {
            if (this.animais[i].nome == nome) {
                this.animais.splice(i, 1);
                return;
            }
            else {
                console.log("Animal não encontrado");
            }
        }
    }

  adicionarAnimal(animal) {
    if (animal.especie == this.especieAceita) {
        this.animais.push(animal);
    }
    else {
        console.log("Animal não aceito");
    }
  }

}
  
module.exports = Recinto;