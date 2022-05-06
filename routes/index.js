const router = require('koa-router')()

const cpu = require('../module/cpu')
router.get('/', async (ctx, next) => {

})

router.get('/getCpuTem', async (ctx, next) => {
  ctx.body= cpu.getCpuTem()
  ctx.status=200
})

router.get('/FanOff', async (ctx, next) => {
  ctx.body= cpu.FanOff()
  ctx.status=200
})
router.get('/FanOn', async (ctx, next) => {
  ctx.body= cpu.FanON()
  ctx.status=200
})
router.get('/SetFan', async (ctx, next) => {
    let num=ctx.query.num
  ctx.body= cpu.SetFan(num)
  ctx.status=200
})
router.get('/SetAutoFan', async (ctx, next) => {
ctx.body= cpu.autoFan(ctx.query.state)
ctx.status=200
})
router.get('/FanInfo', async (ctx, next) => {
  ctx.body= cpu.FanInfo
  ctx.status=200
  })
module.exports = router
