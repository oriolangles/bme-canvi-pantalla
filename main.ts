input.onButtonPressed(Button.A, function () {
    pantalla += -1
})
input.onButtonPressed(Button.B, function () {
    pantalla += 1
})
let press = 0
let humid = 0
let temp = 0
BME280.PowerOn()
BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76)
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.clear()
let pantalla = 1
loops.everyInterval(1000, function () {
    if (pantalla == 1) {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("TEMPERATURA(C)", 0, 0)
        I2C_LCD1602.ShowNumber(temp, 0, 1)
    }
    if (pantalla == 2) {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("HUMITAT(%)", 0, 0)
        I2C_LCD1602.ShowNumber(humid, 0, 1)
    }
    if (pantalla == 3) {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("PRESSIO(Pa)", 0, 0)
        I2C_LCD1602.ShowNumber(press, 0, 1)
    }
    if (pantalla > 3) {
        pantalla = 1
    }
    if (pantalla < 1) {
        pantalla = 3
    }
})
basic.forever(function () {
    serial.redirectToUSB()
    serial.writeValue("Temperature BME", BME280.temperature(BME280_T.T_C))
    serial.writeValue("Humidity BME", BME280.humidity())
    serial.writeValue("Pressure BME", BME280.pressure(BME280_P.Pa))
    temp = BME280.temperature(BME280_T.T_C)
    humid = BME280.humidity()
    press = BME280.pressure(BME280_P.Pa)
    basic.pause(1000)
})
