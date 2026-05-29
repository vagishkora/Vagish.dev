module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/Ribbons.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Renderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Transform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/math/Vec3.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/math/Color.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Polyline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/extras/Polyline.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Ribbons = ({ colors = [
    '#00ffff',
    '#ff00ff',
    '#8a2be2'
], baseSpring = 0.03, baseFriction = 0.9, baseThickness = 30, offsetFactor = 0.05, maxAge = 500, pointCount = 50, speedMultiplier = 0.6, enableFade = true, enableShaderEffect = true, effectAmplitude = 2, backgroundColor = [
    0,
    0,
    0,
    0
] })=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = containerRef.current;
        if (!container) return;
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Renderer"]({
            dpr: window.devicePixelRatio || 2,
            alpha: true
        });
        const gl = renderer.gl;
        if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
            gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
        } else {
            gl.clearColor(0, 0, 0, 0);
        }
        gl.canvas.style.position = 'absolute';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        container.appendChild(gl.canvas);
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Transform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transform"]();
        const lines = [];
        const vertex = `
      precision highp float;
      
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
          }
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `;
        const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fadeFactor = 1.0;
          if(uEnableFade > 0.5) {
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;
        function resize() {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            lines.forEach((line)=>line.polyline.resize());
        }
        window.addEventListener('resize', resize);
        const center = (colors.length - 1) / 2;
        colors.forEach((color, index)=>{
            const spring = baseSpring + (Math.random() - 0.5) * 0.05;
            const friction = baseFriction + (Math.random() - 0.5) * 0.05;
            const thickness = baseThickness + (Math.random() - 0.5) * 3;
            const mouseOffset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec3"]((index - center) * offsetFactor + (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.1, 0);
            const line = {
                spring,
                friction,
                mouseVelocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec3"](),
                mouseOffset
            };
            const count = pointCount;
            const points = [];
            for(let i = 0; i < count; i++){
                points.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec3"]());
            }
            line.points = points;
            line.polyline = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Polyline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polyline"](gl, {
                points,
                vertex,
                fragment,
                uniforms: {
                    uColor: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Color$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](color)
                    },
                    uThickness: {
                        value: thickness
                    },
                    uOpacity: {
                        value: 1.0
                    },
                    uTime: {
                        value: 0.0
                    },
                    uEnableShaderEffect: {
                        value: enableShaderEffect ? 1.0 : 0.0
                    },
                    uEffectAmplitude: {
                        value: effectAmplitude
                    },
                    uEnableFade: {
                        value: enableFade ? 1.0 : 0.0
                    }
                }
            });
            line.polyline.mesh.setParent(scene);
            lines.push(line);
        });
        resize();
        const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec3"]();
        function updateMouse(e) {
            let x, y;
            const rect = container.getBoundingClientRect();
            if (e.changedTouches && e.changedTouches.length) {
                x = e.changedTouches[0].clientX - rect.left;
                y = e.changedTouches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;
            mouse.set(x / width * 2 - 1, y / height * -2 + 1, 0);
        }
        // Bind to window so it tracks correctly anywhere
        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('touchstart', updateMouse);
        window.addEventListener('touchmove', updateMouse);
        const tmp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vec3"]();
        let frameId;
        let lastTime = performance.now();
        function update() {
            frameId = requestAnimationFrame(update);
            const currentTime = performance.now();
            const dt = currentTime - lastTime;
            lastTime = currentTime;
            lines.forEach((line)=>{
                tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
                line.mouseVelocity.add(tmp).multiply(line.friction);
                line.points[0].add(line.mouseVelocity);
                for(let i = 1; i < line.points.length; i++){
                    if (isFinite(maxAge) && maxAge > 0) {
                        const segmentDelay = maxAge / (line.points.length - 1);
                        const alpha = Math.min(1, dt * speedMultiplier / segmentDelay);
                        line.points[i].lerp(line.points[i - 1], alpha);
                    } else {
                        line.points[i].lerp(line.points[i - 1], 0.9);
                    }
                }
                if (line.polyline.mesh.program.uniforms.uTime) {
                    line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;
                }
                line.polyline.updateGeometry();
            });
            renderer.render({
                scene
            });
        }
        update();
        return ()=>{
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', updateMouse);
            window.removeEventListener('touchstart', updateMouse);
            window.removeEventListener('touchmove', updateMouse);
            cancelAnimationFrame(frameId);
            if (gl.canvas && gl.canvas.parentNode === container) {
                container.removeChild(gl.canvas);
            }
        };
    }, [
        colors,
        baseSpring,
        baseFriction,
        baseThickness,
        offsetFactor,
        maxAge,
        pointCount,
        speedMultiplier,
        enableFade,
        enableShaderEffect,
        effectAmplitude,
        backgroundColor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "ribbons-container"
    }, void 0, false, {
        fileName: "[project]/src/components/Ribbons.jsx",
        lineNumber: 236,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Ribbons;
}),
"[project]/src/components/CustomCursor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Ribbons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Ribbons.jsx [app-ssr] (ecmascript)");
"use client";
;
;
function CustomCursor() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Ribbons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            colors: [
                '#00ffff',
                '#ff00ff',
                '#8a2be2'
            ]
        }, void 0, false, {
            fileName: "[project]/src/components/CustomCursor.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
}),
"[project]/src/components/FuzzyText.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const FuzzyText = ({ children, fontSize = 'clamp(2rem, 10vw, 10rem)', fontWeight = 900, fontFamily = 'inherit', color = '#fff', enableHover = true, baseIntensity = 0.18, hoverIntensity = 0.5, fuzzRange = 30, fps = 60, direction = 'horizontal', transitionDuration = 0, clickEffect = false, glitchMode = false, glitchInterval = 2000, glitchDuration = 200, gradient = null, letterSpacing = 0, className = '' })=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let animationFrameId;
        let isCancelled = false;
        let glitchTimeoutId;
        let glitchEndTimeoutId;
        let clickTimeoutId;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const init = async ()=>{
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const computedFontFamily = fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;
            const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
            const fontString = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            try {
                await document.fonts.load(fontString);
            } catch  {
                await document.fonts.ready;
            }
            if (isCancelled) return;
            let numericFontSize;
            if (typeof fontSize === 'number') {
                numericFontSize = fontSize;
            } else {
                const temp = document.createElement('span');
                temp.style.fontSize = fontSize;
                document.body.appendChild(temp);
                const computedSize = window.getComputedStyle(temp).fontSize;
                numericFontSize = parseFloat(computedSize);
                document.body.removeChild(temp);
            }
            const text = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Children.toArray(children).join('');
            const offscreen = document.createElement('canvas');
            const offCtx = offscreen.getContext('2d');
            if (!offCtx) return;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = 'alphabetic';
            let totalWidth = 0;
            if (letterSpacing !== 0) {
                for (const char of text){
                    totalWidth += offCtx.measureText(char).width + letterSpacing;
                }
                totalWidth -= letterSpacing;
            } else {
                totalWidth = offCtx.measureText(text).width;
            }
            const metrics = offCtx.measureText(text);
            const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
            const actualRight = letterSpacing !== 0 ? totalWidth : metrics.actualBoundingBoxRight ?? metrics.width;
            const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
            const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;
            const textBoundingWidth = Math.ceil(letterSpacing !== 0 ? totalWidth : actualLeft + actualRight);
            const tightHeight = Math.ceil(actualAscent + actualDescent);
            const extraWidthBuffer = 10;
            const offscreenWidth = textBoundingWidth + extraWidthBuffer;
            offscreen.width = offscreenWidth;
            offscreen.height = tightHeight;
            const xOffset = extraWidthBuffer / 2;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = 'alphabetic';
            if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
                const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0);
                gradient.forEach((c, i)=>grad.addColorStop(i / (gradient.length - 1), c));
                offCtx.fillStyle = grad;
            } else {
                offCtx.fillStyle = color;
            }
            if (letterSpacing !== 0) {
                let xPos = xOffset;
                for (const char of text){
                    offCtx.fillText(char, xPos, actualAscent);
                    xPos += offCtx.measureText(char).width + letterSpacing;
                }
            } else {
                offCtx.fillText(text, xOffset - actualLeft, actualAscent);
            }
            const horizontalMargin = fuzzRange + 20;
            const verticalMargin = 0;
            canvas.width = offscreenWidth + horizontalMargin * 2;
            canvas.height = tightHeight + verticalMargin * 2;
            ctx.translate(horizontalMargin, verticalMargin);
            const interactiveLeft = horizontalMargin + xOffset;
            const interactiveTop = verticalMargin;
            const interactiveRight = interactiveLeft + textBoundingWidth;
            const interactiveBottom = interactiveTop + tightHeight;
            let isHovering = false;
            let isClicking = false;
            let isGlitching = false;
            let currentIntensity = baseIntensity;
            let targetIntensity = baseIntensity;
            let lastFrameTime = 0;
            const frameDuration = 1000 / fps;
            const startGlitchLoop = ()=>{
                if (!glitchMode || isCancelled) return;
                glitchTimeoutId = setTimeout(()=>{
                    if (isCancelled) return;
                    isGlitching = true;
                    glitchEndTimeoutId = setTimeout(()=>{
                        isGlitching = false;
                        startGlitchLoop();
                    }, glitchDuration);
                }, glitchInterval);
            };
            if (glitchMode) startGlitchLoop();
            const run = (timestamp)=>{
                if (isCancelled) return;
                if (timestamp - lastFrameTime < frameDuration) {
                    animationFrameId = window.requestAnimationFrame(run);
                    return;
                }
                lastFrameTime = timestamp;
                ctx.clearRect(-fuzzRange - 20, -fuzzRange - 10, offscreenWidth + 2 * (fuzzRange + 20), tightHeight + 2 * (fuzzRange + 10));
                if (isClicking) {
                    targetIntensity = 1;
                } else if (isGlitching) {
                    targetIntensity = 1;
                } else if (isHovering) {
                    targetIntensity = hoverIntensity;
                } else {
                    targetIntensity = baseIntensity;
                }
                if (transitionDuration > 0) {
                    const step = 1 / (transitionDuration / frameDuration);
                    if (currentIntensity < targetIntensity) {
                        currentIntensity = Math.min(currentIntensity + step, targetIntensity);
                    } else if (currentIntensity > targetIntensity) {
                        currentIntensity = Math.max(currentIntensity - step, targetIntensity);
                    }
                } else {
                    currentIntensity = targetIntensity;
                }
                if (direction === 'horizontal') {
                    for(let j = 0; j < tightHeight; j++){
                        const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
                        ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
                    }
                } else if (direction === 'vertical') {
                    for(let i = 0; i < offscreenWidth; i++){
                        const dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
                        ctx.drawImage(offscreen, i, 0, 1, tightHeight, i, dy, 1, tightHeight);
                    }
                } else {
                    for(let j = 0; j < tightHeight; j++){
                        const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
                        ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
                    }
                    const tempData = ctx.getImageData(0, 0, offscreenWidth + fuzzRange, tightHeight + fuzzRange);
                    ctx.clearRect(-fuzzRange - 20, -fuzzRange - 10, offscreenWidth + 2 * (fuzzRange + 20), tightHeight + 2 * (fuzzRange + 10));
                    ctx.putImageData(tempData, 0, 0);
                    for(let i = 0; i < offscreenWidth + fuzzRange; i++){
                        const dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5);
                        const colData = ctx.getImageData(i, 0, 1, tightHeight + fuzzRange);
                        ctx.clearRect(i, -fuzzRange, 1, tightHeight + 2 * fuzzRange);
                        ctx.putImageData(colData, i, dy);
                    }
                }
                animationFrameId = window.requestAnimationFrame(run);
            };
            animationFrameId = window.requestAnimationFrame(run);
            const isInsideTextArea = (x, y)=>{
                return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;
            };
            const handleMouseMove = (e)=>{
                if (!enableHover) return;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };
            const handleMouseLeave = ()=>{
                isHovering = false;
            };
            const handleClick = ()=>{
                if (!clickEffect) return;
                isClicking = true;
                clearTimeout(clickTimeoutId);
                clickTimeoutId = setTimeout(()=>{
                    isClicking = false;
                }, 150);
            };
            const handleTouchMove = (e)=>{
                if (!enableHover) return;
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };
            const handleTouchEnd = ()=>{
                isHovering = false;
            };
            if (enableHover) {
                canvas.addEventListener('mousemove', handleMouseMove);
                canvas.addEventListener('mouseleave', handleMouseLeave);
                canvas.addEventListener('touchmove', handleTouchMove, {
                    passive: false
                });
                canvas.addEventListener('touchend', handleTouchEnd);
            }
            if (clickEffect) {
                canvas.addEventListener('click', handleClick);
            }
            const cleanup = ()=>{
                window.cancelAnimationFrame(animationFrameId);
                clearTimeout(glitchTimeoutId);
                clearTimeout(glitchEndTimeoutId);
                clearTimeout(clickTimeoutId);
                if (enableHover) {
                    canvas.removeEventListener('mousemove', handleMouseMove);
                    canvas.removeEventListener('mouseleave', handleMouseLeave);
                    canvas.removeEventListener('touchmove', handleTouchMove);
                    canvas.removeEventListener('touchend', handleTouchEnd);
                }
                if (clickEffect) {
                    canvas.removeEventListener('click', handleClick);
                }
            };
            canvas.cleanupFuzzyText = cleanup;
        };
        init();
        return ()=>{
            isCancelled = true;
            window.cancelAnimationFrame(animationFrameId);
            clearTimeout(glitchTimeoutId);
            clearTimeout(glitchEndTimeoutId);
            clearTimeout(clickTimeoutId);
            if (canvas && canvas.cleanupFuzzyText) {
                canvas.cleanupFuzzyText();
            }
        };
    }, [
        children,
        fontSize,
        fontWeight,
        fontFamily,
        color,
        enableHover,
        baseIntensity,
        hoverIntensity,
        fuzzRange,
        fps,
        direction,
        transitionDuration,
        clickEffect,
        glitchMode,
        glitchInterval,
        glitchDuration,
        gradient,
        letterSpacing
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: className
    }, void 0, false, {
        fileName: "[project]/src/components/FuzzyText.jsx",
        lineNumber: 329,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = FuzzyText;
}),
"[project]/src/components/NetworkStatus.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NetworkStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FuzzyText$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FuzzyText.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function NetworkStatus() {
    const [isOffline, setIsOffline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check initial status
        if (typeof navigator !== "undefined" && !navigator.onLine) {
            setIsOffline(true);
        }
        const handleOnline = ()=>setIsOffline(false);
        const handleOffline = ()=>setIsOffline(true);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return ()=>{
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    if (!isOffline) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/components/NetworkStatus.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FuzzyText$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        color: "#06b6d4",
                        baseIntensity: 0.2,
                        hoverIntensity: 0.8,
                        glitchMode: true,
                        glitchInterval: 1500,
                        glitchDuration: 300,
                        className: "mx-auto",
                        children: "OFFLINE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NetworkStatus.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-cyan-500 font-mono mt-8 text-sm md:text-base tracking-[0.2em] uppercase animate-pulse",
                        children: "Connection Terminated"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NetworkStatus.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 font-mono mt-2 text-xs md:text-sm tracking-widest max-w-md mx-auto",
                        children: "System is attempting to reconnect to the mainframe. Please check your network connection to restore access."
                    }, void 0, false, {
                        fileName: "[project]/src/components/NetworkStatus.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NetworkStatus.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NetworkStatus.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b9ecb26._.js.map