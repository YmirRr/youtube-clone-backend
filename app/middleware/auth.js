module.exports = () => {
  return async (ctx, next) => {
    // 1.获取请求头中的 token 数据
    console.log(ctx.headers['authorization'])
    let token = ctx.headers['authorization'] // Bearer空格token
    token = token ? token.split('Bearer ')[1] : null
    // 2.验证 token，无效 401
    if (!token) {
      ctx.throw(401)
    }
    ctx.token = token
    try {
      // 3.token 有效，根据 userId 获取用户数据挂载到 ctx 对象中给后续中间件使用
      const data = ctx.service.user.verifyToken(token)
      ctx.user = await ctx.model.User.findById(data.userId)
    } catch (err) {
      ctx.throw(401)
    }
    // 4.执行后续中间件
    await next()
  }
}