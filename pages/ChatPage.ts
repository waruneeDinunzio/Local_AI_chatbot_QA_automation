import { expect, Page } from "@playwright/test";

export class ChatPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/");
  }

  async sendMessage(message: string) {
    await this.page.getByTestId("chat-input").fill(message);
    await this.page.getByTestId("send-button").click();
  }

  async expectUserMessage(message: string) {
    await expect(this.page.getByTestId("user-message").last()).toContainText(
      message
    );
  }

  async expectAssistantResponse(text: string) {
    await expect(
      this.page.getByTestId("assistant-message").last()
    ).toContainText(text);
  }

  async expectErrorMessage(text: string) {
    await expect(this.page.getByTestId("error-message")).toContainText(text);
  }

  async clearChat() {
    await this.page.getByTestId("clear-button").click();
  }
}