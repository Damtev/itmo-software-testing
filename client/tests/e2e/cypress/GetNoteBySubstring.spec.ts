/// <reference types="cypress" />

context("FindMotivationNotePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Visit get note by substring page, get note, check not empty notes list, go to detail page", () => {
    cy.get("#notes")
      .children()
      .should("not.exist");

    cy.get("#find_string_button").click();

    cy.get("#input_text").type("Президент РФ");
    cy.get("#find_note_by_substring").click();

    cy.get("#notes")
      .children()
      .should("have.length.greaterThan", 0);

    cy.get("#motivation-notes__item").click();

    cy.get("#note-title").should("be.visible");
    cy.get("#note-title").should("not.be.empty");

    cy.get("#note-text").should("be.visible");
    cy.get("#note-text").should("not.be.empty");
  });
});
