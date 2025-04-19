import { Builder, Browser, By, until } from "selenium-webdriver";
import { solveCaptcha, getAnswer } from "../utils.js";
import assert from "node:assert";

const driver = await new Builder().forBrowser(Browser.FIREFOX).build();

try {
    /*
     * Pirma dalis
     */

    await driver.get("http://suninjuly.github.io/explicit_wait2.html");
    const targetPrice = "100";
    await driver.wait(
        until.elementTextContains(
            driver.findElement(By.id("price")),
            targetPrice
        ),
        13_000
    );
    await driver.findElement(By.id("book")).click();
    await solveCaptcha(driver);
    const firstAnswer = await getAnswer(driver);
    console.log(`Pirmos dalies atsakymas ${firstAnswer}`);

    /*
     * Antra dalis, pirmas puslapis
     */

    await driver.get("http://suninjuly.github.io/registration1.html");
    const firstInputs = await driver.findElements(By.css("input"));

    assert(firstInputs.length === 5, "Netinkamas įvesties laukų skaičius");

    await driver
        .findElement(
            By.css(".first_block > div:nth-child(1) > input:nth-child(2)")
        )
        .sendKeys("ABCD");
    await driver
        .findElement(
            By.css(".first_block > div:nth-child(2) > input:nth-child(2)")
        )
        .sendKeys("EFGH");
    await driver.findElement(By.css(".third")).sendKeys("pastas@gmail.com");
    await driver.findElement(By.css(".btn")).click();
    const firstSuccessMessage = await driver
        .findElement(By.css(".container > h1:nth-child(1)"))
        .getText();

    assert(
        firstSuccessMessage.includes("Congratulations"),
        "Įvesti netinkami duomenys"
    );

    /*
     * Antra dalis, antras puslapis
     */

    await driver.get("http://suninjuly.github.io/registration2.html");
    const secondInputs = await driver.findElements(By.css("input"));

    assert(secondInputs.length === 4, "Netinkamas įvesties laukų skaičius");

    await driver
        .findElement(
            By.css(".first_block > div:nth-child(1) > input:nth-child(2)")
        )
        .sendKeys("ABCD");
    await driver.findElement(By.css(".btn")).click();
    const secondSuccessMessage = await driver
        .findElement(By.css(".container > h1:nth-child(1)"))
        .getText();

    assert(
        secondSuccessMessage.includes("Congratulations"),
        "Įvesti netinkami duomenys"
    );

    await driver.quit();
} catch (error) {
    console.log(error);
    await driver.quit();
}
