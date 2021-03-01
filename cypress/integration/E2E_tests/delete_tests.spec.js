context('Delete tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.checkTODOlength(3)
    })

    it('Delete TODO and check', () => {
        cy.addTODO('new TODO')
        cy.checkTODOlength(4)
        cy.checkTODO('new TODO')
        cy.deleteTODO(4)
        cy.checkTODOlength(3)
        cy.percySnapshot('check_page_after_delete')
        cy.checkTODOnotExist('new TODO')
    })

    it('Added TODOs are deleted after reload', () => {
        cy.addTODO('new TODO')
        cy.checkTODOlength(4)
        cy.checkTODO('new TODO')
        cy.reload()
        cy.checkTODOlength(3)
        cy.checkTODOnotExist('new TODO')
    })
})
