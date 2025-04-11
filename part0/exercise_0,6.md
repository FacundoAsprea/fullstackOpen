sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser waits for the submit eventListener to execute
    Note right of browser: Then the note is saved into a js object with its content and date
    Note right of browser: Then the Js code make a POST request with the new note as a JSON

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server/database saves the data but the page isnt refreshed
    deactivate server

    Note right of browser: Then the JS code loads the saved note into the HTML