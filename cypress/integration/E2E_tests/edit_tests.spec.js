context('Edit tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.checkTODOlength(3)
    })

    it('Edit TODO and check', () => {
        cy.addTODO('new TODO')
        cy.checkTODOlength(4)
        cy.checkTODO('new TODO')
        cy.clickOnEdit(4)
        cy.editTODOname(' edited')
        cy.percySnapshot('check_page_after_edit')
        cy.checkTODOlength(4)
        cy.addTODO('new TODO edited')
    })

    //This feature has bug
    it('Edit TODO name to empty name and check', () => {
        cy.addTODO('new TODO')
        cy.checkTODOlength(4)
        cy.checkTODO('new TODO')
        cy.clickOnEdit(4)
        cy.editTODOname('', 'clear')
        cy.checkEditInputVisible()
    })

    it('Edit TODO as completed', () => {
        cy.addTODO('new TODO')
        cy.checkTODOlength(4)
        cy.checkTODO('new TODO')
        cy.checkTODOstatus('new TODO', 'not completed')
        cy.completeTODO('new TODO')
        cy.percySnapshot('check_page_after_comleting_todo')
        cy.checkTODOstatus('new TODO', 'completed')
    })
})
