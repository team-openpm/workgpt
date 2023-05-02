import { WorkGptControl } from '../../../apis/workgpt-control'
import { parseInvocation, parseInvocation } from './parse'

describe('runInvocations', () => {
  it('should run a single invocation', async () => {
    // Expect throw
    expect(() =>
      parseInvocation('WorkGpt.WorkGptControl.onDone()', [new WorkGptControl()])
    ).toThrow()
  })
})

describe('parseInvocations', () => {
  it('should parse a single invocation', () => {
    expect(
      parseInvocation(`
      WorkGpt.Foo.call({ bar: 'baz' })
    `)
    ).toMatchInlineSnapshot(`
      [
        {
          "args": [
            {
              "bar": "baz",
            },
          ],
          "method": "call",
          "namespace": "Foo",
        },
      ]
    `)
  })

  it('should parse multiple invocation', () => {
    expect(
      parseInvocation(`
      WorkGpt.Foo.call('foo', 'bar')
    `)
    ).toMatchInlineSnapshot(`
      [
        {
          "args": [
            "foo",
            "bar",
          ],
          "method": "call",
          "namespace": "Foo",
        },
      ]
    `)
  })
})
