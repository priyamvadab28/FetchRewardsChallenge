import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

import {gamePage} from '../../pages/GamePage'

Given(`challenge page is open`, () => {
    cy.visit("http://sdetchallenge.fetch.com/");
    
});

When(`user clicks on reset button`, () => {
    gamePage.clickResetButton();
});

When(`user clicks on weigh button`, () => {
    gamePage.clickWeighButton();
});

When(`user enter weigh {string} on {string} bowl cell {string}`, (weigh, side, cell) => {
    gamePage.enterWeightOnGrid(side, cell, weigh);
});


Then(`get the measurement results`, () => {
    cy.pause();
    gamePage.getTextFromResultButton();
});

When(`user click on coin {string}`, (number) => {
    gamePage.clickCoinButton(number);
});

Then(`Alert message is {string}`, (message) => {
    gamePage.assertAlertMessage(message);
});

Then(`count list of weighing`, () => {
    cy.get('div[class="game-info"]').find('li').its('length').then((len) => {
    cy.log(len) //prints length
  })
   // cy.log("List length is: " + '${count}')
});

let result;

Then(`find fake bar`, () => {
    cy.log("Inside fake bar")

    var left;
    var right;
    var coins= ["0", "1", "2", "3", "5", "6", "7", "8"]

    var len = coins.length;
    while(len>=2){
       
        len=len/2;
        left = coins.slice(0, coins.length / 2);
        cy.log("length of left is"+ left.length);
        right = coins.slice(coins.length / 2, coins.length);
        balanceScale(left, right);

        var m;
        cy.get('@result').then( result =>{
            cy.log("text1 measurement is"+ result)
            if(result === '>'){

                cy.log("inside if statement")
                
                this.coins = coins.slice(coins.length / 2, coins.length);
                cy.log("length of coin"+ coins.length)
                if(len === 2){
                    cy.log("fake coin is ="+ right);
                }  
                
            }
            else if(result === '<'){
                
                cy.log("inside if statement")
                this.coins = coins.slice(0, coins.length / 2);
                cy.log("length of coin"+ coins.length)
                if(len === 2){
                    cy.log("fake coin is ="+ left);
                }    
        
            }
            else if(result === '='){
                cy.log("fake coin is = 4")
                gamePage.clickCoinButton(4);
                gamePage.assertAlertMessage("Yay! You find it!");
        
            } 
    

            
        }
    
        )
        
        cy.log("text11 measurement is"+ this.result)

       /*  if(result === '>'){

            cy.log("inside if statement")
            
            coins = coins.slice(coins.length / 2, coins.length);
            if(len === 2){
                cy.log("fake coin is ="+ right);
            }  
            
        }
        else if(m === '<'){
          
            coins = coins.slice(0, coins.length / 2);
            if(len === 2){
                cy.log("fake coin is ="+ left);
            }    
    
        }
        else if(m === '='){
            cy.log("fake coin is = 4")
            gamePage.clickCoinButton(4);
            gamePage.assertAlertMessage("Yay! You find it!");
    
        } 
 */
   }
});


 function balanceScale(left, right){
        
    var n=0
    for(let coin of left){
        //cy.log(coin);
        
        gamePage.enterWeightOnGrid("left", n.toString(), coin);
        n++;
     }

     n=0;
    for(let coin of right){
        //cy.log(coin);
        gamePage.enterWeightOnGrid("right", n.toString(), coin);
        n++;
    }
    gamePage.clickWeighButton();
    cy.pause();
    gamePage.getResultButton().then(($value) => {
        Cypress.config('defaultCommandTimeout', 10000);
        getText = $value.text();
        cy.wrap(getText).as('result')
        //Cypress.env('measurement', getText)
        //cy.log("Result is: "+ Cypress.env('measurement'));
    });

    cy.get('@result').then( result =>{
        cy.log("text measurement is"+ result)
    }

    )
    
    gamePage.clickResetButton();
}
