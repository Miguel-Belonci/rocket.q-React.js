# Cenarios de teste

## Unit
- `generateCode.test.js`: valida uma regra isolada sem subir API ou banco real.
- `authMiddleware.test.js`: mostra como testar middleware puro.

## Integration
- `registerRoutes.test.js`: exercita rota HTTP real com Express + Supertest e banco SQLite em memoria.

## E2E
- O E2E fica no frontend com Cypress em `frontend/cypress/e2e/login.cy.js`.
- O fluxo cobre login, redirecionamento e persistencia no `localStorage`.
