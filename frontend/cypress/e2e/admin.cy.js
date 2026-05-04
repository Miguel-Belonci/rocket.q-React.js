const adminUser = {
  id: 1,
  email: "admin@example.com",
  role: "admin",
};

const normalUser = {
  id: 2,
  email: "student@example.com",
  role: "user",
};

function visitWithAuthenticatedUser(path, user) {
  cy.intercept("GET", "**/user/me", {
    statusCode: 200,
    body: {
      user,
    },
  }).as("profileRequest");

  cy.visit(path, {
    onBeforeLoad(window) {
      window.localStorage.setItem("@Auth:token", "fake-jwt-token");
      window.localStorage.setItem("@Auth:user", JSON.stringify(user));
    },
  });

  cy.wait("@profileRequest");
}

describe("Admin access and rooms panel", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows admin menu links only for admin users", () => {
    visitWithAuthenticatedUser("/", adminUser);

    cy.get("[data-cy='menu-button']").click();
    cy.get("[data-cy='users-list-link']").should("be.visible");
    cy.get("[data-cy='admin-rooms-link']").should("be.visible");
  });

  it("does not show admin menu links for normal users", () => {
    visitWithAuthenticatedUser("/", normalUser);

    cy.get("[data-cy='menu-button']").click();
    cy.get("[data-cy='users-list-link']").should("not.exist");
    cy.get("[data-cy='admin-rooms-link']").should("not.exist");
  });

  it("redirects normal users away from the admin rooms page", () => {
    visitWithAuthenticatedUser("/admin", normalUser);

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.contains("Painel administrativo").should("not.exist");
  });

  it("loads the admin rooms page with rooms and owners", () => {
    cy.intercept("GET", "**/rooms/admin/list", {
      statusCode: 200,
      body: {
        rooms: [
          {
            id: 10,
            code: 12345,
            userId: 3,
            createdAt: "2026-04-30T12:00:00.000Z",
            user: {
              id: 3,
              email: "owner@example.com",
            },
            questions: [{ id: 1 }, { id: 2 }],
          },
        ],
      },
    }).as("roomsRequest");
    cy.intercept("GET", "**/user/users-list", {
      statusCode: 200,
      body: {
        users: [
          {
            id: 3,
            email: "owner@example.com",
            role: "user",
            active: true,
          },
        ],
      },
    }).as("usersRequest");

    visitWithAuthenticatedUser("/admin", adminUser);

    cy.wait("@roomsRequest");
    cy.wait("@usersRequest");
    cy.contains("Painel administrativo").should("be.visible");
    cy.get("[data-cy='admin-room-count']").should("contain", "1");
    cy.get("[data-cy='admin-rooms-table']").within(() => {
      cy.contains("12345").should("be.visible");
      cy.contains("owner@example.com").should("be.visible");
      cy.contains("2").should("be.visible");
    });
  });

  it("filters admin rooms by selected user", () => {
    cy.intercept("GET", "**/rooms/admin/list", {
      statusCode: 200,
      body: {
        rooms: [
          {
            id: 10,
            code: 12345,
            userId: 3,
            createdAt: "2026-04-30T12:00:00.000Z",
            user: {
              id: 3,
              email: "owner@example.com",
            },
            questions: [],
          },
          {
            id: 11,
            code: 67890,
            userId: 4,
            createdAt: "2026-04-30T13:00:00.000Z",
            user: {
              id: 4,
              email: "other@example.com",
            },
            questions: [],
          },
        ],
      },
    }).as("initialRoomsRequest");
    cy.intercept("GET", "**/rooms/admin/list?userId=3", {
      statusCode: 200,
      body: {
        rooms: [
          {
            id: 10,
            code: 12345,
            userId: 3,
            createdAt: "2026-04-30T12:00:00.000Z",
            user: {
              id: 3,
              email: "owner@example.com",
            },
            questions: [],
          },
        ],
      },
    }).as("filteredRoomsRequest");
    cy.intercept("GET", "**/user/users-list", {
      statusCode: 200,
      body: {
        users: [
          {
            id: 3,
            email: "owner@example.com",
            role: "user",
            active: true,
          },
          {
            id: 4,
            email: "other@example.com",
            role: "user",
            active: true,
          },
        ],
      },
    }).as("usersRequest");

    visitWithAuthenticatedUser("/admin", adminUser);

    cy.wait("@initialRoomsRequest");
    cy.wait("@usersRequest");
    cy.get("[data-cy='admin-room-count']").should("contain", "2");

    cy.get("[data-cy='admin-user-filter']").select("owner@example.com");

    cy.wait("@filteredRoomsRequest");
    cy.get("[data-cy='admin-room-count']").should("contain", "1");
    cy.contains("salas criadas por owner@example.com").should("be.visible");
    cy.get("[data-cy='admin-rooms-table']").within(() => {
      cy.contains("12345").should("be.visible");
      cy.contains("67890").should("not.exist");
    });
  });
});
