/// <reference types="cypress" />

context("Navigation tests", () => {
  function checkEmptyHome() {
    cy.get("#motivation-notes").should("exist");
    cy.get("#title").should("exist");
    cy.get("#random_button").should("exist");
    cy.get("#find_string_button").should("exist");
    cy.get("#find_id_button").should("exist");

    cy.get("#title").should("contain", "Заметки о мотивации");
    cy.get("#random_button").should("contain", "Случайная заметка о мотивации");
    cy.get("#find_string_button").should("contain", "Мотивироваться по строке");
    cy.get("#find_id_button").should("contain", "Мотивироваться по номеру");

    cy.get("#notes")
      .children()
      .should("not.exist");
  }

  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    checkEmptyHome();
  });

  afterEach(() => {
    checkEmptyHome();
  });

  it("Visit random page", () => {
    cy.get("#random_button").click();

    cy.get("#back_home").should("exist");
    cy.get("#back_home").should("be.visible");
    cy.get("#back_home").should("contain", "Домой");

    cy.get("#get_random").should("exist");
    cy.get("#get_random").should("be.visible");
    cy.get("#get_random").should("contain", "Мотивироваться");

    cy.get("#back_home").click();
  });

  it("Visit find by substring page", () => {
    cy.get("#find_string_button").click();

    cy.get("#back_home").should("exist");
    cy.get("#back_home").should("be.visible");
    cy.get("#back_home").should("contain", "Домой");

    cy.get("#find_note_by_substring").should("exist");
    cy.get("#find_note_by_substring").should("be.visible");
    cy.get("#find_note_by_substring").should("contain", "Найти мотивацию");

    cy.get("#input_text").should("exist");
    cy.get("#input_text").should("be.visible");

    cy.get("#back_home").click();
  });

  it("Visit find by id page", () => {
    cy.get("#find_id_button").click();

    cy.get("#back_home").should("exist");
    cy.get("#back_home").should("be.visible");
    cy.get("#back_home").should("contain", "Домой");

    cy.get("#find_note_by_id").should("exist");
    cy.get("#find_note_by_id").should("be.visible");
    cy.get("#find_note_by_id").should("contain", "Найти заметку по номеру");

    cy.get("#input_text").should("exist");
    cy.get("#input_text").should("be.visible");

    cy.get("#back_home").click();
  });
});
