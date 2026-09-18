import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'
import { SCard } from '../index'

/** Focus and computed styles: happy-dom computes neither. */
describe('SCard · browser', () => {
  it('a selectable card moves focus to the nested radio and highlights', async () => {
    render(SCard, {
      props: { as: 'label', interactive: true },
      slots: { default: '<input type="radio" name="size" aria-label="Size S" />' },
    })
    const radio = screen.getByRole('radio', { name: 'Size S' })
    await userEvent.click(radio)
    expect(radio).toBeChecked()
    expect(document.activeElement).toBe(radio)
  })

  it('selected draws the accent border', () => {
    const { container } = render(SCard, { props: { selected: true }, slots: { default: 'M' } })
    const styles = getComputedStyle(container.querySelector('.s-card')!)
    expect(styles.boxShadow).not.toBe('none')
  })

  /** Shadow layers: commas inside rgba(...) are not separators. */
  const layers = (el: Element) =>
    getComputedStyle(el)
      .boxShadow.split(/,(?![^(]*\))/)
      .map((layer) => layer.trim())

  it('a selected elevated card keeps both the ring and the shadow', () => {
    const { container } = render(SCard, {
      props: { variant: 'elevated', selected: true },
      slots: { default: 'M' },
    })
    const [ring, lift] = layers(container.querySelector('.s-card')!)
    expect(ring).toContain('inset')
    // The second layer is a real shadow: the selection ring does not displace it.
    expect(lift).not.toContain('rgba(0, 0, 0, 0)')
  })

  it('flat removes the elevated variant shadow without touching the selection ring', () => {
    const { container } = render(SCard, {
      props: { variant: 'elevated', selected: true, flat: true },
      slots: { default: 'M' },
    })
    const [ring, lift] = layers(container.querySelector('.s-card')!)
    expect(ring).toContain('inset')
    expect(lift).toContain('rgba(0, 0, 0, 0)')
  })

  it('--s-card-padding sets the card padding, a nested card keeps its own', () => {
    const { container } = render({
      components: { SCard },
      template: `
        <SCard style="--s-card-padding: 0">
          <SCard>Nested</SCard>
        </SCard>
      `,
    })
    const [outer, inner] = [...container.querySelectorAll('.s-card__body')]
    expect(getComputedStyle(outer).paddingTop).toBe('0px')
    expect(getComputedStyle(inner).paddingTop).not.toBe('0px')
  })
})
