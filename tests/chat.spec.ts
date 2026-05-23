import { test, expect } from "@playwright/test";
import { ChatPage } from "../pages/ChatPage";

// Reusable fixture — eliminates route duplication
const mockedTest = test.extend<{ chatPage: ChatPage }>({
  chatPage: async ({ page }, use) => {
    await page.route("**/api/chat", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ reply: "Mocked AI response." }),
      })
    );
    const chatPage = new ChatPage(page);
    await chatPage.open();
    await use(chatPage);
  },
});

mockedTest("user can send a prompt and receive a response", async ({ chatPage, page }) => {
  await chatPage.sendMessage("Explain Playwright");
  await chatPage.expectUserMessage("Explain Playwright");
  await chatPage.expectAssistantResponse("Mocked AI response.");
});

mockedTest("input and send button are disabled while loading", async ({ page, chatPage }) => {
  // ✅ NEW: verify the UI locks during a request
  await page.route("**/api/chat", async (route) => {
    await new Promise((r) => setTimeout(r, 800));
    await route.fulfill({ status: 200, body: JSON.stringify({ reply: "Done." }) });
  });

  await page.getByTestId("chat-input").fill("Hello");
  await page.getByTestId("send-button").click();

  await expect(page.getByTestId("send-button")).toBeDisabled();
  await expect(page.getByTestId("chat-input")).toBeDisabled();
});

mockedTest("API error shows friendly error message", async ({ page, chatPage }) => {
  // ✅ IMPROVED: simulates real connection failure, not just 500
  await page.route("**/api/chat", (route) => route.abort("connectionrefused"));

  await chatPage.sendMessage("Hello");
  await chatPage.expectErrorMessage("Unable to connect to local AI model. Please try again.");
});

mockedTest("clear chat removes conversation messages", async ({ page, chatPage }) => {
  await chatPage.sendMessage("Hello");
  await chatPage.expectAssistantResponse("Mocked AI response.");

  await chatPage.clearChat();

  await expect(page.getByTestId("user-message")).toHaveCount(0);
  await expect(page.getByTestId("assistant-message")).toHaveCount(0);
});

mockedTest("multi-turn: conversation history is preserved", async ({ chatPage, page }) => {
  // ✅ NEW: critical for chatbots — verify history stays visible
  await chatPage.sendMessage("First message");
  await chatPage.sendMessage("Second message");

  await expect(page.getByTestId("user-message")).toHaveCount(2);
  await expect(page.getByTestId("assistant-message")).toHaveCount(2);
});

mockedTest("multi-turn: prior messages are sent to the API", async ({ page, chatPage }) => {
  // ✅ NEW: verify your app actually sends conversation context to Ollama
  const capturedBodies: unknown[] = [];

  await page.route("**/api/chat", async (route) => {
    capturedBodies.push(JSON.parse(route.request().postData() ?? "{}"));
    await route.fulfill({ status: 200, body: JSON.stringify({ reply: "OK" }) });
  });

  await chatPage.sendMessage("Who are you?");
  await chatPage.sendMessage("What did I just ask?");

  const lastBody = capturedBodies[1] as { messages: unknown[] };
  expect(lastBody.messages.length).toBeGreaterThan(1); // history included
});

// Standalone tests (don't need mock)
test("empty message shows validation error", async ({ page }) => {
  const chatPage = new ChatPage(page);
  await chatPage.open();
  await page.getByTestId("send-button").click();
  await chatPage.expectErrorMessage("Please enter a message.");
});

test("network failure shows friendly error", async ({ page }) => {
  // ✅ IMPROVED: simulates real connection failure, not just 500
  await page.route("**/api/chat", (route) => route.abort("connectionrefused"));

  const chatPage = new ChatPage(page);
  await chatPage.open();
  await chatPage.sendMessage("Hello");
  await chatPage.expectErrorMessage("Unable to connect to local AI model. Please try again.");
});

test("loading state appears while waiting for AI response", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ reply: "Delayed AI response." }),
    });
  });

  const chatPage = new ChatPage(page);
  await chatPage.open();
  await page.getByTestId("chat-input").fill("Hello AI");
  await page.getByTestId("send-button").click();

  await expect(page.getByTestId("loading-message")).toBeVisible();
  await expect(page.getByTestId("loading-message")).toBeHidden();
  await chatPage.expectAssistantResponse("Delayed AI response.");
});