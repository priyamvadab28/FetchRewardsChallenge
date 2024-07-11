class GamePage{

    elements = {
        resetBtn: () => cy.contains('button', 'Reset'),
        resultBtn: () => cy.get('div[class="result"]').find("button#reset"),
        weighBtn: () => cy.get("#weigh"),   
    }

    clickResetButton() {
        this.elements.resetBtn().click({force:true});
      }

    clickWeighButton() {
        this.elements.weighBtn().should("be.visible").click();
    }
    
    clickCoinButton(number){
        const selector= `button#coin_${number}`
       cy.get('div[class="coins"]').find(selector).click()

    }

    getResultButton(){
        return this.elements.resultBtn();

    }

     getTextFromResultButton(){
        this.elements.resultBtn().then(($value) => {
            Cypress.config('defaultCommandTimeout', 10000);
            const getText = $value.text();
            Cypress.env('measurement', getText)
            cy.log("Result is: "+ Cypress.env('measurement'));
        })
       
    }
    
    enterWeightOnGrid(side, cell, number) {
        const selector= `input#${side}_${cell}`
        cy.get(selector).type(number);
      }
    
     assertAlertMessage(text){
        cy.on('window:alert', (text) => {
            expect(text).to.eq('alert text')
            done()                              // waiting for event, fails on timeout    
          })
     }   
    
    
}

export const gamePage= new GamePage();