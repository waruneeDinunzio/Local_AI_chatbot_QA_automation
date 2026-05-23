import { test, expect } from "@playwright/test";
import { ChatPage } from "../pages/ChatPage";

test.describe("Real Ollama integration", () => {
  test.skip(
    process.env.USE_REAL_OLLAMA !== "true",
    "Skipping real Ollama test. Set USE_REAL_OLLAMA=true to run."
  );

  test("user can send a prompt and receive a real Ollama response", async ({
    page,
  }) => {
    const chatPage = new ChatPage(page);

    await chatPage.open();

    await chatPage.sendMessage("Reply with only this word: Playwright. Do not add punctuation or any other text.");

    await expect(page.getByTestId("loading-message")).toBeVisible();

    await expect(page.getByTestId("assistant-message").last()).toBeVisible({
      timeout: 30000,
    });
    //  Case-insensitive regex — more resilient than exact match
    await expect(page.getByTestId("assistant-message").last()).toContainText(/playwright/i);
  });

  test("User can send a message and receive a real Ollama response in a reasonable time", async ({ page}) => {
    const chatPage = new ChatPage(page);

    await chatPage.open();
    await chatPage.sendMessage("Hello Ollama, please introduce yourself in one sentence.");

    await expect(page.getByTestId("loading-message")).toBeVisible();

    const response = page.getByTestId("assistant-message").last();
    await expect(response).toBeVisible({ timeout: 30_000 });

  });

  test("User can give an introduction and when ask the model the follow-up question,real ollama can give an answer correctly", async ({ page }) => {
    const chatPage = new ChatPage(page);
    await chatPage.open();
    //  NEW: validate memory/context works with real model
    await chatPage.sendMessage("My name is TestUser.");

    // Wait until exactly 1 assistant message exists (first reply done)
  await expect(page.getByTestId("assistant-message")).toHaveCount(1, { timeout: 30_000 });

  await chatPage.sendMessage("What is my name?");

  // Now wait for the second reply
  await expect(page.getByTestId("assistant-message")).toHaveCount(2, { timeout: 30_000 });

  const secondResponse = page.getByTestId("assistant-message").last();
  await expect(secondResponse).toContainText(/TestUser/i);
  });

test("User can send a message and receive a real Ollama response within reasonable length", async ({ page }) => {
    const chatPage = new ChatPage(page);

    await chatPage.open();
    // NEW: structural check — not about exact content
    await chatPage.sendMessage("Say hello.");
    const response = page.getByTestId("assistant-message").last();
    await expect(response).toBeVisible({ timeout: 30_000 });

    const text = await response.innerText();
    expect(text.trim().length).toBeGreaterThan(2);
    expect(text.trim().length).toBeLessThan(2000); // sanity upper bound
  });

});