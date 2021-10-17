const express = require("express")

class Server {
  #server = null
  #app = null
  init(test=false){
    this.#app = express()
    this.#middleware()
    if(test) return this.#app
  }
  #middleware(){
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: false }))
    this.#app.get("/", function(req, res){
      return res.status(200).json({
        active: true,
        message: "Test of Travis CI with supertest and mocha"
      })
    })
  }
  start(){
    this.#server = this.#app.listen(4040,() => {
      console.log("Server on port:", 4040)
    })
  }
  close(){
    this.#server.close()
  }

  test(){
    return this.#app
  }
}

module.exports = Server
