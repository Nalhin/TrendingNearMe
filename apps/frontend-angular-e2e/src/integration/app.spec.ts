describe('frontend-angular', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.contains('Trending near me');
  });
});
