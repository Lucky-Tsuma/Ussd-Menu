const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT

const UssdMenu = require("ussd-menu-builder")
let menu = new UssdMenu()
let sessions = {}
menu.sessionConfig({
    start: (sessionId) => {
        return new Promise((resolve) => {
            if(!(sessionId in sessions)) sessions[sessionId] = {}
            resolve(sessions)
        })
    },
    end: (sessionId) => {
        return new Promise((resolve) => {
            delete sessions[sessionId]
            resolve(sessions)
        })
    },
    set: (sessionId, key, value) => {
        return new Promise((resolve) => {
            sessions[sessionId][key] = value
            resolve()
        })
    },
    get: (sessionId, key) => {
        return new Promise((resolve) => {
            let value = sessions[sessionId][key]
            resolve(value)
        })
    }
})

menu.startState({
    run: () => {  
        menu.con("Welcome. Please enter your name:")
    },
    next: {
        "*[a-zA-Z]+": "enter.age"
    },
    defaultNext: "invalidOption"
})

menu.state("enter.age", {
    run: () => {
        let name = menu.val
        menu.session.set("name", name).then(() => {
            menu.con("Enter your age:")
        })
    },
    next: {
      "*\\d+": "result"
    },
    defaultNext: "invalidOption"
})

menu.state("result", {
  run: () => {
    let age = menu.val
    menu.session.get("name").then(name => {
        age > 30 ? menu.end(`Welcome ${name } age gracefully`) : menu.end(`Welcome young ${name } the future awaits`)
    })
  }
})

menu.state("invalidOption", {
    run: () => {
        menu.end("You entered an invalid option. Please try again!")
    }
})

// Registering USSD handler with Express
app.post("/", async (req, res) => {
    // Read the variables sent via POST from Africas talking / postman etc
    let args = {
        phoneNumber: req.body.phoneNumber,
        sessionId: req.body.sessionId,
        serviceCode: req.body.serviceCode,
        text: req.body.text
    }

    let resMsg = await menu.run(args)

    // Send the response back to the API
    res.set("Content-Type: text/plain")
    res.send(resMsg)
})

app.listen(port, () => {
    console.log(`Application running on port ${port}`)
})