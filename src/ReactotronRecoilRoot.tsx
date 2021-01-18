import React, { useEffect } from 'react'
import { RecoilRoot, RecoilRootProps, useRecoilSnapshot } from 'recoil'
import { Reactotron } from 'reactotron-core-client'

console.log(React)

const pickValues = (state: Record<string, unknown>, path: string): unknown => {
  if (!path || path === '*') {
    return state
  }
  if (!path.endsWith('*')) {
    return state[path]
  }
  if (path.endsWith('*')) {
    const result: Record<string, unknown> = {}
    const prefix = path.substr(0, path.length - 1)
    for (const key in state) {
      if (key.startsWith(prefix)) {
        result[key] = state[key]
      }
    }
    return result
  }
  return {}
}

class RecoilState {
  state: Record<string, unknown> = {}
  subscriptions: string[] = []
  reactotron?: Reactotron
  onChange: (lastState: Record<string, unknown>, nextState: Record<string, unknown>) => void = () => undefined
  setState(nextState: Record<string, unknown>) {
    this.onChange(this.state, nextState)
    this.state = nextState
    this.serveSubscriptions()
  }
  getKeys() {
    return Object.keys(this.state)
  }
  getState() {
    return { ...this.state }
  }
  setSubscriptions(paths: string[], reactotron?: Reactotron) {
    this.subscriptions = paths
    if (reactotron) {
      this.reactotron = reactotron
    }
    this.serveSubscriptions()
  }
  serveSubscriptions() {
    this.reactotron?.stateValuesChange &&
      this.reactotron.stateValuesChange(
        this.subscriptions.map((path) => ({
          path,
          value: pickValues(this.state, path)
        }))
      )
  }
}
export const MainRecoilState = new RecoilState()

const RecoilObserver: React.FC = () => {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    const state: Record<string, unknown> = {}
    for (const node of snapshot.getNodes_UNSTABLE()) {
      const info = snapshot.getInfo_UNSTABLE(node)
      state[node.key] = info.loadable?.contents
    }
    MainRecoilState.setState(state)
  }, [snapshot])

  return <React.Fragment />
}

const ReactotronRecoilRoot: React.FC<RecoilRootProps> = (props) => (
  <RecoilRoot {...props}>
    <RecoilObserver />
    {props.children}
  </RecoilRoot>
)

export default ReactotronRecoilRoot
