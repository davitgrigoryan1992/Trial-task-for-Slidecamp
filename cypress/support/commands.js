const faker = require('faker');
import '@percy/cypress';

const trashButtons = '[class="fa fa-trash"]'
const input = 'form input'
const todoItems = '[class*="list-group-item"]'
const editButtons = '[class="fa fa-edit"]'
const editInput = 'li [type="text"]'

Cypress.Commands.add('checkEditInputVisible', (name) => {
    cy.get(editInput).should('be.visible')
})

Cypress.Commands.add('checkTODOstatus', (name, status) => {
    if (status === 'completed') {
        cy.get(todoItems).contains(name).invoke('attr', 'class').should('contain', status)
    } else if (status === 'not completed') {
        cy.get(todoItems).contains(name).invoke('attr', 'class').should('not.contain', status)
    }
})

Cypress.Commands.add('completeTODO', (name) => {
    cy.get(todoItems).contains(name).first().click()
})

Cypress.Commands.add('addTODO', (name) => {
    cy.get(input).type(`${name}{enter}`)
})

Cypress.Commands.add('clickOnEdit', (match) => {
    cy.get(editButtons).eq(match - 1).click()
})

Cypress.Commands.add('checkTODOnotExist', (name) => {
    cy.get(todoItems).contains(name).should('not.exist')
})

Cypress.Commands.add('editTODOname', (name, opt) => {
    if (opt === "clear") {
        cy.get(editInput).clear().type(`${name}{enter}`)
    } else {
        cy.get(editInput).type(`${name}{enter}`)
    }

})

Cypress.Commands.add('addRandomTODOs', (amount = 1) => {
    let name
    for (let i = 0; i < amount; i++) {
        name = faker.lorem.word()
        cy.get(input).type(`${name}{enter}`)
    }
})

Cypress.Commands.add('checkTODO', (name) => {
    cy.get(todoItems).last().should('have.text', name)
})

Cypress.Commands.add('deleteTODO', (match) => {
    cy.get(trashButtons).eq(match - 1).click()
})

Cypress.Commands.add('checkTODOlength', (len) => {
    cy.get(todoItems).should('have.length', len)
})

Cypress.Commands.add('randomLongName', (min, max) => {
    let rndNumber = Math.round(Math.random() * (max - min) + min);
    var result = '';
    var characters = 'A';
    var charactersLength = characters.length;
    for (var i = 0; i < rndNumber; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
})

Cypress.Commands.add('checkTrashPosition', (match, posiionX) => {
    cy.get(trashButtons).eq(match - 1).then(($el) => {
        let rect = $el[0].getBoundingClientRect();
        cy.window().then(($window) => {
            expect(rect.left + $window.scrollX).to.eq(posiionX)
        });
    })
})

Cypress.Commands.add('checkScrollPosition', (positionY) => {
    cy.window().then(($window) => {
        expect($window.scrollY).to.be.eq(positionY)
        console.log()
    });
})
