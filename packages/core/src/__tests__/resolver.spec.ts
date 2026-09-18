import { describe, expect, it } from 'vitest'
import { SUIResolver } from '../resolver'

describe('SUIResolver', () => {
  it('resolves a known component to an import from @smalt-ui/core', () => {
    expect(SUIResolver().resolve('SButton')).toEqual({ name: 'SButton', from: '@smalt-ui/core' })
  })

  it('ignores unknown names', () => {
    expect(SUIResolver().resolve('SUnknown')).toBeUndefined()
  })

  it('does not resolve ConfigProvider — explicit import only', () => {
    expect(SUIResolver().resolve('ConfigProvider')).toBeUndefined()
  })

  it('resolves ToastProvider — it registers like a regular component', () => {
    expect(SUIResolver().resolve('ToastProvider')).toEqual({
      name: 'ToastProvider',
      from: '@smalt-ui/core',
    })
  })

  it('respects the prefix', () => {
    const resolver = SUIResolver({ prefix: 'App' })
    expect(resolver.resolve('AppSButton')).toEqual({ name: 'SButton', from: '@smalt-ui/core' })
    expect(resolver.resolve('SButton')).toBeUndefined()
  })

  it('a lowercase prefix works too', () => {
    const resolver = SUIResolver({ prefix: 'app' })
    expect(resolver.resolve('AppSButton')).toEqual({ name: 'SButton', from: '@smalt-ui/core' })
  })
})
