import { Reactotron } from 'reactotron-core-client'
import { MainRecoilState } from './ReactotronRecoilRoot'

const reactotronRecoil = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (reactotron: Reactotron) => {
    return {
      onCommand({ type, payload }: { type: string; payload: { path: string; paths: [] } }) {
        switch (type) {
          case 'state.keys.request':
          case 'state.values.request':
            if (!payload.path) {
              reactotron.stateKeysResponse &&
                reactotron.stateKeysResponse(
                  null,
                  type === 'state.keys.request' ? Object.keys(MainRecoilState.getKeys()) : MainRecoilState.getState()
                )
            }
            break
          case 'state.backup.request':
            reactotron.send('state.backup.response', { state: MainRecoilState.getState() })
            break
          case 'state.values.subscribe':
            MainRecoilState.setSubscriptions(payload.paths, reactotron)
            break
        }
      }
    }
  }
}

export default reactotronRecoil
