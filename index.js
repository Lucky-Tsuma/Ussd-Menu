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
        return new Promise((resolve, reject) => {
            if(!(sessionId in sessions)) sessions[sessionId] = {}
            resolve(sessions)
            reject(new Error("error"))
        })
    },
    end: (sessionId) => {
        return new Promise((resolve, reject) => {
            delete sessions[sessionId]
            resolve(sessions)
            reject(new Error("error"))
        })
    },
    set: (sessionId, key, value) => {
        return new Promise((resolve, reject) => {
            sessions[sessionId][key] = value
            resolve()
            reject(new Error("error"))
        })
    },
    get: (sessionId, key) => {
        return new Promise((resolve, reject) => {
            let value = sessions[sessionId][key]
            resolve(value)
            reject(new Error("error"))
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

// Errors occuring during state resolution or rejected by their promises will trigger the error event for convinience so we can handle all errors in a single place
menu.on("error", err => {
    console.log(`Error: ${err}`)
    menu.end("There was an error processing your request")
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