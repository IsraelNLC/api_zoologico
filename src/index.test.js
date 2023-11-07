const request = require("supertest");
const {app} =  require("./index");

describe("Testando os endpoints", () => {
    it("Deve retornar um erro ao criar um recinto inválido", async () => {
        const response = await request(app)
        .post("/criar_recinto")
        .send({ nome: "Aquário Norte", especieAceita: "Tartaruga Marinha", tratamento: "Bom" });

        expect(response.status).toBe(400); 
        expect(response.text).toBe("Tratamento inválido");
    });

    it("Deve criar um recinto com sucesso", async () => {
        const response = await request(app)
        .post("/criar_recinto")
        .send({ nome: "Ala Felina Central", especieAceita: "Panthera tigris", tratamento: 5 });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Recinto Ala Felina Central criado com sucesso!");
    });
    
    it("Deve retornar um erro ao criar um animal inválido", async () => {
        const response = await request(app)
        .post("/criar_animal")
        .send({ nome: "Simba", especie: "Gato" });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Animal Simba não criado, nenhum recinto foi encontrado.");
    });

    it("Deve criar um animal com sucesso", async () => {
        const response = await request(app)
        .post("/criar_animal")
        .send({ nome: "Mufasa", especie: "Panthera tigris" });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Animal Mufasa criado com sucesso!");
    });

    it("Deve retornar um erro ao realocar um animal", async () => {
        const response = await request(app)
        .post("/realocar_animal")
        .send({ recintoAtual: "Ala Felina Central", recintoNovo: "Ala Felina Sul", nomeAnimal: "Mufasa" });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Animal Mufasa, recinto Ala Felina Central ou Ala Felina Sul não encontrado(s).");
    });

    it("Deve criar um novo recinto, e realocar um animal com sucesso", async () => {
        //  Cria um recinto para o animal ser realocado
        await request(app)
        .post("/criar_recinto")
        .send({ nome: "Ala Felina Norte", especieAceita: "Panthera tigris", tratamento: 10 });

        const response = await request(app)
        .post("/realocar_animal")
        .send({ recintoAtual: "Ala Felina Central", recintoNovo: "Ala Felina Norte", nomeAnimal: "Mufasa" });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Animal Mufasa realocado com sucesso!");
    });

    it("Deve retornar um erro ao alimentar um animal inválido", async () => {
        const response = await request(app)
        .post("/alimentar_animal")
        .send({ nomeAnimal: "Simba" });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Animal Simba não encontrado.");
    });

    it("Deve alimentar um animal com sucesso", async () => {
        const response = await request(app)
        .post("/alimentar_animal")
        .send({ nomeAnimal: "Mufasa" });

        expect(response.status).toBe(200);
        expect(response.text).toBe("Animal Mufasa alimentado com sucesso!");
    });

    it("Deve retornar um erro ao receber visitantes em um recinto inválido", async () => {
        const response = await request(app)
        .post("/receber_visitantes")
        .send({ nomeRecinto: "Aquário Norte"});

        expect(response.status).toBe(400);
        expect(response.text).toBe("Recinto Aquário Norte não encontrado.");
    });

    it("Deve receber visitantes em um recinto com sucesso", async () => {
        const response = await request(app)
        .post("/receber_visitantes")
        .send({ nomeRecinto: "Ala Felina Norte"});

        expect(response.status).toBe(200);
        expect(response.text).toBe("O recinto Ala Felina Norte recebeu 10 visitantes, com uma renda convertida de 100 reais.");
    });
});
