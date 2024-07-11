Feature: Test to perform actions on elements

  
Scenario: Enter weights on both sides and click buttons and assert alert
    Given challenge page is open
    When user enter weigh "0" on "left" bowl cell "0"
    When user enter weigh "1" on "left" bowl cell "1"
    When user enter weigh "2" on "left" bowl cell "2"
    When user enter weigh "3" on "left" bowl cell "3"
    And user enter weigh "8" on "right" bowl cell "0"
    And user enter weigh "7" on "right" bowl cell "1"
    And user enter weigh "6" on "right" bowl cell "2"
    And user enter weigh "5" on "right" bowl cell "3"
    Then user clicks on weigh button
    And get the measurement results
    When user clicks on reset button
    Then count list of weighing
    When user click on coin "3"
    Then Alert message is "Oops! Try Again!"

   
   


 


