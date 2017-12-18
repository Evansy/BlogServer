/**
 * 全局设置
 */
let debug = process.env.NODE_ENV === 'development';
// url base
export const apiUrl = debug ? 'http://localhost:8888' : 'https://api.iskcy.com';
