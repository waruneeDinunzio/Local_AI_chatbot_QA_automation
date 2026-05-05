# 🤖 AI Chatbot QA Automation Case Study

## Playwright, End-to-End Testing & AI Workflow Validation

🔗 GitHub Repository: [https://github.com/waruneeDinunzio/Local_AI_chatbot_QA_automation](https://github.com/waruneeDinunzio/Local_AI_chatbot_QA_automation)

[![Playwright Tests](https://github.com/waruneeDinunzio/Local_AI_chatbot_QA_automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/waruneeDinunzio/Local_AI_chatbot_QA_automation)

---

## 📌 Overview

This project focuses on testing a **local AI chatbot application** powered by a local LLM (Ollama), using Playwright for end-to-end automation.

The goal was to simulate real-world user interactions with an AI system and validate UI behavior, API responses, and error handling through reliable automated tests.

This project demonstrates my ability to:

* Design scalable QA automation frameworks
* Test AI-driven user workflows
* Validate asynchronous UI behavior
* Mock API responses for stable test execution
* Perform real integration testing with a local AI model
* Apply Playwright best practices (POM, locators, fixtures)

---

# 🧠 Phase 1: Application Design for Testability

## 🧩 System Overview

To create realistic test scenarios, I built a simple chatbot system:

```txt
React UI → Express API → Ollama (Local LLM)
```

This architecture allows full control over:

* UI behavior
* API responses
* Error scenarios
* Real AI integration

---

## 🎯 Key Features Implemented

* Chat input and message display
* AI response rendering
* Loading state ("AI is thinking...")
* Error handling for API failures
* Clear chat functionality
* Keyboard interaction (Enter to send)

---

## 🧪 Test Design Strategy

I designed tests using a **dual-layer strategy**:

---

### ✅ Layer 1: Mocked Automation Tests (Primary)

Used Playwright API mocking to:

* Ensure stable and deterministic test results
* Avoid dependency on local AI model
* Enable CI/CD execution (GitHub Actions)

---

### 🔁 Layer 2: Real Integration Tests (Ollama)

Added optional tests that:

* Connect to real backend and local LLM
* Validate full system integration
* Simulate real user experience

These tests are controlled via environment variable:

```bash
USE_REAL_OLLAMA=true npx playwright test
```

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
  chat.spec.ts            → mocked tests
  real-ollama.spec.ts     → real integration tests
pages/
```

---

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

---

### ✔ UI Behavior

* Loading state visibility
* Message rendering order
* Button state (enabled/disabled)

---

### ✔ Validation Logic

* Empty input error handling

---

### ✔ API Behavior

* Successful response handling
* Server error handling
* Mocked vs real response consistency

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

### 🤖 Real Ollama Integration Test

* Send prompt to real local AI model
* Validate response appears in UI
* Ensure full system flow works

---

# 📊 Results & Impact

* Built a complete **QA automation project from scratch**
* Designed a testable system architecture
* Implemented **stable and deterministic test automation**
* Added **real integration validation for AI workflows**

---

### QA Impact

This project demonstrates how to test **modern AI-driven applications**, where:

* Responses are dynamic and non-deterministic
* UI behavior depends on async operations
* Stability requires mocking strategies
* Integration testing validates real-world behavior

---

# 💡 Key Learnings

### 🤖 Testing AI Systems

* AI responses are non-deterministic
* Mocking is essential for reliable automation
* Real integration testing validates system behavior

---

### ⚙️ Async UI Testing

* Loading states must be validated explicitly
* Timing issues are common in modern apps

---

### 🧠 Real-World QA Thinking

* Separate **mocked vs real tests**
* Ensure CI stability while preserving integration coverage
* Focus on user workflows over isolated components

---

# 💬 Reflection

This project represents a transition from traditional UI testing to **modern AI application testing**.

I learned how to:

* Build a testable application environment
* Automate complex asynchronous workflows
* Maintain test stability using mocking
* Validate real system integration with a local AI model

---

## ⭐ Author

**Warunee Dinunzio**
QA Automation Engineer

📧 [dinunziow@gmail.com](mailto:dinunziow@gmail.com)
💼 [https://www.linkedin.com/in/warunee-dinunzio/](https://www.linkedin.com/in/warunee-dinunzio/)


