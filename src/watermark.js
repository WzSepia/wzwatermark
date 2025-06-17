/**
 * 页面水印生成库
 * 支持配置内容、字体、尺寸、颜色、透明度、角度和密度
 */
class Watermark {
  constructor() {
    this.watermarkId = 'global-watermark';
    this.observer = null;
  }

  /**
   * 初始化水印
   * @param {Object} options - 配置选项
   * @param {string} options.content - 水印内容
   * @param {string} options.font - 水印字体
   * @param {number} options.size - 水印文字大小
   * @param {string} options.color - 水印颜色
   * @param {number} options.opacity - 水印透明度
   * @param {number} options.angle - 水印旋转角度
   * @param {number} options.density - 水印密度
   */
  init(options = {}) {
    this.remove(); // 先移除已有的水印
    
    const defaultOptions = {
      content: '请勿外传',
      font: 'Arial, sans-serif',
      size: 16,
      color: '#000',
      opacity: 0.15,
      angle: -15,
      density: 2
    };
    
    this.options = { ...defaultOptions, ...options };
    
    // 创建水印
    this.createWatermark();
    
    // 添加DOM变化监听，防止水印被删除
    this.observeDOMChanges();
  }

  /**
   * 创建水印元素
   */
  createWatermark() {
    const { content, font, size, color, opacity, angle, density } = this.options;
    
    // 创建水印容器
    const watermarkContainer = document.createElement('div');
    watermarkContainer.id = this.watermarkId;
    watermarkContainer.style.pointerEvents = 'none';
    watermarkContainer.style.position = 'fixed';
    watermarkContainer.style.top = '0';
    watermarkContainer.style.left = '0';
    watermarkContainer.style.width = '100%';
    watermarkContainer.style.height = '100%';
    watermarkContainer.style.overflow = 'hidden';
    watermarkContainer.style.zIndex = '9999';
    
    // 创建水印canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 计算canvas尺寸，考虑文字旋转后的最大宽度和高度
    const textMetrics = ctx.measureText(content);
    const textWidth = textMetrics.width;
    const textHeight = size;
    
    const angleRadians = (Math.PI / 180) * Math.abs(angle);
    const canvasWidth = (textWidth * Math.cos(angleRadians)) + (textHeight * Math.sin(angleRadians));
    const canvasHeight = (textWidth * Math.sin(angleRadians)) + (textHeight * Math.cos(angleRadians));
    
    canvas.width = canvasWidth * density;
    canvas.height = canvasHeight * density;
    
    // 设置canvas样式
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 旋转并绘制文字
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((Math.PI / 180) * angle);
    ctx.fillText(content, 0, 0);
    
    // 将canvas转换为背景图片
    const base64Url = canvas.toDataURL();
    
    // 设置水印样式
    watermarkContainer.style.backgroundImage = `url(${base64Url})`;
    watermarkContainer.style.backgroundRepeat = 'repeat';
    watermarkContainer.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
    
    // 添加到文档
    document.body.appendChild(watermarkContainer);
  }

  /**
   * 移除水印
   */
  remove() {
    const watermark = document.getElementById(this.watermarkId);
    if (watermark) {
      document.body.removeChild(watermark);
    }
    
    // 停止监听
    this.stopObserving();
  }

  /**
   * 监听DOM变化，防止水印被移除
   */
  observeDOMChanges() {
    this.stopObserving();
    
    const observerConfig = {
      childList: true,
      subtree: true
    };
    
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.removedNodes.length) {
          for (let i = 0; i < mutation.removedNodes.length; i++) {
            const removedNode = mutation.removedNodes[i];
            if (removedNode.id === this.watermarkId) {
              // 水印被移除，重新创建
              setTimeout(() => this.createWatermark(), 0);
              break;
            }
          }
        }
      });
    });
    
    this.observer.observe(document.body, observerConfig);
  }

  /**
   * 停止监听DOM变化
   */
  stopObserving() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// 导出单例对象
export default new Watermark();    