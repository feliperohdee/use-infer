import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import toNumber from 'lodash/toNumber';

type InputFunction = (value: any) => any;
type InputPrimitive = StringValue | number | boolean | null | undefined;
type InputObject = { [key: string]: InputValue };
type InputArray = InputValue[];
type InputValue = InputFunction | InputPrimitive | InputObject | InputArray;

type OutputFunction = (value: any) => any;
type OutputPrimitive = string | number | boolean | null | undefined;
type OutputObject = { [key: string]: OutputValue } | Record<string, unknown>;
type OutputArray = OutputValue[];
type OutputValue = OutputFunction | OutputPrimitive | OutputObject | OutputArray;

type StringValue = string | 'true' | 'false';

const isPrimitiveValue = (value: unknown): value is InputPrimitive => {
	return isString(value) || isNumber(value) || isBoolean(value) || isNil(value);
};

const isStringBoolean = (value: string): value is 'true' | 'false' => {
	return value === 'true' || value === 'false';
};

const infer = <T extends OutputValue>(obj: InputValue): T => {
	if (isArray(obj)) {
		return map(obj, infer) as T;
	}

	if (!isPlainObject(obj)) {
		return inferValue(obj as InputPrimitive) as T;
	}

	return reduce(
		obj as InputObject,
		(reduction, value, key) => {
			let inferredValue: OutputValue = value;

			if (isArray(value)) {
				inferredValue = map(value, infer);
			} else if (isPlainObject(value)) {
				inferredValue = infer(value);
			} else if (isPrimitiveValue(value)) {
				inferredValue = inferValue(value);
			}

			return {
				...reduction,
				[key]: inferredValue
			};
		},
		{} as T extends OutputObject ? T : never
	);
};

const inferValue = (value: InputPrimitive): OutputPrimitive => {
	if (value === null || value === undefined) {
		return value;
	}

	if (typeof value === 'string' && isStringBoolean(value)) {
		return value === 'true';
	}

	if (typeof value === 'string' && value.trim() !== '') {
		const n = toNumber(value);
		if (isFinite(n)) {
			return n;
		}
	}

	return value;
};

export { infer, inferValue, InputValue, OutputValue };
export default infer;
