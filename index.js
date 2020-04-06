const devices = require('puppeteer/DeviceDescriptors')
const puppeteer = require('puppeteer');

(async () => {
    //启动浏览器
    const browser = await puppeteer.launch({executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium',headless: false});
    //打开一个新标签页
    const page = await browser.newPage();
    // await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    // await page.setViewport({ width: 375, height: 812 });
    // await page.emulate(devices['iPhone X']);
    //访问目标url
    await page.goto('http://localhost:5000');
    await page.waitForSelector('#header_icon');
    await page.click('#header_icon')
    await page.screenshot({path: 'todo.png'});
    browser.close();
})();