```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>页面水印</h1>
    <script src="../dist/index.js"></script>
    <script>
        /**
         * @descript 创建
         * @param   content: '请勿外传',
                    font: 'Arial, sans-serif',
                    size: 16,
                    color: '#000',
                    opacity: 0.15,
                    angle: -15,
                    density: 2
         * */
        wzwatermark.initWatermark();
        //删除
        // wzwatermark.removeWatermark();
    </script>
</body>
</html>
```


在 Vue 项目中使用：
``` js
import Vue from 'vue';
import Watermark from 'wzwatermark';

// 全局安装
Vue.use(Watermark, {
  content: '机密文档',
  size: 20,
  color: '#ff0000',
  opacity: 0.2,
  angle: -20
});

```

``` js
// 或者在组件中局部使用
import { initWatermark, removeWatermark } from 'wzwatermark';

export default {
  mounted() {
    initWatermark({
      content: '仅供内部使用',
      size: 18,
      color: '#333',
      opacity: 0.1,
      angle: -15
    });
  },
  beforeDestroy() {
    removeWatermark();
  }
};
```

在 React 项目中使用：
```js
import React, { useEffect } from 'react';
import { initWatermark, removeWatermark } from 'watermark-library';

function App() {
  useEffect(() => {
    initWatermark({
      content: '内部资料',
      size: 16,
      color: '#0000ff',
      opacity: 0.15,
      angle: -15
    });
    
    return () => {
      removeWatermark();
    };
  }, []);

  return (
    <div className="App">
      {/* 页面内容 */}
    </div>
  );
}

export default App;
```