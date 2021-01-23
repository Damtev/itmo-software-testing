/// <reference types="cypress" />

context("RandomMotivationNote", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Visit random page, get random note, check not empty notes list, go to detail page", () => {
    cy.get("#notes")
      .children()
      .should("not.exist");

    cy.get("#random_button").click();

    cy.get("#get_random").click();

    cy.get("#notes")
      .children()
      .should("have.length", 1);

    cy.get("#motivation-notes__item").click();

    cy.get("#note-title").should("be.visible");
    cy.get("#note-title").should("not.be.empty");

    cy.get("#note-text").should("be.visible");
    cy.get("#note-text").should("not.be.empty");
  });
});
