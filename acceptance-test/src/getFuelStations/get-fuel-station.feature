Feature: Get fuel station

    Scenario: Get a fuel station
        When I request to the fuel station api for fuel stations
        Then I will recieve the following fuel station data:
            | id     | 1            |
            | rotulo | chopera_test |

