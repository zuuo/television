module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
            viewportWidth: 1920, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore', '.usePx', 'el-', '::-webkit-scrollbar'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false // 允许在媒体查询中转换`px`
        }
    }
}