/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FilterType,
  FilterValue,
  FilterTextField,
  FilterSelectField,
  FilterCheckField,
  FilterCustomField,
  FilterSchema,
} from '..';
import { createFieldHelper, getAllFields, getField } from '../util';

// Raw schema definition without using createFieldHelper
export const rawSchema = {
  email: {
    type: 'text',
    label: 'Email',
    description: 'Enter your email address',
    validate: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { result: false, message: 'Please enter a valid email address' };
      }
      return { result: true };
    },
  } satisfies FilterTextField,

  status: {
    type: 'select',
    label: 'Status',
    description: 'Select account status',
    disabled: false,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
    ],
  } as FilterSelectField<'active' | 'inactive' | 'pending'>,

  preferences: {
    type: 'check',
    label: 'Preferences',
    description: 'Select your preferences',
    options: [
      { label: 'Email notifications', value: 'email' },
      { label: 'SMS notifications', value: 'sms' },
      { label: 'Push notifications', value: 'push' },
      { label: 'Newsletter', value: 'newsletter' },
    ],
  } as FilterCheckField<string[]>,

  dateRange: {
    type: 'dateRange',
    label: 'Date Range',
    description: 'Select a date range',
    meta: {
      minDate: new Date('2020-01-01'),
      maxDate: new Date('2025-12-31'),
      format: 'YYYY-MM-DD',
    },
  } as FilterCustomField<
    'dateRange',
    { start: Date; end: Date },
    { minDate: Date; maxDate: Date; format: string }
  >,
} satisfies FilterSchema;

// Schema using createFieldHelper
export const sampleSchema = {
  email: createFieldHelper.text({
    label: 'Email',
    description: 'Enter your email address',
    validate: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { result: false, message: 'Please enter a valid email address' };
      }
      return { result: true };
    },
  }),

  status: createFieldHelper.select<'active' | 'inactive' | 'pending'>({
    label: 'Status',
    description: 'Select account status',
    disabled: false,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
    ],
  }),

  preferences: createFieldHelper.check<string>({
    label: 'Preferences',
    description: 'Select your preferences',
    options: [
      { label: 'Email notifications', value: 'email' },
      { label: 'SMS notifications', value: 'sms' },
      { label: 'Push notifications', value: 'push' },
      { label: 'Newsletter', value: 'newsletter' },
    ],
  }),

  dateRange: createFieldHelper.custom<{ start: Date; end: Date }>()({
    type: 'test',
    label: 'Date Range',
    description: 'Select a date range',
    meta: {
      minDate: new Date('2020-01-01'),
      maxDate: new Date('2025-12-31'),
      format: 'YYYY-MM-DD',
    },
  }),
};

// Usage with raw schema
const rawAllFields = getAllFields(rawSchema);
const rawField = getField(rawSchema, 'dateRange');

type RawFilterSchema = typeof rawSchema;
type RawFilterValues = FilterValue<RawFilterSchema>;
type RawFilterTypes = FilterType<RawFilterSchema>;

// Usage with createFieldHelper schema
const allFields = getAllFields(sampleSchema);

const field = getField(sampleSchema, 'dateRange');

type SampleFilterSchema = typeof sampleSchema;
type SampleFilterValues = FilterValue<SampleFilterSchema>;
type SampleFilterTypes = FilterType<SampleFilterSchema>;

const a = () => {
  allFields.map((f) => {
    switch (f.id) {
      case 'dateRange': {
        const a = f.id;
        f.meta?.format;
      }
    }
  });

  // Same works with raw schema
  rawAllFields.map((f) => {
    switch (f.id) {
      case 'dateRange': {
        const a = f.id;
        f.meta?.format;
      }
    }
  });

  for (const field of rawAllFields) {
    if (field.id === 'email') {
      field.validate('xxx@example.com');
    }
  }
};
