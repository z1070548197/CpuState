const router = require('koa-router')()

const cpu = require('../module/cpu')
router.get('/', async (ctx, next) => {

})

router.get('/getCpuTem', async (ctx, next) => {
  ctx.body= cpu.getCpuTem()
  ctx.status=200
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
