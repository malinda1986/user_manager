describe('Login Page', function() {
    
    it('sets auth cookie when logging in via form submission', function () {
       
        cy.visit('http://localhost:8000') // change URL to match your dev URL
    
        cy.get('input[id=username]').type('admin')
    
        // {enter} causes the form to submit
        cy.get('input[id=password]').type(`${'admin'}{enter}`)
    
        cy.visit('http://localhost:8000/en/profile/5c1cd890933f27d92e401556')

        // we should be redirected to /dashboard
        cy.url().should('include', '/en/profile/5c1cd890933f27d92e401556')
    
        // our auth cookie should be present
        cy.getCookie('token').should('exist')
    
      })

      it('gives error message for invalid password', function () {
       
        cy.visit('http://localhost:8000') // change URL to match your dev URL
    
        cy.get('input[id=username]').type('admin')
    
        // {enter} causes the form to submit
        cy.get('input[id=password]').type(`${'admin123'}{enter}`)
    
        // Assert that el is visible
        cy.contains('Sign in').should('be.visible')              
    
      })
  })