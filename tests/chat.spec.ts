import { test, expect } from "@playwright/test";
import { ChatPage } from "../pages/ChatPage";

test("user can send a prompt and receive an AI response", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        reply: "This is a mocked AI response for stable testing.",
      }),
    });
  });

  const chatPage = new ChatPage(page);
  await chatPage.open();

  await chatPage.sendMessage("Explain Playwright");
  await chatPage.expectUserMessage("Explain Playwright");
  await chatPage.expectAssistantResponse("This is a mocked AI response");
});

test("empty message shows validation error", async ({ page }) => {
  const chatPage = new ChatPage(page);
  await chatPage.open();

  await page.getByTestId("send-button").click();

  await chatPage.expectErrorMessage("Please enter a message.");
});

test("loading state appears while waiting for AI response", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        reply: "Delayed AI response.",
      }),
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

test("API error shows friendly error message", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        error: "Server error",
      }),
    });
  });

  const chatPage = new ChatPage(page);
  await chatPage.open();

  await chatPage.sendMessage("Trigger error");

  await chatPage.expectErrorMessage(
    "Unable to connect to local AI model. Please try again."
  );
});

test("clear chat removes conversation messages", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        reply: "Mocked reply.",
      }),
    });
  });

  const chatPage = new ChatPage(page);
  await chatPage.open();

  await chatPage.sendMessage("Hello");
  await chatPage.expectAssistantResponse("Mocked reply.");

  await chatPage.clearChat();

  await expect(page.getByTestId("user-message")).toHaveCount(0);
  await expect(page.getByTestId("assistant-message")).toHaveCount(0);
});