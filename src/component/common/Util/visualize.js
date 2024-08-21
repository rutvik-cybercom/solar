
//  import type { GeoTiff } from './solar';

 export function renderRGB(rgb, mask) {
     // https://www.w3schools.com/tags/canvas_createimagedata.asp
     const canvas = document.createElement('canvas');
     canvas.width = mask ? mask.width : rgb.width;
     canvas.height = mask ? mask.height : rgb.height;
 
     const dw = rgb.width / canvas.width;
     const dh = rgb.height / canvas.height;
 
     const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not supported');
        return null;
    }
     const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
     for (let y = 0; y < canvas.height; y++) {
         for (let x = 0; x < canvas.width; x++) {
             const imgIdx = y * canvas.width * 4 + x * 4;
             const rgbIdx = Math.floor(y * dh) * rgb.width + Math.floor(x * dw);
             const maskIdx = y * canvas.width + x;
             img.data[imgIdx + 0] = rgb.rasters[0][rgbIdx]; // Red
             img.data[imgIdx + 1] = rgb.rasters[1][rgbIdx]; // Green
             img.data[imgIdx + 2] = rgb.rasters[2][rgbIdx]; // Blue
             img.data[imgIdx + 3] = mask // Alpha
                 ? mask.rasters[0][maskIdx] * 255
                 : 255;
         }
     }
     ctx.putImageData(img, 0, 0);
     return canvas;
 }
 
 export function renderPalette({
     data,
     mask,
     colors,
     min,
     max,
     index,
 }) {
     const n = 256;
     const palette = createPalette(colors ?? ['000000', 'ffffff'], n);
     const indices = data.rasters[index ?? 0]
         .map((x) => normalize(x, max ?? 1, min ?? 0))
         .map((x) => Math.round(x * (n - 1)));
     return renderRGB(
         {
             ...data,
             rasters: [
                 indices.map((i) => palette[i].r),
                 indices.map((i) => palette[i].g),
                 indices.map((i) => palette[i].b),
             ],
         },
         mask,
     );
 }
 
 export function createPalette(hexColors, size = 256) {
     const rgb = hexColors.map(colorToRGB);
     const step = (rgb.length - 1) / (size - 1);
     return Array(size)
         .fill(0)
         .map((_, i) => {
             const index = i * step;
             const j = Math.floor(index);
             const k = Math.ceil(index);
             return {
                 r: lerp(rgb[j].r, rgb[k].r, index - j),
                 g: lerp(rgb[j].g, rgb[k].g, index - j),
                 b: lerp(rgb[j].b, rgb[k].b, index - j),
             };
         });
 }
 
 export function colorToRGB(color){
     const hex = color.startsWith('#') ? color.slice(1) : color;
     return {
         r: parseInt(hex.substring(0, 2), 16),
         g: parseInt(hex.substring(2, 4), 16),
         b: parseInt(hex.substring(4, 6), 16),
     };
 }
 
 export function rgbToColor({ r, g, b }){
     const f = (x) => {
         const hex = Math.round(x).toString(16);
         return hex.length == 1 ? `0${hex}` : hex;
     };
     return `#${f(r)}${f(g)}${f(b)}`;
 }
 
 export function normalize(x, max= 1, min = 0) {
     const y = (x - min) / (max - min);
     return clamp(y, 0, 1);
 }
 
 export function lerp(x, y, t) {
     return x + t * (y - x);
 }
 
 export function clamp(x, min, max) {
     return Math.min(Math.max(x, min), max);
 }
 