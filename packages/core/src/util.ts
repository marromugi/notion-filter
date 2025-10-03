import {
  FilterCheckField,
  FilterCustomField,
  FilterFieldConfig,
  FilterRadioField,
  FilterSchema,
  FilterSelectField,
  FilterTextField,
  IdentifiableFilterField,
} from './type';

export function getField<S extends FilterSchema, K extends keyof S & string>(
  schema: S,
  key: K,
): IdentifiableFilterField<S[K], K> {
  return {
    id: key,
    ...schema[key],
  };
}

export function getAllFields<S extends FilterSchema>(
  schema: S,
): {
  [K in keyof S]: IdentifiableFilterField<S[K], K & string>;
}[keyof S][] {
  return Object.keys(schema).map((key) => getField(schema, key));
}

export const createFieldHelper = {
  // Alternative API using the new types
  text: (config: FilterFieldConfig<FilterTextField>): FilterTextField => ({
    type: 'text',
    ...config,
  }),

  select: <T = string>(config: FilterFieldConfig<FilterSelectField<T>>): FilterSelectField<T> => ({
    type: 'select',
    ...config,
  }),

  radio: <T = string>(config: FilterFieldConfig<FilterRadioField<T>>): FilterRadioField<T> => ({
    type: 'radio',
    ...config,
  }),

  check: <T = string>(config: FilterFieldConfig<FilterCheckField<T[]>>): FilterCheckField<T[]> => ({
    type: 'check',
    ...config,
  }),

  custom:
    <V = unknown>() =>
    <T extends string, M extends Record<string, unknown>>(config: {
      type: T;
      label: string;
      description?: string;
      disabled?: boolean;
      meta?: M;
    }): FilterCustomField<T, V, M> =>
      ({
        ...config,
        meta: config.meta ?? {},
      }) as FilterCustomField<T, V, M>,
};
