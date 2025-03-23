import { Builder, Browser, By, until } from "selenium-webdriver";

async function solveCaptcha(driver) {
    const x = await driver.findElement(By.id("input_value")).getText();
    const answer = Math.log(Math.abs(12 * Math.sin(+x)));
    await driver.findElement(By.id("answer")).sendKeys(answer);
    await driver
        .findElement(
            By.css(
                "html body.bg-light form div.form-group div.container button.btn.btn-primary"
            )
        )
        .click();
}

async function getAnswer(driver) {
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();

    return alertText.slice(alertText.lastIndexOf(":") + 1).trim();
}

const driver = await new Builder().forBrowser(Browser.FIREFOX).build();

try {
    /*
     * Pirma dalis
     */

    await driver.get("http://suninjuly.github.io/alert_accept.html");
    await driver
        .findElement(
            By.css(
                "html body.bg-light form div.form-group div.container button.btn.btn-primary"
            )
        )
        .click();
    await driver.switchTo().alert().accept();
    await driver.wait(until.elementLocated(By.id("simple_text")), 1_000);
    await solveCaptcha(driver);
    const firstAnswer = await getAnswer(driver);
    console.log(`Pirmos užduoties atsakymas ${firstAnswer}`);

    /*
     * Antra dalis
     */

    await driver.get("http://suninjuly.github.io/redirect_accept.html");
    await driver
        .findElement(
            By.css(
                "html body.bg-light form div.form-group div.container button.trollface.btn.btn-primary"
            )
        )
        .click();
    const newTab = (await driver.getAllWindowHandles())[1];
    await driver.switchTo().window(newTab);
    await solveCaptcha(driver);
    const secondAnswer = await getAnswer(driver);
    console.log(`Antros užduoties atsakymas ${secondAnswer}`);

    await driver.quit();
} catch (error) {
    console.log(error);
    await driver.quit();
}
