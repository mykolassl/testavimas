from selenium import webdriver
from selenium.webdriver.firefox.webdriver import WebDriver as FirefoxWebDriver
from selenium.webdriver.common.by import By
import pytest

@pytest.fixture(scope="function", autouse=True)
def browser():
    driver = webdriver.Firefox()

    yield driver

    driver.quit()


class TestPage:
    def test_page_1(self, browser: FirefoxWebDriver):
        browser.get("http://suninjuly.github.io/registration1.html")
        inputs = browser.find_elements(By.CSS_SELECTOR, "input")

        assert len(inputs) == 5, "Netinkamas įvesties laukų skaičius"

        browser.find_element(By.CSS_SELECTOR, ".first_block > div:nth-child(1) > input:nth-child(2)").send_keys("ABCD")
        browser.find_element(By.CSS_SELECTOR, ".first_block > div:nth-child(2) > input:nth-child(2)").send_keys("EFGH")
        browser.find_element(By.CSS_SELECTOR, ".third").send_keys("pastas@gmail.com")
        browser.find_element(By.CSS_SELECTOR, ".btn").click()
        text = browser.find_element(By.CSS_SELECTOR, ".container > h1:nth-child(1)").text

        assert "Congratulations" in text, "Įvesti netinkami duomenys"

    def test_page_2(self, browser: FirefoxWebDriver):
        browser.get("http://suninjuly.github.io/registration2.html")
        inputs = browser.find_elements(By.CSS_SELECTOR, "input")

        assert len(inputs) == 4, "Netinkamas įvesties laukų skaičius"

        browser.find_element(By.CSS_SELECTOR, ".first_block > div:nth-child(1) > input:nth-child(2)").send_keys("ABCD")
        browser.find_element(By.CSS_SELECTOR, ".btn").click()
        text = browser.find_element(By.CSS_SELECTOR, ".container > h1:nth-child(1)").text

        assert "Congratulations" in text, "Įvesti netinkami duomenys"
