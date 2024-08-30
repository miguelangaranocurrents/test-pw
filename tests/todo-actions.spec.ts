// File: todo-actions.spec.ts
import { expect, test, type Page } from "@playwright/test";

test.describe("Todo Actions", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("https://todomvc.com/examples/react/dist/");
    await page.fill(".new-todo", "Task 1");
    await page.press(".new-todo", "Enter");
    await page.fill(".new-todo", "Task 2");
    await page.press(".new-todo", "Enter");
  });

  test("should mark a todo as completed", async () => {
    await page.click(".todo-list li:first-child .toggle");
    await expect(page.locator(".todo-list li:first-child")).toHaveClass(
      /completed/
    );
  });

  test("should delete a todo", async () => {
    await page.hover(".todo-list li:first-child");
    await page.click(".todo-list li:first-child .destroy");
    await expect(page.locator(".todo-list li")).toHaveCount(1);
  });
});
