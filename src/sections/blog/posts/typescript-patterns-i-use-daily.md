---
title: "TypeScript Patterns I Use Daily"
date: "2026-09-01"
description: "Practical TypeScript patterns that have become second nature — discriminated unions, branded types, and the const assertion trick."
tags: ["typescript", "patterns", "best-practices"]
readTime: "8 min read"
---

# TypeScript Patterns I Use Daily

After years of writing TypeScript professionally, certain patterns have become muscle memory. These aren't clever tricks — they're practical tools that make code safer and more expressive.

## Discriminated Unions

This is, without exaggeration, the single most useful pattern in TypeScript. Instead of optional properties and null checks scattered throughout your code, you model your states explicitly:

```typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
```

Now the compiler *knows* that `data` only exists when `status` is `'success'`. No more defensive programming against impossible states.

```typescript
function render(state: AsyncState<User>) {
  switch (state.status) {
    case 'idle':
      return <Placeholder />;
    case 'loading':
      return <Spinner />;
    case 'success':
      // TypeScript knows state.data exists here
      return <Profile user={state.data} />;
    case 'error':
      // TypeScript knows state.error exists here
      return <ErrorMessage error={state.error} />;
  }
}
```

## Branded Types

Sometimes a `string` isn't just a string. A user ID and a post ID are both strings, but they're not interchangeable. Branded types encode this distinction:

```typescript
type UserId = string & { readonly __brand: 'UserId' }
type PostId = string & { readonly __brand: 'PostId' }

function createUserId(id: string): UserId {
  // validation logic here
  return id as UserId;
}

function getUser(id: UserId): User { /* ... */ }

// This won't compile — PostId is not assignable to UserId
const postId = createPostId('abc');
getUser(postId); // ← Type error!
```

The runtime cost is zero. The safety benefit is significant.

## The `satisfies` Operator

Introduced in TypeScript 4.9, `satisfies` lets you validate that an expression matches a type without widening it:

```typescript
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<string, string | number[]>;

// palette.green is still typed as string (not string | number[])
palette.green.toUpperCase(); // ✓ works
```

## `as const` for Literal Inference

When you need TypeScript to infer the narrowest possible type:

```typescript
const ROUTES = {
  home: '/',
  blog: '/blog',
  about: '/about',
} as const;

// Type is '/' | '/blog' | '/about', not string
type Route = typeof ROUTES[keyof typeof ROUTES];
```

This pairs beautifully with discriminated unions and is essential for building type-safe routing.

## Closing Thoughts

TypeScript isn't about adding types to JavaScript. It's about *modeling your domain* so precisely that entire categories of bugs become structurally impossible. The compiler becomes your first reviewer, catching mistakes before they ever reach a human.

Write types that tell a story. Your future self will thank you.
