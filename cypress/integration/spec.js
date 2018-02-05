/* eslint-env mocha */
/* global cy */
describe("HackerNews", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('loads',() => {
    cy.contains("Built with Vue.js")
  })

  it('loads more than 10 news items', () => {
    cy.get(".news-item").should("have.length.gt", 10)
  })

  it('goes to the second page and back', () => {
    cy.contains(".news-list-nav a", "more >").click()
    cy.url().should("contain", "/top/2")
    cy.go("back")
    cy.url().should("contain", "/top")
  })

  it("cannot go to the previous page", () => {
    cy.contains(".news-list-nav a", "< prev").should("have.class", "disabled")
  })

  it("goes to comments and back", () => {
    cy.get(".news-item").first().find(".meta .comments-link").click()
    cy.get(".item-view-comments-header .spinner").should("not.be.visible")
    cy.get(".item-view-comments").should("have.length.gte", 0).and("be.visible")
    cy.get("nav").contains("Top").click()
    cy.url().should("contain", "/top")
  })
})