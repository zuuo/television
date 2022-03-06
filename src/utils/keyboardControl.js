export default {
    data() {
        return {}
    },
    mounted() {
        document.addEventListener("keydown", this.onkeydown)
    },
    methods: {
        onkeydown(e) {
            window.event.preventDefault()
            switch (e.keyCode) {
                case 37:
                    this.keyLeft()
                    break;
                case 38:
                    this.keyUp()
                    break;
                case 39:
                    this.keyRight()
                    break;
                case 40:
                    this.keyDown()
                    break;
                case 13:
                    this.keyEnter()
                    break;
                case 27:
                    this.keyBack()
                    break;

                default:
                    break;
            }
        },
        keyLeft() {
            console.log('keyLeft')
        },
        keyUp() {
            console.log('keyUp')
        },
        keyRight() {
            console.log('keyRight')
        },
        keyDown() {
            console.log('keyDown')
        },
        keyEnter() {
            console.log('keyEnter')
        },
        keyBack() {
            console.log('keyBack')
        },
        skip(originSize, targetSize, originIndex) {
            let targetIndex = 0;
            let originSizeMid = originSize / 2;

            targetIndex = (targetSize / originSize) * originIndex;
            if (originSizeMid <= originIndex) {
                targetIndex = Math.ceil(targetIndex);
            } else {
                targetIndex = Math.floor(targetIndex);
            }

            if (targetIndex < 0) {
                targetIndex = 0;
            } else if (targetIndex > targetSize - 1) {
                targetIndex = targetSize - 1;
            }

            return targetIndex;
        },
    },
}