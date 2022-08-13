const Controller = require('egg').Controller

class UserController extends Controller {
  async create() {
    // 1.数据校验
    const body = this.ctx.request.body
    this.ctx.validate({
      username: { type: 'string' },
      email: { type: 'email' },
      password: { type: 'string' },
    })

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
}

module.exports = UserController
