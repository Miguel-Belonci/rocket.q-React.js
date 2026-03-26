describe("Login flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("logs in successfully and redirects to home", () => {
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
    cy.get("[data-cy='login-password']").type("12345678");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest");
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.window().then((window) => {
      expect(window.localStorage.getItem("@Auth:token")).to.eq("fake-jwt-token");
      expect(JSON.parse(window.localStorage.getItem("@Auth:user"))).to.deep.equal({
        id: 1,
        email: "student@example.com",
        role: "user",
      });
    });
  });

  it("shows validation error when fields are empty", () => {
    cy.visit("/login");
    cy.get("[data-cy='login-submit']").click();
    cy.contains("Email e senha são obrigatórios").should("be.visible");
  });
});
