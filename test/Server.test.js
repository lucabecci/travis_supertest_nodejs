const Server = require("../Server")
const request = require("supertest")
const assert = require("chai").assert
describe("TDD - Server", function(){
  this.server = null
  before(function(){
    this.server = new Server().init(true)
  })
  it("index path async - Server", async function(){
    const response = await request(this.server).get("/")
    assert.deepEqual(
      response.body.message, 
      "Test of Travis CI with supertest and mocha"
    )
    assert.deepEqual(response.body.active, true)
    assert.deepEqual(response.status, 200)
  })

  it("index path callback - Server", function(done){
    this.timeout(20000000)
    request(this.server)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res){
        assert.deepEqual(res.body.active, true)
        assert.deepEqual(
          res.body.message,
          "Test of Travis CI with supertest and mocha"
        )
        done()
      })
  })
})
