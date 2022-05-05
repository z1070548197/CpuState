const rpio = require('rpio') //进入GPIO node库 
const fs = require('fs')
let Max = 4096;
let Min = 3300;
let autoInterval = null;
let pwm_pin = 12;  // 排针第12引脚
rpio.open(pwm_pin, rpio.PWM); // 设置为PWM输出
rpio.pwmSetClockDivider(8); // 时钟8分频 具体是多少 可能示波器显示的会比较准确，目前没发现有文档说明
rpio.pwmSetRange(pwm_pin, Max); // 设置PWM发生器范围
rpio.msleep(6); // 延时6毫秒
const TEMP_FILE = '/sys/class/thermal/thermal_zone0/temp'
exports.getCpuTem = () => {
    let tem = parseInt(fs.readFileSync(TEMP_FILE)) / 1000
    return tem;
}
exports.FanOff = () => {
    rpio.pwmSetData(pwm_pin, 0); // 设置 data/1204 占空比的PWM波
}

exports.FanON = () => {
    rpio.pwmSetData(pwm_pin, 4000); // 设置 data/1204 占空比的PWM波
}
exports.SetFan = (num) => {
    num = parseInt(((Max - Min) / 100 * num + Min - 100))
    console.log(num)
    rpio.pwmSetData(pwm_pin, num); // 设置 data/1204 占空比的PWM波
}
exports.autoFan = () => {
    clearInterval(autoInterval)
    autoInterval = setInterval(() => {
        console.log(this.getCpuTem())
    }, 2000);
    rpio.pwmSetData(pwm_pin, num); // 设置 data/1204 占空比的PWM波
}
