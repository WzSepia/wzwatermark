import watermark from './watermark';

/**
 * 初始化水印
 * @param {Object} options - 配置选项
 */
export function initWatermark(options) {
  watermark.init(options);
}

/**
 * 移除水印
 */
export function removeWatermark() {
  watermark.remove();
}

// 自动初始化
export default {
  install(Vue, options) {
    initWatermark(options);
    
    // 添加全局混入，确保路由变化时水印不丢失
    Vue.mixin({
      beforeCreate() {
        // 检查水印是否存在，不存在则重新创建
        if (!document.getElementById(watermark.watermarkId)) {
          initWatermark(options);
        }
      }
    });
  }
};