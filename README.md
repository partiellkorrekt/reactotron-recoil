# reactotron-recoil

[Recoil](https://recoiljs.org/) is a relatively new library by facebook to manage global state in React.

This library intends to combine [Recoil](https://recoiljs.org/) with [Reactotron](https://infinite.red/reactotron), simular to what [reactotron-redux](https://github.com/infinitered/reactotron-redux) does for Redux.

# Installing

`reactotron-recoil` can be installed by typing:

`npm install --save-dev reactotron-recoil`

or

`yarn add reactotron-recoil`

# Features

- Subscribe to changes for one or more atoms/selectors
- View a List of all atoms/selectors
- Pull the values for all atoms

## What's missing

- Update the state from Reactotron
- Have more than one RecoilRoot

# Configuring

Two files need to change to hookup Reactotron to Redux. First, in your ReactotronConfig, you'll need to add `reactotron-recoil` as a plugin

```diff
// ReactotronConfig.js
+ import { reactotronRecoil } from 'reactotron-recoil'

const reactotron = Reactotron
  .configure({ name: 'React Native Demo' })
+ .use(reactotronRecoil()) //  <- here i am!
  .connect() //Don't forget about me!

export default reactotron
```

Then replace &lt;RecoilRoot> with &lt;ReactotronRecoilRoot>

```diff
- import { RecoilRoot } from 'recoil'
+ import { ReactotronRecoilRoot } from 'reactotron-recoil'

render(
-  <RecoilRoot>
+  <ReactotronRecoilRoot>
    <App />
-  </RecoilRoot>
+  </ReactotronRecoilRoot>,
  document.getElementById('app')
)
```

# Options

This plugin currently doesn't have any options
