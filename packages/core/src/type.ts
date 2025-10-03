type FilterBaseField<T> = {
  type: string; // override with union type
  label: string;
  description?: string;
  disabled?: boolean;
  _value?: T; // param to get value type
};

export type FilterTextField = FilterBaseField<string> & {
  type: 'text';
  validate?: (value: string) => { result: true } | { result: false; message: string };
};

export type FilterSelectField<T> = FilterBaseField<T> & {
  type: 'select';
  options: { label: string; value: T }[];
};

export type FilterRadioField<T> = FilterBaseField<T> & {
  type: 'radio';
  options: { label: string; value: T }[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterCheckField<T extends Array<any>> = FilterBaseField<T> & {
  type: 'check';
  options: { label: string; value: T[number] }[];
};

export type FilterCustomField<
  Type extends string,
  Value,
  Meta extends Record<string, unknown>,
> = Omit<FilterBaseField<Value>, 'type'> & {
  type: Type;
  meta: Meta;
};

export type FilterField =
  | FilterTextField
  | FilterSelectField<unknown>
  | FilterRadioField<unknown>
  | FilterCheckField<unknown[]>
  | FilterCustomField<string, unknown, Record<string, unknown>>;

export type FilterSchema = Record<string, FilterField>;

export type IdentifiableFilterField<
  T extends FilterField = FilterField,
  K extends string = string,
> = {
  id: K;
} & T;

export type FilterValue<T extends FilterSchema> = Partial<{
  [key in keyof T]: T[key]['_value'];
}>;

export type FilterType<T extends FilterSchema> = T[keyof T]['type'];

export type FilterFieldConfig<T extends FilterField> = Omit<T, 'type' | '_value'>;
