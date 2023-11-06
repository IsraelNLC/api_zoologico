const request = require("supertest");
const index = require("./index");

describe("Testando os endpoints", () => {
    it("Deve criar um recinto com sucesso", async () => {
        const response = await request(index)
        .post("/criar_recinto")
        .send({ nome: "Ala Felina Central", especieAceita: "Panthera tigris", tratamento: 5 });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Recinto Ala Felina Central criado com sucesso!");
    });
});

//     it("Deve retornar um erro ao criar um recinto inválido", async () => {
//         const response = await request(index)
//         .post("/criar_recinto")
//         .send({ nome: "Ala Felina Central", especieAceita: "Leão", tratamento: 5 });

//         expect(response.status).toBe(200); // Dependendo da lógica da sua aplicação, pode ser um código de erro diferente.
//         expect(response.text).toBe("Recinto Ala Felina Central não criado, nome repetido.");
//     });
        

//     it("Deve criar um animal com sucesso", async () => {
//         const response = await request(index)
//         .post("/criar_animal")
//         .send({ nome: "Zeus", especie: "Canis Lupus" });

//         expect(response.status).toBe(200);
//         expect(response.text).toBe("Animal Tigre criado com sucesso!");
//     });

//     it("Deve retornar um erro ao criar um animal inválido", async () => {
//         const response = await request(index)
//         .post("/criar_animal")
//         .send({ nome: "Mufasa", especie: "Gato" });

//         expect(response.status).toBe(200); // Dependendo da lógica da sua aplicação, pode ser um código de erro diferente.
//         expect(response.text).toBe("Animal Leão não criado, nenhum recinto foi encontrado.");
//     });

// });
