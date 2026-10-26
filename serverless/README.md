# Cloudflare Worker: Безопасный бэкенд обратной связи для vokhr.is-a.dev

Этот сервис заменяет небезопасное хранение токена бота в браузере. Токен Telegram и Chat ID хранятся исключительно в зашифрованных секретах Cloudflare и никогда не попадают к пользователю.

---

## Быстрый деплой за 2 минуты (Бесплатно)

### Шаг 1. Создание воркера в Cloudflare
1. Зайдите в [Cloudflare Dashboard](https://dash.cloudflare.com/) → раздел **Workers & Pages**.
2. Нажмите **Create Application** → **Create Worker**.
3. Задайте имя (например, `vokhr-contact-api`) и нажмите **Deploy**.

### Шаг 2. Вставка кода
1. В созданном воркере нажмите **Edit code**.
2. Удалите шаблонный код и вставьте содержимое файла [`cloudflare-worker.js`](file:///Users/bofry/WebstormProjects/MySite/serverless/cloudflare-worker.js).
3. Нажмите **Deploy** в правом верхнем углу.

### Шаг 3. Добавление секретов (BOT_TOKEN и CHAT_ID)
1. Вернитесь на страницу воркера → вкладка **Settings** → раздел **Variables and Secrets**.
2. Нажмите **Add** и добавьте два секрета (выбирайте тип **Secret / Encrypted**):
   - `BOT_TOKEN`: токен вашего Telegram-бота (от @BotFather, например `8825903840:AA...`).
   - `CHAT_ID`: ID вашего чата/аккаунта Telegram (например `1016044756`).
3. Нажмите **Save and Deploy**.

### Шаг 4. Подключение к сайту
1. Скопируйте адрес опубликованного воркера (например: `https://vokhr-contact-api.<subdomain>.workers.dev` или ваш субдомен `https://api.vokhr.is-a.dev/contact`).
2. В файле [`js/main.js`](file:///Users/bofry/WebstormProjects/MySite/js/main.js) укажите этот URL в константе:
   ```javascript
   const CONTACT_API_ENDPOINT = 'https://vokhr-contact-api.<subdomain>.workers.dev';
   ```
3. Готово! Теперь форма на сайте будет отправлять запросы через защищённый шлюз, а токен бота будет на 100% скрыт от интернета.
