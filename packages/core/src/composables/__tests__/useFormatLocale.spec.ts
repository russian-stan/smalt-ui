import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { h } from 'vue'
import { SDateField } from '../../components/SDateField'
import { ConfigProvider } from '../../providers'

function segmentOrder(container: Element): string[] {
  return [...container.querySelectorAll('[data-reka-date-field-segment]')]
    .map((el) => el.getAttribute('data-reka-date-field-segment')!)
    .filter((part) => part !== 'literal')
}

function renderField(locale?: 'en', prop?: string) {
  const field = () => h(SDateField, { label: 'Date', locale: prop })
  const { container } = render({
    render: () => (locale ? h(ConfigProvider, { locale }, { default: field }) : field()),
  })
  return container
}

describe('useFormatLocale', () => {
  it('without ConfigProvider uses the built-in locale format (en-US)', () => {
    expect(segmentOrder(renderField())).toEqual(['month', 'day', 'year'])
  })

  it('the ConfigProvider locale sets the segment order', () => {
    expect(segmentOrder(renderField('en'))).toEqual(['month', 'day', 'year'])
  })

  it('the locale prop overrides the library locale', () => {
    expect(segmentOrder(renderField(undefined, 'en-GB'))).toEqual(['day', 'month', 'year'])
    expect(segmentOrder(renderField('en', 'en-GB'))).toEqual(['day', 'month', 'year'])
  })
})
