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
    cy.get("[data-cy='login-password']").type("Teste_forte_897clea");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginRequest");
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.window().then((window) => {
      expect(window.localStorage.getItem("@Auth:token")).to.eq(
        "fake-jwt-token",
      );
      expect(
        JSON.parse(window.localStorage.getItem("@Auth:user")),
      ).to.deep.equal({
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

  it("shows validation error when email or password are invalid", () => {
    cy.intercept("POST", "**/register/auth", {
      statusCode: 401,
      body: {
        error: "Usuário ou senha inválida",
      },
    }).as("loginError");

    cy.visit("/login");
    cy.get("[data-cy='login-email']").type("student@example.com");
    cy.get("[data-cy='login-password']").type("Teste_forte_897clea");
    cy.get("[data-cy='login-submit']").click();

    cy.wait("@loginError");
    cy.url().should("contain", "/login");
    cy.contains("Usuário ou senha inválida").should("be.visible");
  });

  it("should redirect user to login page if users isn`t authorized", () => {
    cy.visit("/");

    cy.url().should("include", "/login");
  });

  it("should logout user successfully", () => {
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

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);

    cy.get("[data-cy='menu-button']").click();
    cy.get("[data-cy='logout-button']").click();

    cy.url().should("include", "/login");

    cy.should(() => {
      expect(localStorage.getItem("@Auth:token")).to.be.null;
      expect(localStorage.getItem("@Auth:user")).to.be.null;
    });
  });
});
