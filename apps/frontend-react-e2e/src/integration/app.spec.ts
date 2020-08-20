describe('frontend-react', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.contains('Trends near me!');
  });
});
