const {test, expect} = require ('@playwright/test');
const { chromium } = require("playwright");
const {email, password} = require("../user");
const {invalidEmail, invalidPassword} = require("../invalidUser");

test('Успешная авторизация', async () => {
  // Запускаем браузер
  const browser = await chromium.launch({});
    // Открываем новую страницу
    const page = await browser.newPage();
    // Переходм на страницу авторизации
    await page.goto("https://netology.ru");
    // Переходим на страницу авторизации
    await page.click('text ="Войти"');
    await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
    // Выбор авторизации по почте
    await page.click('text ="Войти по почте"');
    // Ввод валидной почты
    await page.fill("[placeholder='Email']", email);
    // Ввод валидного пароля
    await page.fill("[placeholder='Пароль']", password);
    // Отправка запроса
    await page.click('text ="Войти"');
    // Проверка перехода в профиль
    await page.locator('[data-testid="login-submit-btn"]');
    await expect(page).toHaveURL("https://netology.ru/profile/");
    const heading = page.locator("h2");
    await expect(heading).toHaveText("Мое обучение");

});

test('Неуспешная авторизация', async () => {
      // Запускаем браузер
  const browser = await chromium.launch({});
    // Открываем новую страницу
    const page = await browser.newPage();
    // Переходм на страницу авторизации
    await page.goto("https://netology.ru");
    // Переходим на страницу авторизации
    await page.click('text ="Войти"');
    await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
    // Выбор авторизации по почте
    await page.click('text ="Войти по почте"');
    // Ввод валидной почты
    await page.fill("[placeholder='Email']", invalidEmail);
    // Ввод валидного пароля
    await page.fill("[placeholder='Пароль']", invalidPassword);
    // Отправка запроса
    await page.click('text ="Войти"');
    // Проверка ошибки
    const errorHint = page.locator('[data-testid="login-error-hint"]');
    await expect(errorHint).toHaveText("Вы ввели неправильно логин или пароль.")
});