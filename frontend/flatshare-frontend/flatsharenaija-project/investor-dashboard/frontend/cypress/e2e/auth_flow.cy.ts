describe('Auth Flow', () => {
  it('logs in, stores tokens, accesses protected route, refreshes token', () => {
    cy.visit('/login');

    // Fill login form
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify tokens stored
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.exist;
      expect(win.localStorage.getItem('refresh_token')).to.exist;
    });

    // Navigate to protected route
    cy.visit('/listings');
    cy.contains('Available Listings');

    // Simulate token expiry
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'expiredtoken');
    });

    // Trigger API call that should refresh
    cy.reload();
    cy.contains('Available Listings');

    // Verify refreshed token
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).not.eq('expiredtoken');
    });
  });
});
