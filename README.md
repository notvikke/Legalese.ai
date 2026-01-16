# ⚖️ Legaleze.ai

**Legaleze.ai** is an advanced AI-powered legal assistant designed to democratize contract review. It helps freelancers, startups, and individuals instantly analyze legal documents, identify hidden risks, and negotiate better terms—without the expensive hourly rates of a lawyer.

![Legaleze Dashboard](https://via.placeholder.com/1200x600?text=Legaleze.ai+Dashboard+Preview)

## 🚀 Key Features

- **🛡️ AI Risk Analysis**: Instantly scans contracts to flag "Critical" (Red), "Review" (Yellow), and "Safe" (Green) clauses.
- **📊 Executive Dashboard**: visualized risk scoring (0-100) with dynamic Donut and Trend charts to track contract health.
- **✨ AI Negotiator**: One-click generation of mutually beneficial revisions for biased or unfair clauses.
- **💬 Chat with Document**: Ask specific questions ("What is the termination fee?") and get instant answers cited from the text.
- **📂 Document Vault**: Secure cloud storage for all your analyzed agreements.
- **📥 Professional Reports**: Export detailed PDF reports with executive summaries and risk breakdowns.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (React)
- **Styling**: Tailwind CSS, Lucide Icons
- **Visualization**: Recharts (for analytics)
- **Authentication**: Clerk

### Backend
- **API**: FastAPI (Python)
- **AI/ML**: Hugging Face (Mistral/Zephyr 7B), PyTorch, Transformers
- **Database**: PostgreSQL (SQLAlchemy)
- **PDF Generation**: ReportLab

## 🏁 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/notvikke/Legalese.ai.git
   cd Legalese.ai
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **Environment Variables**
   Create a `.env` file in the `backend` directory with:
   ```env
   DATABASE_URL=postgresql://user:password@localhost/legalese_db
   HF_TOKEN=your_huggingface_token
   ```
   Create a `.env.local` file in the `frontend` directory with Clerk keys.

## 🌟 Pro Features
Upgrade to the **Pro Pass** to unlock unlimited analysis, PDF exports, and the Chat Assistant.

## 📄 License
This project is licensed under the MIT License.

---
*Built with ❤️ by Vikas*
