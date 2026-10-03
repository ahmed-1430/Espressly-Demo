"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { products } from "@/config/products";

/**
 * Front-end cart architecture.
 * ---------------------------------------------------------------------------
 * The store is deliberately API-shaped so a real backend can replace the
 * reducer wholesale: `add`, `setQuantity`, `remove` and `clear` map one-to-one
 * onto the mutations a commerce API would expose. Totals are derived from
 * `config/products`, never stored, so a price change can never desync the UI.
 */

export type CartLine = {
  slug: string;
  quantity: number;
};

export type CartLineDetail = CartLine & {
  name: string;
  price: number;
  image: string;
};

export type CartState = {
  lines: CartLine[];
};

type CartAction =
  | { type: "add"; slug: string; quantity: number }
  | { type: "setQuantity"; slug: string; quantity: number }
  | { type: "remove"; slug: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const STORAGE_KEY = "espressly.cart.v1";
const MAX_LINES = 24;

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate": {
      const valid = action.lines.filter((line) =>
        products.some((product) => product.slug === line.slug),
      );
      return { lines: valid.slice(0, MAX_LINES) };
    }
    case "add": {
      if (!products.some((product) => product.slug === action.slug)) return state;
      const existing = state.lines.find((line) => line.slug === action.slug);
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.slug === action.slug
              ? { ...line, quantity: Math.min(20, line.quantity + action.quantity) }
              : line,
          ),
        };
      }
      if (state.lines.length >= MAX_LINES) return state;
      return {
        lines: [...state.lines, { slug: action.slug, quantity: Math.min(20, action.quantity) }],
      };
    }
    case "setQuantity": {
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((line) => line.slug !== action.slug) };
      }
      return {
        lines: state.lines.map((line) =>
          line.slug === action.slug
            ? { ...line, quantity: Math.min(20, action.quantity) }
            : line,
        ),
      };
    }
    case "remove":
      return { lines: state.lines.filter((line) => line.slug !== action.slug) };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLineDetail[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  lastAdded: string | null;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  /** Non-blocking confirmation for the "added" toast. */
  notify: (slug: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).slug === "string" &&
        typeof (line as CartLine).quantity === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const hydrated = useRef(false);
  const notifyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate once on mount so server and client markup match.
  useEffect(() => {
    dispatch({ type: "hydrate", lines: readStorage() });
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // Private browsing or a full quota: the cart simply stays in memory.
    }
  }, [state.lines]);

  useEffect(() => () => {
    if (notifyTimer.current) clearTimeout(notifyTimer.current);
  }, []);

  const notify = useCallback((slug: string) => {
    setLastAdded(slug);
    if (notifyTimer.current) clearTimeout(notifyTimer.current);
    notifyTimer.current = setTimeout(() => setLastAdded(null), 2600);
  }, []);

  const add = useCallback(
    (slug: string, quantity = 1) => {
      dispatch({ type: "add", slug, quantity });
      notify(slug);
    },
    [notify],
  );

  const value = useMemo<CartContextValue>(() => {
    const lines = state.lines.flatMap((line) => {
      const product = products.find((item) => item.slug === line.slug);
      if (!product) return [];
      return [
        {
          slug: product.slug,
          quantity: line.quantity,
          name: product.name,
          price: product.price,
          image: product.image.src,
        },
      ];
    });

    return {
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: lines.reduce((total, line) => total + line.price * line.quantity, 0),
      isOpen,
      lastAdded,
      add,
      setQuantity: (slug, quantity) => dispatch({ type: "setQuantity", slug, quantity }),
      remove: (slug) => dispatch({ type: "remove", slug }),
      clear: () => dispatch({ type: "clear" }),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      notify,
    };
  }, [state.lines, isOpen, lastAdded, add, notify]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}