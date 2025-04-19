import { By } from "selenium-webdriver";

export async function solveCaptcha(driver) {
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

export async function getAnswer(driver) {
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();

    return alertText.slice(alertText.lastIndexOf(":") + 1).trim();
}
