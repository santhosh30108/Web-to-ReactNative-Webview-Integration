import React, {useRef} from 'react';
import {View, StyleSheet, SafeAreaView, Button} from 'react-native';
import {WebView} from 'react-native-webview';

function App() {
  const ref = useRef(null);

  const pauseTimer = () => {
    ref?.current?.injectJavaScript(
      `if(window.sendEventToWeb){
        window.sendEventToWeb("REQUEST_TIMER_PAUSE","e30=")
      }`,
    );
  };

  const resumeTimer = () => {
    ref?.current?.injectJavaScript(
      `if(window.sendEventToWeb){
        window.sendEventToWeb("REQUEST_TIMER_RESUME","eyJyZWxhdGl2ZVRpbWVEaWZmZXJlbmNlIjozMH0=")
      }`,
    );
  };

  const handleMessage = message => {
    let eventData = JSON.parse(message?.nativeEvent?.data);
    if (eventData?.type !== undefined) {
      switch (eventData?.type) {
        case 'REQUEST_CLOSE_WEBVIEW': {
          ref?.current?.injectJavaScript(
            'alert("REQUEST_CLOSE_WEBVIEW EVENT RECEIVED FROM WEB")',
          );
          break;
        }
      }
    }
  };

  // let url = 'http://localhost:8001/';
  let url = 'http://10.0.2.2:8001/';
  // let url = 'https://testplatform-dev.aakash.ac.in/';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Event 1" onPress={pauseTimer} />
        <Button
          title="Refresh"
          onPress={() => {
            ref?.current?.reload();
          }}
        />
        <Button title="Event 2" onPress={resumeTimer} />
      </View>
      <WebView
        ref={ref}
        style={styles.webView}
        originWhitelist={['*']}
        source={{uri: url}}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  webView: {
    flex: 1,
  },
});

export default App;
