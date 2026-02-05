// A strongly-typed, deterministic implementation of the classic `classnames/clsx` helper.
// It supports strings, numbers, booleans, functions, arrays, and objects with truthy/falsey toggles.

export type ClassDictionary = Record<string, boolean | null | undefined | number | string>;
export type ClassValue = ClassDictionary | ClassValue[] | string | number | boolean | null | undefined | (() => ClassValue);

/**
 * Build a space-separated class string with deterministic precedence.
 * Later arguments (or deeper items) override earlier ones when a falsy object value removes a class.
 */
export function classNames(...values: ClassValue[]): string {
  const classes = new Set<string>();

  const push = (value: ClassValue): void => {
    if (value == null || value === false) return;

    if (Array.isArray(value)) {
      value.forEach(push);
      return;
    }

    if (typeof value === "function") {
      push(value());
      return;
    }

    if (typeof value === "object") {
      for (const [key, flag] of Object.entries(value)) {
        if (flag) {
          classes.add(key);
        } else {
          classes.delete(key); // explicit off switch
        }
      }
      return;
    }

    if (typeof value === "string" || typeof value === "number") {
      const trimmed = String(value).trim();
      if (trimmed) classes.add(trimmed);
    }
  };

  values.forEach(push);
  return Array.from(classes).join(" ");
}

export default classNames;
