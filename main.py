press = 0
humid = 0
temp = 0
BME280.power_on()
BME280.address(BME280_I2C_ADDRESS.ADDR_0X76)
I2C_LCD1602.lcd_init(39)
lista = [1, 2, 3]

def on_forever():
    global temp, humid, press
    serial.redirect_to_usb()
    serial.write_value("Temperature BME", BME280.temperature(BME280_T.T_C))
    serial.write_value("Humidity BME", BME280.humidity())
    serial.write_value("Pressure BME", BME280.pressure(BME280_P.PA))
    temp = BME280.temperature(BME280_T.T_C)
    humid = BME280.humidity()
    press = BME280.pressure(BME280_P.PA)
    basic.pause(1000)
basic.forever(on_forever)
