# 🤖 AI Chatbot QA Automation Case Study

## Playwright, End-to-End Testing & AI Workflow Validation

🔗 GitHub Repository: [https://github.com/waruneeDinunzio/Local_AI_chatbot_QA_automation](https://github.com/waruneeDinunzio/Local_AI_chatbot_QA_automation)

---

## 📌 Overview

This project focuses on testing a **local AI chatbot application** powered by a local LLM (Ollama), using Playwright for end-to-end automation.

The goal was to simulate real-world user interactions with an AI system and validate UI behavior, API responses, and error handling through reliable automated tests.

This project demonstrates my ability to:

* Design scalable QA automation frameworks
* Test AI-driven user workflows
* Validate asynchronous UI behavior
* Mock API responses for stable test execution
* Apply Playwright best practices (POM, locators, fixtures)

---

# 🧠 Phase 1: Application Design for Testability

## 🧩 System Overview

To create realistic test scenarios, I built a simple chatbot system:

```txt
React UI → Express API → Ollama (Local LLM)
```

This allowed full control over:

* UI behavior
* API responses
* Error scenarios

---

## 🎯 Key Features Implemented

* Chat input and message display
* AI response rendering
* Loading state ("AI is processing...")
* Error handling for API failures
* Clear chat functionality
* Keyboard interaction (Enter to send)

---

## 🧪 Test Design Strategy

I focused on testing **real user behavior** instead of isolated UI elements.

### ✔ End-to-End Workflow Testing

* User sends prompt → AI responds
* Validate full interaction flow

### ✔ Negative Testing

* Empty input validation
* API failure scenarios

### ✔ Async UI Testing

* Loading indicators
* Delayed responses

### ✔ API Mocking Strategy

Used Playwright route interception to:

* Avoid dependency on real AI responses
* Ensure stable and repeatable tests

---

# 🧪 Phase 2: Automation Implementation

## 🛠 Tools Used

* Playwright (TypeScript)
* React
* Express
* Ollama (Local LLM)

---

## 🧱 Framework Design

The automation follows a scalable structure:

```txt
tests/
pages/
```

### ✔ Page Object Model (POM)

Encapsulated UI interactions:

* Chat input
* Send button
* Message validation

---

## 🔍 What I Validated

### ✔ Core User Flow

* Sending prompts
* Receiving AI responses

### ✔ UI Behavior

* Loading state visibility
* Message rendering order
* Button state (enabled/disabled)

### ✔ Validation Logic

* Empty input error handling

### ✔ API Behavior

* Successful response handling
* Server error handling

---

# 🧪 Key Test Scenarios

### ✅ Happy Path

User sends a prompt and receives a valid AI response

---

### ❌ Validation Test

Prevent sending empty messages

---

### ⏳ Loading State Test

Verify "AI is thinking..." appears and disappears correctly

---

### 🚨 Error Handling Test

Simulate API failure and verify user-friendly error message

---

### 🔁 Chat State Test

Verify messages persist in correct order

---

### 🧹 Clear Chat Test

Ensure chat resets correctly

---

### 🎭 API Mocking

Intercept API requests to simulate stable AI responses

---

# 📊 Results & Impact

* Built a complete **QA automation project from scratch**
* Designed testable system architecture
* Implemented **stable and deterministic test automation**

### QA Impact

This project demonstrates how to test **AI-driven applications**, where:

* Responses are dynamic
* Timing is unpredictable
* Stability requires mocking strategies

---

# 💡 Key Learnings

### 🤖 Testing AI Systems

* AI responses are non-deterministic
* Mocking is critical for reliable automation

---

### ⚙️ Async UI Testing

* Loading states must be validated explicitly
* Timing issues are common in modern apps

---

### 🧠 Real-World QA Thinking

* Focus on user workflows, not just elements
* Design systems to be testable

---

# 💬 Reflection

This project represents a shift from traditional UI testing to **modern AI application testing**.

I learned how to:

* Build a testable application environment
* Automate complex asynchronous workflows
* Ensure test stability in AI-driven systems

---

## ⭐ Author

**Warunee Dinunzio**

QA Automation Engineer

📧 [dinunziow@gmail.com](mailto:dinunziow@gmail.com)

💼 [https://www.linkedin.com/in/warunee-dinunzio/](https://www.linkedin.com/in/warunee-dinunzio/)

