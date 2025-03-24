describe("Counter Component", () => {
  it("renders the initial value provided in props", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Count: 0");
  });

  it("clicking decrement button decrements the displayed value", () => {
    cy.visit("http://localhost:3000");

    cy.get('button[aria-label="Decrease count"]').click();

    cy.contains("Count: -1");
  });

  it("clicking increment button increments the displayed value", () => {
    cy.visit("http://localhost:3000");

    cy.get('button[aria-label="Increase count"]').click();

    cy.contains("Count: 1");
  });
});
