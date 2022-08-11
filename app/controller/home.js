'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const { User } = this.app.model
    await new User({
      userName: 'ymir',
      password: '123456',
    }).save()
    ctx.body = 'hi, egg'
  }
}

module.exports = HomeController
