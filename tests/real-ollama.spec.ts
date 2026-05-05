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

    await chatPage.sendMessage("Reply with only this word: Playwright");

    await expect(page.getByTestId("loading-message")).toBeVisible();

    await expect(page.getByTestId("assistant-message").last()).toBeVisible({
      timeout: 30000,
    });

    await expect(page.getByTestId("assistant-message").last()).not.toBeEmpty();
  });
});