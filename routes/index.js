const router = require('koa-router')()
const Cpu = require('../models/Cpu'); //引入
const cpu = require('../module/cpu')
router.get('/', async (ctx, next) => {

})

router.get('/getCpuTem', async (ctx, next) => {
  ctx.body = cpu.getCpuTem()
  ctx.status = 200
})

router.get('/FanOff', async (ctx, next) => {
  ctx.body = cpu.FanOff()
  ctx.status = 200
})
router.get('/FanOn', async (ctx, next) => {
  ctx.body = cpu.FanON() 
  ctx.status = 200
})
router.get('/switchFan', async (ctx, next) => {
  if(ctx.query.state==true){
    ctx.body = cpu.FanON()
    console.log('123')
  }else{
    ctx.body = cpu.FanOff()
    console.log('312')
  }
  
  ctx.status = 200
})
router.get('/SetFan', async (ctx, next) => {
  let num = ctx.query.num
  ctx.body = cpu.SetFan(num)
  ctx.status = 200 
})
router.get('/SetAutoFan', async (ctx, next) => {
  let infos = (await Cpu.find())[0]
  let _id={_id:infos._id.toString() }
  infos = {  FanAutoState: ctx.query.state }
  Cpu.updateOne(_id,infos,()=>{})
  ctx.body =  cpu.autoFan(ctx.query.state)
  ctx.status = 200  
})
router.get('/FanInfo', async (ctx, next) => {
  let infos = (await Cpu.find())[0]._doc  
 
  ctx.body = { ...cpu.FanInfo(), ...infos }
  ctx.status = 200
})
module.exports = router
