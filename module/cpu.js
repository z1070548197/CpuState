//const GPIO = require('gpio') //进入GPIO node库 
// var pwm_pin = 12;  // 排针第12引脚
// rpio.open(pwm_pin, rpio.PWM); // 设置为PWM输出
// rpio.pwmSetClockDivider(8); // 时钟8分频 具体是多少 可能示波器显示的会比较准确，目前没发现有文档说明
// rpio.pwmSetRange(pwm_pin, 1024); // 设置PWM发生器范围
// rpio.pwmSetData(pwm_pin, data); // 设置 data/1204 占空比的PWM波
// rpio.msleep(6); // 延时6毫秒
const TEMP_FILE = '/sys/class/thermal/thermal_zone0/temp'
exports.getCpuTem =  () => {
    let tem = parseInt(fs.readFildSync(TEMP_FILE))/1000
    return tem;
}
exports.FanOff = () => {

}