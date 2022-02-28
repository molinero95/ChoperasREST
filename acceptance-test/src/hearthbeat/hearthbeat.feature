Feature: Check service health

    Scenario: Get service health status
        When I request a heartbeat from the service
        Then I will recieve an UP status

