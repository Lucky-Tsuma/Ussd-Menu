const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();
let name;

menu.startState({
    run: () => {  
        menu.con('Welcome. Please enter your name:');
    },
    
    next: {
        '*[a-zA-Z]+': 'enter.age'
    }
});

menu.state('enter.age', {
    run: () => {
        name = menu.val;
        menu.con('Enter your age:');
    },
    next: {
      '*\\d+': 'result'
    }
});

menu.state('result', {
  run: () => {
    let age = menu.val;
    age > 30 ? menu.end(`Welcome ${name } age gracefully`) : menu.end(`Welcome young ${name } the future awaits`);
  }
});

// Registering USSD handler with Express

app.post('/', async (req, res) => {
    // Read the variables sent via POST from Africas talking
    let args = {
        phoneNumber: req.body.phoneNumber,
        sessionId: req.body.sessionId,
        serviceCode: req.body.serviceCode,
        text: req.body.text
    };

    let resMsg = await menu.run(args);

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(resMsg);
});

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});