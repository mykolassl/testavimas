from selenium import webdriver
from selenium.webdriver.firefox.webdriver import WebDriver as FirefoxWebDriver
from selenium.webdriver.common.by import By

class TestPage:
    browser: FirefoxWebDriver

    def setup_method(self):
        self.browser = webdriver.Firefox()

    def teardown_method(self):
        self.browser.quit()

    def test_page_1(self):
        self.browser.get("http://suninjuly.github.io/registration1.html")
        inputs = self.browser.find_elements(By.CSS_SELECTOR, "input")

        assert len(inputs) == 5, "Netinkamas įvesties laukų skaičius"

        self.browser.find_element(By.CSS_SELECTOR, ".first_block > div:nth-child(1) > input:nth-child(2)").send_keys("ABCD")
        self.browser.find_element(By.CSS_SELECTOR, ".first_block > div:nth-child(2) > input:nth-child(2)").send_keys("EFGH")
        self.browser.find_element(By.CSS_SELECTOR, ".third").send_keys("pastas@gmail.com")
        self.browser.find_element(By.CSS_SELECTOR, ".btn").click()
        text = self.browser.find_element(By.CSS_SELECTOR, ".container > h1:nth-child(1)").text

        assert "Congratulations" in text, "Įvesti netinkami duomenys"

    def test_page_2(self):
        self.browser.get("http://suninjuly.github.io/registration2.html")
        inputs = self.browser.find_elements(By.CSS_SELECTOR, "input")

        assert len(inputs) == 4, "Netinkamas įvesties laukų skaičius"

        self.browser.find_element(By.CSS_SELECTOR, ".first_block > div:nth-child(1) > input:nth-child(2)").send_keys("ABCD")
        self.browser.find_element(By.CSS_SELECTOR, ".btn").click()
        text = self.browser.find_element(By.CSS_SELECTOR, ".container > h1:nth-child(1)").text

        assert "Congratulations" in text, "Įvesti netinkami duomenys"
