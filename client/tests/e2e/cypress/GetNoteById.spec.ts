/// <reference types="cypress" />

context("FindMotivationNotePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Visit get note by substring page, get note, check not empty notes list, go to detail page", () => {
    cy.get("#notes")
      .children()
      .should("not.exist");

    cy.get("#find_id_button").click();

    cy.get("#input_text").type("1");
    cy.get("#find_note_by_id").click();

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
