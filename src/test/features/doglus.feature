Feature: Verify the perfume page Highlight dropdown options

  Scenario: Verify the option in highlight dropdown
    Given User navigates to the application
    When User click on perfume page
    Then Verify user on the perfume page
    When I select the "Highlights" filter from the dropdown
    Then I select the "<FilterOption>" filter option from the dropdown
    Then Verify the "<FilterOption>" filter is applied

    Examples:
      | FilterOption |
      | Sale         |
      | NEU          |
      | Limitiert    |


  Scenario: Verify the option in highlight dropdown is not matching
    Given User navigates to the application
    When User click on perfume page
    Then Verify user on the perfume page
    When I select the "Highlights" filter from the dropdown
    Then I select the "Sale" filter option from the dropdown
    Then Verify the "NEU" filter is applied

 