# "Vaviorka" Restaurang API – REST-webbtjänst

Detta repository innehåller koden för en REST-webbtjänst byggd med Express och MongoDB. 
API:et är skapat för ett fiktivt restaurangföretag "Vaviorka" och hanterar rätter (meny), 
bordsbokningar samt kontaktmeddelanden från gäster. Grundläggande CRUD-funktionalitet 
(Create, Read, Update, Delete) är implementerad.

Webbtjänsten är en del av ett projektarbete i kursen Backend-baserad utveckling 
(DT207G) vid Mittuniversitetet.

## Länk

Videodemonstration

## Tekniker

- **Node.js** – körmiljö
- **Express** – webbramverk
- **MongoDB** – databas (NoSQL)
- **Mongoose** – ODM för MongoDB
- **JSON Web Tokens (JWT)** – autentisering av skyddade routes
- **bcrypt** – hashning av lösenord
- **dotenv** – hantering av miljövariabler
- **CORS** – tillåter anrop från frontend

## Installation och databas

1. Klona ner källkodsfilerna:

   ```bash
   git clone https://github.com/umavanmoriel/Projekt_DT207G_backend.git
   ```

2. Installera nödvändiga npm-paket:

   ```bash
   npm install
   ```

3. Skapa en `.env`-fil i projektets rot med följande innehåll:

   ```
    PORT=3000
    DATABASE="mongodb+srv://<användarnamn>:<lösenord>@<kluster>.mongodb.net/restaurang"
    JWT_SECRET_KEY="valfri-hemlig-nyckel"
   ```
4. Starta servern:

   ```bash
   npm start
   ```

5. Servern körs nu på `http://localhost:3000`.

## Databasstruktur

API:et använder MongoDB med fyra collections:

| Collection | Fält |
|------------|------|
| **dish** | `_id` (ObjectId), `name` (String), `category` (String), `price` (Number), `description` (String), `created` (Date) |
| **booking** | `_id` (ObjectId), `name` (String), `phone` (String), `date` (String), `time` (String), `guests` (Number), `message` (String), `status` (String: pending/confirmed/cancelled), `created` (Date) |
| **message** | `_id` (ObjectId), `name` (String), `email` (String), `subject` (String), `message` (String), `created` (Date) |
| **user** | `_id` (ObjectId), `username` (String, unik), `password` (String, hash), `created` (Date) |

### Autentisering

| Metod | Ändpunkt | Beskrivning | Skyddad |
|-------|----------|-------------|---------|
| POST | `/api/login` | Loggar in en användare. Returnerar JWT-token. | Nej |

### Rätter (meny)

| Metod | Ändpunkt | Beskrivning | Skyddad |
|-------|----------|-------------|---------|
| GET | `/api/dishes` | Hämtar alla rätter. | Nej |
| POST | `/api/dishes` | Lägger till en ny rätt. | Ja |
| PUT | `/api/dishes/:id` | Uppdaterar en rätt med angivet ID. | Ja |
| DELETE | `/api/dishes/:id` | Raderar en rätt med angivet ID. | Ja |


### Bokningar

| Metod | Ändpunkt | Beskrivning | Skyddad |
|-------|----------|-------------|---------|
| POST | `/api/bookings` | Skapar en ny bokning. | Nej |
| GET | `/api/bookings` | Hämtar alla bokningar. | Ja |
| PUT | `/api/bookings/:id` | Uppdaterar status på en bokning. | Ja |
| DELETE | `/api/bookings/:id` | Raderar en bokning. | Ja |

### Meddelanden

| Metod | Ändpunkt | Beskrivning | Skyddad |
|-------|----------|-------------|---------|
| POST | `/api/messages` | Skickar ett nytt meddelande. | Nej |
| GET | `/api/messages` | Hämtar alla meddelanden. | Ja |

## Exempel på objekt

### Rätt (dish)

```json
{
   "name": "Margherita",
   "category": "mainCourses",
   "price": 129,
   "description": "Tomatsås, mozzarella och basilika"
}
```

### Bokning (booking)

```json
{
   "name": "Anna Andersson",
   "phone": "070-1234567",
   "date": "2025-12-01",
   "time": "19:00",
   "guests": 4,
   "message": "Fönsterbord om möjligt"
}
```


### Meddelande (message)

```json
{
   "name": "Erik Eriksson",
   "email": "erik@example.com",
   "subject": "Fråga om allergener",
   "message": "Finns det glutenfria alternativ?"
}
```

### Inloggning

```json
{
   "username": "admin",
   "password": "adminadmin"
}
```
