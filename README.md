
# 🥔 PotatoCure – Smart Potato Disease Detection

**PotatoCure** is a smart potato disease detection web app built with **React** for the frontend and connected to a FastAPI backend. It uses a **CNN (Convolutional Neural Network)** model to classify potato leaf diseases.

Upload a potato leaf image and get instant insights into:
- 🦠 Disease Type
- 📊 Confidence Score
- 💡 Symptoms and Recommended Treatment



## 🌿 Introduction

This React application is part of the PotatoCure system, designed to support potato farmers by detecting leaf diseases early and accurately. It communicates with a backend API that processes the image and returns predictions.



## 🚀 Features

- 📷 Upload a potato leaf image
- 🤖 Predict disease class with high accuracy
- 🧠 Displays:
  - Disease name
  - Confidence %
  - Symptoms
  - Treatment tips
- 🔄 Handles API errors and loading state gracefully
- 📱 Fully responsive and user-friendly UI


## 🛠️ Technologies Used

- **React.js**
- **Axios** 
- **React Hooks** 
- **Custom CSS** 



## ⚙️ Getting Started

### 📦 Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/) installed


### 🧩 Installation

1. **Clone the repo**

```bash
git clone https://github.com/Shahzad-Ali-44/PotatoCure.git
cd PotatoCure
````

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Create a `.env` file in the root of your React project:

```env
REACT_APP_API_URL=https://shahzadali44-potatocure-backend.hf.space/predict
```

> The backend is hosted on Hugging Face Spaces.





### ▶️ Run the App

Start your development server:

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`.





## 📄 License

This project is licensed under the [MIT License](LICENSE)


## Acknowledgments
- Dataset contributors for their valuable efforts.
- TensorFlow and Keras for their robust deep learning frameworks.
- Open-source community for tools and libraries enabling this work. 






