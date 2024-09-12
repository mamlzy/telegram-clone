# Zod Schema Notes

## Number Schemas

- **Required:**  
  Ensures the value is a positive number.

  ```typescript
  z.coerce.number().positive(),
  ```

- **Nullable:**  
  Ensures the value is a non-negative number or null.
  ```typescript
  z.coerce.number().nonnegative().nullable(),
  ```

## String Schemas

- **Required:**  
  Ensures the value is a non-empty string with trimmed whitespace.

  ```typescript
  z.string().trim().nonempty(),
  ```

- **Nullable:**  
  Ensures the value is a trimmed string or null.
  ```typescript
  z.string().trim().nullable(),
  ```
