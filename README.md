
# Trackly

**Trackly** is a clean and minimal expense tracker built with Next.js. It allows you to manage your budgets, track daily transactions, categorize expenses, and view monthly summaries — all in one simple dashboard.

> 🚧 **Note:** User authentication is not available yet. It will be added in the upcoming updates.

## 🌐 Live Demo

👉 [https://trackly-gamma.vercel.app](https://trackly-gamma.vercel.app)

## ✨ Features

- ✅ Create and manage budgets
- ✅ Add, edit, and delete transactions
- ✅ Categorize expenses
- ✅ View monthly summary and spending breakdown
- ✅ Clean and responsive UI with real-time updates
- 🚀 Built with modern technologies like Server Actions, Prisma, and Tailwind CSS
- 🔐 **Authentication support coming soon**

---

## 🖥️ Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database ORM:** [Prisma](https://www.prisma.io)
- **Database:** MongoDb
- **Deployment:** [Vercel](https://vercel.com)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nikeshchaudhary52494/trackly.git
cd trackly
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_database_url_here"
```

> For local development, you can use SQLite:
> `DATABASE_URL="file:./dev.db"`

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Available Scripts

* `npm run dev` – Start the development server
* `npm run build` – Build for production
* `npm run start` – Start the production server
* `npx prisma studio` – Open Prisma GUI to view/manage your DB

---

## 📦 Folder Structure

```
.
├── app/                     # Next.js app router structure
├── components/              # Reusable UI components
├── lib/                     # Server actions, db, and helpers
├── prisma/                  # Prisma schema
├── public/                  # Static assets
├── .env                     # Environment variables
├── package.json
└── README.md
```

---

## 📌 Roadmap

* [x] Budget and transaction tracking
* [x] Monthly summary view
* [x] Category creation and management
* [ ] User authentication
* [ ] CSV export/import
* [ ] Dark mode support
* [ ] Mobile-first enhancements

---

## 📸 Screenshots

> *Coming Soon* — Add images or GIFs of your app here to showcase UI and features.

---

## 🙌 Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Nikesh Chaudhary**
GitHub: [@Nikeshchaudhary52494](https://github.com/Nikeshchaudhary52494)
Email: [nikeshchaudhary52494@gmail.com](mailto:nikeshchaudhary52494@gmail.com)

---

*Trackly – because your money deserves clarity.*
