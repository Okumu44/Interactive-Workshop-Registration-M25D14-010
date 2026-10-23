INTERACTIVE WORKSHOP REGISTRATION — LAB 2

IMPORTANT: This version runs directly in a browser. You do not need Node.js, npm, or an internet connection.

HOW TO OPEN THE PROJECT
1. Download the ZIP file.
2. In Windows, right-click the ZIP and choose Extract All.
3. Open the extracted folder named Workshop_Registration_Fixed.
4. To see the code, open VS Code, choose File > Open Folder, and select that extracted folder.
5. In the VS Code Explorer on the left, click index.html, styles.css, or app.js to see the code.
6. To run the webpage, double-click index.html. It opens in your browser.

FILES
- index.html: page structure and form fields
- styles.css: layout, colours, and responsive styling
- app.js: JavaScript-created workshop options, validation, form submission, search, and removal

FEATURES
- Controlled-by-code form updates and clear validation messages
- Name, email, phone, date, age, workshop, and portfolio fields
- Workshop choices generated with JavaScript
- Valid registrations appear immediately
- Remove a participant and search by name, email, or workshop
- Responsive layout for smaller screens
- Uses spread syntax and filter() to create updated arrays

TESTING
1. Click Complete registration without filling the form; errors should appear.
2. Enter valid details, select a workshop, choose today or a future date, and submit.
3. The participant should appear in the list and the form should clear.
4. Search for the participant, then click Remove.

Note: This self-contained browser version uses plain HTML, CSS, and JavaScript so it opens without dependency installation. If your lecturer specifically requires React hooks, this is not a React implementation.
