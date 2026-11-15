import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CartProvider, useCart } from "./cart";
import { PRODUCTS } from "@/data/products";
import { subtotal } from "./selection";

vi.mock("sonner", () => ({ toast: { success: vi.fn() } }));
const product = PRODUCTS.find((item) => item.slug === "north-star-pendant");

describe("live cart quantities", () => {
  beforeEach(() => localStorage.clear());
  it("adds one product then increases its shared quantity and total", async () => {
    if (!product) throw new Error("Missing product fixture");
    const { result } = renderHook(useCart, { wrapper: CartProvider });
    act(() => result.current.add(product));
    expect(result.current.lines[0]?.qty).toBe(1);
    act(() => result.current.setQty(product.slug, 2));
    expect(result.current.count).toBe(2);
    expect(subtotal(result.current.lines)).toBe(1118);
    await waitFor(() => expect(JSON.parse(localStorage.getItem("uora-selection") ?? "[]")[0]?.qty).toBe(2));
  });
  it("decreases the quantity and removes a product at zero", () => {
    if (!product) throw new Error("Missing product fixture");
    const { result } = renderHook(useCart, { wrapper: CartProvider });
    act(() => result.current.add(product, 2));
    act(() => result.current.setQty(product.slug, 1));
    expect(result.current.count).toBe(1);
    expect(subtotal(result.current.lines)).toBe(559);
    act(() => result.current.setQty(product.slug, 0));
    expect(result.current.lines).toEqual([]);
    expect(result.current.count).toBe(0);
  });
});