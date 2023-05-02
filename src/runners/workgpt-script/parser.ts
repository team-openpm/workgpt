import { NodeVM } from 'vm2'
import { Api } from '../../apis'

function buildContext(apis: Api[]) {
  const WorkGpt = {
    ...apis.reduce((acc, api) => {
      acc[api.namespace] = api.invokables.reduce((acc, invokable) => {
        acc[invokable.method] = (...args: any[]) => {
          return api.invoke({ method: invokable.method, args })
        }
        return acc
      }, {} as { [key: string]: any })
      return acc
    }, {} as { [key: string]: any }),
  }

  return { WorkGpt }
}

export async function execInvocations(source: string, apis: Api[]) {
  const vm = new NodeVM({
    sandbox: buildContext(apis),
    allowAsync: true,
    timeout: 10000,
    require: {
      root: './',
    },
  })

  const sourceWrapper = `(async () => {
    ${source}
  })()`

  await vm.run(sourceWrapper)
}
