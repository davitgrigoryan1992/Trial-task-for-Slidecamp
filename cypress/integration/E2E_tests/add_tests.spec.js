context('Add tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.checkTODOlength(3)
  })

  it('Add TODO and check', () => {
    cy.percySnapshot('check_default_page')
    cy.addTODO('new TODO')
    cy.checkTODOlength(4)
    cy.percySnapshot('check_page_after_add')
    cy.checkTODO('new TODO')
  })

  it('Add TODO with empty name and check', () => {
    cy.addTODO('')
    cy.checkTODOlength(3)
  })

  //This feature has bug
  it.only('Add TODO with long name and check positions', () => {
    cy.randomLongName(66,90).then((name) => {
      cy.addTODO(name)
      cy.checkTODOlength(4)
      cy.percySnapshot('check_page_with_long_todo_name')
      cy.checkTrashPosition(4, 438)
    })
  })

  it('Add TODOs and check scroll appears', () => {
    cy.addRandomTODOs(20)
    cy.checkTODOlength(23)
    cy.scrollTo('bottom')
    cy.checkScrollPosition(950)
  })
})
