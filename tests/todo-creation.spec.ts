// File: todo-creation.spec.ts
import { expect, test, type Page } from "@playwright/test";

test.describe("Todo Creation", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("https://todomvc.com/examples/react/dist/");
  });

  test("should add new todo items", async () => {
    await page.fill(".new-todo", "Learn Playwright");
    await page.press(".new-todo", "Enter");
    await expect(page.locator(".todo-list li")).toHaveCount(1);
    await expect(page.locator(".todo-list li")).toHaveText("Learn Playwright");

    await page.fill(".new-todo", "Write tests");
    await page.press(".new-todo", "Enter");
    await expect(page.locator(".todo-list li")).toHaveCount(2);
    await expect(page.locator(".todo-list li").nth(1)).toHaveText(
      "Write tests"
    );
  });

  test("should clear text input field when an item is added", async () => {
    await page.fill(".new-todo", "Learn Playwright");
    await page.press(".new-todo", "Enter");
    const inputValue = await page.inputValue(".new-todo");
    expect(inputValue).toBe("");
  });
});
