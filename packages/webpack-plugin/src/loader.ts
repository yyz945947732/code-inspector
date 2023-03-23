import { enhanceVueCode, normalizePath } from 'code-inspector-core';
import path from 'path';

/**
 * @description inject line、column and path to VNode when webpack compiling .vue file
 * @type webpack.loader.Loader
 */
function WebpackCodeInspectorLoader(
  this: any,
  content: string,
  map: string,
  cb: any
) {
  const completePath = normalizePath(this.resourcePath); // 当前文件的绝对路径
  const root = normalizePath(this.rootContext ?? this.options.context ?? '');
  const filePath = normalizePath(path.relative(root, completePath));
  let params = new URLSearchParams(this.resource);
  if (params.get('type') !== 'style') {
    return enhanceVueCode(content, filePath);
  } else {
    return content;
  }
}

export = WebpackCodeInspectorLoader;
