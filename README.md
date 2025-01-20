# use-infer

A lightweight TypeScript utility for automatically inferring proper JavaScript types from string values, designed for processing form data, API responses, and other string-based inputs.

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/-Vitest-729B1B?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Installation](#installation)
- [Core Features](#core-features)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)
  - [infer](#infer)
  - [inferValue](#infervalue)
- [Examples](#examples)
- [Testing](#testing)
- [Author](#author)
- [License](#license)

## Installation

```bash
npm install use-infer
```

## Core Features

- 🎯 Automatically converts string values to their proper JavaScript types
- 🔄 Handles nested objects and arrays
- ⚡ Type-safe with full TypeScript support
- 🛡️ Preserves original values when conversion isn't appropriate
- 📦 Zero dependencies (except lodash utilities)

## Usage

### Basic Usage

```typescript
import infer from 'use-infer';

// Simple object inference
const input = {
	isActive: 'true',
	count: '42',
	name: 'John'
};

const result = infer(input);
// Result:
// {
//   isActive: true,  // boolean
//   count: 42,       // number
//   name: 'John'     // string
// }
```

### Advanced Usage

```typescript
import infer from 'use-infer';

// Complex nested structure
const input = {
	user: {
		id: '123',
		settings: {
			notifications: 'true',
			theme: 'dark'
		}
	},
	scores: ['42', '98', '75'],
	active: 'true'
};

const result = infer(input);
// Result:
// {
//   user: {
//     id: 123,
//     settings: {
//       notifications: true,
//       theme: 'dark'
//     }
//   },
//   scores: [42, 98, 75],
//   active: true
// }
```

## API Reference

### infer

```typescript
function infer<T extends OutputValue>(obj: InputValue): T;
```

Recursively processes an object or array, converting string values to their appropriate types.

#### Type Definitions

```typescript
type InputPrimitive = string | number | boolean | null | undefined;
type InputObject = { [key: string]: InputValue };
type InputArray = InputValue[];
type InputValue = InputPrimitive | InputObject | InputArray;

type OutputPrimitive = string | number | boolean | null | undefined;
type OutputObject = { [key: string]: OutputValue };
type OutputArray = OutputValue[];
type OutputValue = OutputPrimitive | OutputObject | OutputArray;
```

### inferValue

```typescript
function inferValue(value: InputPrimitive): OutputPrimitive;
```

Processes a single value, converting it to the appropriate type if possible.

## Examples

### Form Data Processing

```typescript
import infer from 'use-infer';

const formData = {
	username: 'john_doe',
	age: '25',
	subscribed: 'true',
	preferences: {
		emailNotifications: 'true',
		theme: 'dark',
		refreshRate: '60'
	}
};

const processedData = infer(formData);
```

### API Response Handling

```typescript
import infer from 'use-infer';

const apiResponse = {
	id: '12345',
	items: ['1', '2', '3'],
	metadata: {
		isValid: 'true',
		count: '42',
		tags: ['tag1', 'tag2']
	}
};

const typedResponse = infer(apiResponse);
```

## Testing

The library includes comprehensive test coverage. Run tests with:

```bash
npm test
```

Test coverage includes:

- Basic type inference
- Nested object handling
- Array processing
- Edge cases
- Type safety

## 👨‍💻 Author

**Felipe Rohde**

- Twitter: [@felipe_rohde](https://twitter.com/felipe_rohde)
- Github: [@feliperohdee](https://github.com/feliperohdee)
- Email: feliperohdee@gmail.com

## License

[MIT](LICENSE)
