# classon-react-native

classon react native sdk

## Table of Contents
1. [Install](#install)
1. [Usage](#usage)
1. [Component](#component)
1. [API](#api)
1. [Examples](https://github.com/v2tien/react-native-classon-example)

## Install

- classon react native is reuqired, install by running:

```sh
npm install @classon/react-native --save

or

yarn add @classon/react-native
```

- For IOS install by running :
```sh
npx pod-install
```

Note that you need to save the key into file info.plist

```
NSURLIsExcludedFromBackupKey
```

`(IOS only): The NSURLIsExcludedFromBackupKey property can be provided to set this attribute on iOS platforms. Apple will reject apps for storing offline cache data that does not have this attribute.`

**Note:** The classon-react-native package uses several other library packages to build and support such as:
- [react-natie-video](https://github.com/react-native-video/react-native-video)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [react-native-sound](https://github.com/zmxv/react-native-sound)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-fs](https://github.com/itinance/react-native-fs)
- [@shopify/react-native-skia](https://github.com/Shopify/react-native-skia)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
- [@babel/plugin-proposal-export-namespace-from](https://babeljs.io/docs/babel-plugin-transform-export-namespace-from)
  
So during the integration and testing process, if any errors arise, please check if the above packages are installed in the project or not. If not, please install the required package and try again.

## Usage

### Import

How to add the SDK:

```js
import { ClassOn } from '@classon/react-native';
```

### Basic
A simple usage:

```js
<ClassOn
  classId={classId}
  token={token}
  bookData={bookData}
  live={true}
  user={user}
/>
```

## Component

#### - Connection

| Name                    |               Description                                     | Type         |
|-------------------------|---------------------------------------------------------------|--------------|
| classId (required)      | ID of the lesson or class                                     | string       |
| token   (required)      | Is the application token to connect to the socket server      | string       |
| conferenceType  (required) |  Use the conference type for classes   | number (0: no conference, 1: bluesea conference )|
| children (required)     | Is a child component wrapped by Connection. It is [ClassonScreen](#basic) | JSX.Element  |

#### - ClassonScreen

| Name                  |               Description                                        | Type         |
|-----------------------|------------------------------------------------------------------|--------------|
| bookData (required)   | Lesson's data ([Example](https://github.com/v2tien/react-native-classon-example/blob/master/src/common/bookdata.ts))                                                                                       | Object       |
| user  (optional)      | User information                                              | Object ({id: number, role: string})|
| render (optional)     | Render progress component while waiting for the data to completed | Function     |
| live (optional)       | Set class status online or offline                            | Boolean     |
| confetti (optional)   | Video at the end of the lesson                                | Array<string>     |

#### - BlueseaConference

| Name                    |               Description                                     | Type         |
|-------------------------|---------------------------------------------------------------|--------------|
| horizontal (optional)      |  List displays horizontally or vertically   | Boolean       |
| onlyAudio   (optional)      | Allow only audio, no video     | Boolean   |
| containerStyle  (optional) |  A style object that allow you to customize the BlueseaView container style   | ViewStyle|
| listContainerStyle (optional) | A style object that allow you to customize list container style  | ViewStyle  |
| itemStyles (optional)      | Customize view video item                    | [BlueseaItemProps](#-blueseaitemprops)  |
| renderBlueseaItem (optional) | Customize view video item conference      | JSX.Element       |
| renderBluseaView (optional)  | Customize video conference container      | JSX.Element       |

##### - BlueseaItemProps
| Name                    |               Description                                     | Type         |
|-------------------------|---------------------------------------------------------------|--------------|
| itemContainerStyle (optional) | Style object to customize item container   | ViewStyle       |
| videoStyle   (optional)       | Style object to customize video item view   | ViewStyle       |

## API

### Action type

| Name                 |               Description                                    
|----------------------|---------------------------------------------------------------|
| LoadingProcess       | The process of downloading lesson data
| LoadingComplete      | The process of downloadig lesson data is completed
| LoadingError         | Error message while downloading lesson data
| LoadingRetry         | Reload lesson data failed 
| StartClassroom       | Start the lesson
| FinishClassroom      | End of lesson

### Methods
- Call to reload file that failed during data download

```js
pubsubClient.publish('control', { type: ActionClientType.LoadingRetry });
```

- Call to start the lesson

```js
pubsubClient.publish('control', { type: ActionClientType.StartClassroom });
```

- Call when the screen size changes such as shrinking or zooming

```js
pubsubClient.publish('control', { type: ActionClientType.Resize });
```

- Call to skip downloading file when trying to download the file many times and still has an error message

```js
pubsubClient.publish('load-source', { type: ActionClientType.LoadingIgnore, payload: { url: string }});
```

### Events

- Data download progress

```js
useEffect(() => {
  const fnc = (a: ActionClient) => { 
    switch(a.type){
      case ActionClientType.LoadingProcess
      //TODO Loading...
      // a.payload: {
      //   url: string;
      //   process: number;
      // }
      break;

      case ActionClientType.LoadingComplete:
      //TODO Complete
      // a.payload: {}
      break;

      case ActionClientType.LoadingError:
      //TODO Error: You can call the method LoadingRetry or LoadingIgnore
      // a.payload: {
      //   url: string;
      //   process: number;
      //   message?: string;
      // }
      break;
    }
  };

  const subscription = pubsubClient.subscribe('load-source', fnc);

  return subscription.unsubscribe;
}, []);
```

- Listen at the end of the lesson

```js
useEffect(() => {
  const fnc = (a: ActionClient) => {
    if (a.type === ActionClientType.FinishClassroom) {
      //TODO
    }
  };

  const subscriptionControl = pubsubClient.subscribe('control', fnc);

  return subscriptionControl.unsubscribe;
}, []);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Commit Lint:

https://github.com/conventional-changelog/commitlint/#what-is-commitlint

Fix issue:

https://github.com/zmxv/react-native-sound/issues/799#issuecomment-1534340874
