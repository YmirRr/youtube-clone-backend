const Controller = require('egg').Controller

class UserController extends Controller {
  async create() {
    // 1.数据校验
    const body = this.ctx.request.body
    this.ctx.validate({
      username: { type: 'string' },
      email: { type: 'email' },
      password: { type: 'string' },
    }) // 默认验证 body 中的数据

    const userService = this.service.user

    if (await userService.findByUsername(body.username)) {
      this.ctx.throw(422, '用户已存在')
    }
    if (await userService.findByEmail(body.email)) {
      this.ctx.throw(422, '邮箱已存在')
    }

    // 2.保存用户
    const user = await userService.createUser(body)

    // 3.生成 token
    const token = userService.createToken({
      userId: user._id,
    })

    // 4.发送响应
    this.ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar,
      },
    }
  }
  async login() {
    // 1.基本数据验证
    const body = this.ctx.request.body
    this.ctx.validate(
      {
        email: { type: 'email' },
        password: { type: 'string' },
      },
      body,
    )
    // 2.校验邮箱是否存在
    const userService = this.service.user
    const user = await userService.findByEmail(body.email)
    if (!user) {
      this.ctx.throw(422, '用户不存在')
    }
    // 3.校验密码是否正确
    if (this.ctx.helper.md5(body.password) !== user.password) {
      this.ctx.throw(422, '密码不正确')
    }

    // 4.生成 Token
    const token = userService.createToken({
      userId: user._id,
    })
    // 5.发送响应数据
    this.ctx.body = {
      email: user.email,
      token,
      username: user.username,
      channelDescription: user.channelDescription,
      avatar: user.avatar,
    }
  }
  async getCurrentUser() {
    // 1.验证 token
    // 2.获取用户
    // 3.发送响应
    const user = this.ctx.user
    this.ctx.body = {
      email: user.email,
      token: this.ctx.token,
      username: user.username,
      channelDescription: user.channelDescription,
      avatar: user.avatar,
    }
  }
}

module.exports = UserController
