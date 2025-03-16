import { Builder, Browser, By } from "selenium-webdriver";

const driver = await new Builder().forBrowser(Browser.FIREFOX).build();

try {
    await driver.get("https://acme-test.uipath.com/login");
    await driver.findElement(By.id("email")).sendKeys(process.env.EMAIL);
    await driver.findElement(By.id("password")).sendKeys(process.env.PASSWORD);
    await driver.findElement(By.id("remember")).click();
    await driver
        .findElement(
            By.css(
                "html body div.container div.main-container div.main-container div.row div.col-md-6 form button.btn.btn-primary"
            )
        )
        .click();
    await driver.sleep(5_000);
    await driver.quit();
} catch (error) {
    console.log(error);
    await driver.quit();
}
