# 🎓 AI-Powered Online Learning Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
</div>

## 🤖 AI-Powered Features

- **Video Summarization**: Automatically generate concise summaries of educational videos using Google's Gemini AI
- **Smart Learning Paths**: Personalized course recommendations based on user preferences
- **Interactive Learning**: AI-powered quizzes and assessments
- **Content Analysis**: Deep insights into learning materials

## 🚀 Key Features

- **Modern UI/UX**: Built with Next.js 13 and TailwindCSS
- **Authentication**: Secure user authentication system
- **Course Management**: Comprehensive course creation and management
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Updates**: Instant feedback and progress tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: TailwindCSS
- **Database**: Drizzle ORM
- **Authentication**: Custom auth system
- **AI Integration**: Google Gemini AI
- **API**: RESTful architecture

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/onlinelearning.git
cd onlinelearning
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

DATABASE_URL=

NEXT_PUBLIC_DATABASE_URL=
GEMINI_API_KEY=

GEMINI_API_KEY=

AI_GURU_LAB_API=
YOUTUBE_API_KEY=

NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_AI_GURU_LAB_API=

NEXT_PUBLIC_GEMINI_API_KEY=


```

## 📚 Project Structure

```
onlinelearning/
├── app/                    # Next.js 13 app directory
│   ├── allinsight/        # AI-powered insights
│   ├── api/              # API routes
│   ├── course/           # Course management
│   └── sign-in/          # Authentication
├── components/            # Reusable components
├── config/               # Configuration files
├── context/              # React context
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
└── types/                # TypeScript types
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Google Gemini AI for powering our summarization features
- Next.js team for the amazing framework
- All contributors who have helped shape this project

---

<div align="center">
  Made with ❤️ and AI
</div>
