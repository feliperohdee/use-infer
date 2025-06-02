import { describe, expect, it } from 'vitest';

import infer, { inferValue } from './index';

describe('/index', () => {
	describe('infer', () => {
		it('should infer values in a simple object', () => {
			const fn = (value: unknown) => value;
			const input = { a: 'true', b: '42', c: 'hello', d: fn };
			const expected = { a: true, b: 42, c: 'hello', d: fn };

			expect(infer(input)).toEqual(expected);
		});

		it('should infer values in a nested object', () => {
			const input = { a: { b: 'true', c: '42' }, d: 'false' };
			const expected = { a: { b: true, c: 42 }, d: false };

			expect(infer(input)).toEqual(expected);
		});

		it('should infer values in an array', () => {
			const input = ['true', '42', 'hello'];
			const expected = [true, 42, 'hello'];

			expect(infer(input)).toEqual(expected);
		});

		it('should infer values in an object with arrays', () => {
			const input = { a: ['true', '42'], b: { c: ['false', '3.14'] } };
			const expected = { a: [true, 42], b: { c: [false, 3.14] } };

			expect(infer(input)).toEqual(expected);
		});

		it('should handle empty objects and arrays', () => {
			expect(infer({})).toEqual({});
			expect(infer([])).toEqual([]);
		});
	});

	describe('inferValue', () => {
		it('should infer boolean values', () => {
			expect(inferValue('true')).toBeTruthy();
			expect(inferValue('false')).toBeFalsy();
		});

		it('should infer numeric values', () => {
			expect(inferValue('42')).toEqual(42);
			expect(inferValue('3.14')).toEqual(3.14);
			expect(inferValue('+3.14')).toEqual('+3.14');
			expect(inferValue('-3.14')).toEqual('-3.14');
		});

		it('should return string for non-boolean and non-numeric values', () => {
			expect(inferValue('hello')).toEqual('hello');
		});

		it('should return empty string for empty strings', () => {
			expect(inferValue('')).toEqual('');
		});
	});
});
