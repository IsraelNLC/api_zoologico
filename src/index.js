const express = require('express')
const Animal = require('./animal')
const Recinto = require('./recinto')
var recintos = []

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        this.app.post('/criar_animal', (req, res) => {
            var animal = new Animal(req.body.nome, req.body.especie)
            for (var i = 0; i < recintos.length; i++) {
                if (recintos[i].especieAceita == animal.especie) {
                    recintos[i].animais.push(animal)
                    res.send(`Animal ${req.body.nome} criado com sucesso!`)
                    console.log(animal) 
                    return
                }
                else {
                    res.send(`Animal ${req.body.nome} não criado, nenhum recinto foi encontrado.`)
                    return
                }
            }
        })

        this.app.post('/criar_recinto', (req, res) => {
            if(typeof req.body.tratamento != "number" || req.body.tratamento < 0 || req.body.tratamento > 10) {
                console.log("Tratamento inválido");
                res.send("Tratamento inválido");
                return;
            }
            var recinto = new Recinto(req.body.nome, req.body.especieAceita, req.body.tratamento)
            recintos.push(recinto)
            console.log(recinto)
            res.send(`Recinto ${req.body.nome} criado com sucesso!`)
        })

        this.app.post('/realocar_animal', (req, res) => {
            var recintoAtual = req.body.recintoAtual
            var recintoNovo = req.body.recintoNovo
            var nomeAnimal = req.body.nomeAnimal

            for (var i = 0; i < recintos.length; i++) {
                if (recintos[i].nome == recintoAtual) {
                    for (var j = 0; j < recintos.length; j++) {
                        if (recintos[j].nome == recintoNovo) {
                            for (var k = 0; k < recintos[i].animais.length; k++) {
                                if (recintos[i].animais[k].nome == nomeAnimal) {
                                    recintos[j].animais.push(recintos[i].animais[k])
                                    recintos[i].animais.splice(k, 1)
                                    res.send(`Animal ${nomeAnimal} realocado com sucesso!`)
                                    console.log(recintos[j])
                                    return
                                }
                            }
                        }
                    }
                }
            }
        })

        this.app.post('/alimentar_animal', (req, res) => {
            var nomeAnimal = req.body.nomeAnimal

            for (var i = 0; i < recintos.length; i++) {
                    for (var j = 0; j < recintos[i].animais.length; j++) {
                        if (recintos[i].animais[j].nome == nomeAnimal) {
                            recintos[i].animais[j].alimentar()
                            res.send(`Animal ${nomeAnimal} alimentado com sucesso!`)
                            console.log(recintos[i].animais[j])
                            return
                        }
                    }
            }
        })

        this.app.post('/receber_visitantes', (req, res) => {
            var recinto = req.body.recinto
            var numeroVisitantes = 0
            var renda = 0
            
            for (var i = 0; i < recintos.length; i++) {
                if (recintos[i].nome == recinto) {
                    for (var j = 0; j < recintos[i].animais.length; j++) {
                        numeroVisitantes += recintos[i].animais[j].felicidade * recintos[i].tratamento
                    }
                    renda = numeroVisitantes * 10
                    recintos[i].renda = renda
                    res.send(`O recinto ${recinto} recebeu ${numeroVisitantes} visitantes, com uma renda convertida de ${renda} reais.`)
                    return
                }
            }
        })
    }
}

const app = new App().app
app.listen(3000, () => console.log('App listening on port 3000!'))