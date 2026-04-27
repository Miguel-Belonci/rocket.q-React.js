describe("room flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept("POST", "**/register/auth", {
      statusCode: 200,
      body: {
        user: {
          id: 1,
          email: "student@example.com",
          role: "user",
        },
        token: "fake-jwt-token",
      },
    }).as("loginRequest");

    cy.visit("/login");
    cy.get("[data-cy='login-email']").type("student@example.com");
    cy.get("[data-cy='login-password']").type("Teste_forte_897clea");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest");
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });

  it("Should create room successfully", () => {
    cy.intercept("POST", "**/api/rooms/create", {
        statusCode: 201,
        body:{
            id:1,
            code:23456,
        }
    }).as("roomRequest")

     cy.intercept("GET", "**/api/rooms/*", {
        statusCode: 200,
         body:{
            id:1,
            code:23456,
            questions:[]
        }
    }).as("get-room")


    cy.get("[data-cy='create-link']").click();
    cy.url().should("include", "/create-pass");

    cy.get("[data-cy='create-pass']").type("12345");
    cy.get("[data-cy='create-room-button']").click();

    cy.wait("@roomRequest")
    cy.wait("@get-room")
    cy.url().should("include", `/room/`);
  });
});
