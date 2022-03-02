export default {
    mounted() {
        document.onkeydown = (e) => {
            // window.event.preventDefault()
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
        }
    },
    methods: {
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
    },
}