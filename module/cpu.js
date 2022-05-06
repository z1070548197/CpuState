const rpio = require('rpio') //进入GPIO node库 
const fs = require('fs')
const CON = require('../utils/config')
const DB = require('../module/db.js'); //引入db
const Cpu = require('../models/Cpu'); //引入
const { info } = require('console');
let Max = CON.Max; //频率最高值
let Min = CON.Min;//频率最低值
let autoInterval = null; //定时器存储
let pwm_pin = CON.pwm_pin;  // 排针第12引脚
let PublicNum = 50 //默认风扇转数 100为慢速
rpio.open(pwm_pin, rpio.PWM); // 设置为PWM输出
rpio.pwmSetClockDivider(8); // 时钟8分频 具体是多少 可能示波器显示的会比较准确，目前没发现有文档说明
rpio.pwmSetRange(pwm_pin, Max); // 设置PWM发生器范围
// rpio.msleep(6); // 延时6毫秒
const TEMP_FILE = CON.TEMP_FILE //cpu温度路径
let FanAutoState = false  //自动风扇状态

exports.FanInfo = () => {
    const info = {
        CON, FanAutoState
    }
    return info
}
exports.getCpuTem = () => {
    let tem = parseInt(fs.readFileSync(TEMP_FILE)) / 1000
    return tem;
}
exports.FanOff = () => {
    rpio.pwmSetData(pwm_pin, 0); // 设置 data/1204 占空比的PWM波
}

exports.FanON = () => {
    this.SetFan(100)
}
exports.switchFan = async (e) => {
    FanAutoState = false
  console.log(e)
    if (e) {
        this.FanON()
    } else {
        this.FanOff()
    }
}
exports.SetFan = (num) => {
    PublicNum = num
    num = parseInt(((Max - Min) / 100 * num + Min - 100))
    rpio.pwmSetData(pwm_pin, num);
}

exports.autoFan = (e) => {
    FanAutoState = e;
    clearInterval(autoInterval)
    autoInterval = setInterval(() => {
        if (FanAutoState === 'false' || FanAutoState == false) {
            console.log('打开手动')
            this.switchFan()
            clearInterval(autoInterval)//自动模式被关闭自动清理定时器
            return
        }
        if (this.getCpuTem() < 42) {
            this.FanOff(0)
            return
        }
        if (this.getCpuTem() < 50) {
            this.SetFan(40)
            return
        }
        if (this.getCpuTem() < 50) {
            this.SetFan(50)
            return
        }
        if (this.getCpuTem() < 60) {
            this.SetFan(70)
            return
        }
    }, 2000);
}
