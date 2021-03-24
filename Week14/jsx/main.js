import { Component, createElement } from './framework.js';
class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        console.log(this.attributes)
        const src = this.attributes.src
        this.root = document.createElement('div');
        this.root.className = "carsousel";
        let colors = ['red', 'blue', 'green', 'yellow']

        for(let record of src) {
            let child  = document.createElement('div');
            child.innerText = record;
            child.style.backgroundColor = colors[record];
            this.root.appendChild(child);
        }
        let position = 0;
        this.root.addEventListener('mousedown', (event) => {
            const children = this.root.children;
            let startX = event.clientX;

            let move = event => {
                const moveX = event.clientX - startX;
                for (let offset of [-1, 0, 1]) {
                    // 当前位置child
                    const currentChildPos = (offset + children.length + position) % children.length
                    children[currentChildPos].style.transition = 'none'
                    // 当前位置 child 需要移动的距离 可见位置 pos决定是上一个还是下一个
                    const currentTranslateX = -currentChildPos * 400 + offset * 400
                    children[currentChildPos].style.transform = `translateX(${ currentTranslateX + moveX }px)`
                }
            }
            let up = event => {
                const moveX = event.clientX - startX;
                // 移动了这么多个位置
                const movePosition = Math.round(moveX / 400)
                // 向左移动 movePosition为负数，要移动的是右边的 所以要取反
                for (let offset of [0, -movePosition]) {
                    // 当前位置child
                    const currentChildPos = (offset + children.length + position) % children.length
                    children[currentChildPos].style.transition = ''
                    // 当前位置 child 需要移动的距离 可见位置 pos决定是上一个还是下一个
                    const currentTranslateX = -currentChildPos * 400 + offset * 400
                    children[currentChildPos].style.transform = `translateX(${ currentTranslateX + movePosition * 400 }px)`
                }
                // 设置当前位置
                position = position - movePosition
                document.removeEventListener('mouseup', up)
                document.removeEventListener('mousemove', move)
            }
            document.addEventListener('mouseup', up)
            document.addEventListener('mousemove', move)
        })

        // let currentIndex = 0;
        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex + 1) % children.length;
        //     // 当前chuldren是可见位置
        //     const currentChild = children[currentIndex];
        //     const nextChild = children[nextIndex];

        //     nextChild.style.transition = 'none';
        //     // 放到第二个位置 计算对于每个child的第二个位置的 translateX， 第二个位置在可见位置的100%left上，每个child要到位置二上，就要先向左移动 （nextIndex * 100 到达可见位置） 再向右移动 100
        //     // 向左移动 nextindex * 100 ， 向右移动 100
        //     nextChild.style.transform = `translateX(${- nextIndex * 100 + 100}%)`

        //     setTimeout(() => {
        //         nextChild.style.transition = '';
        //         // 当前可见的child要移动到左边一位， -1 的位置，
        //         // 先向移动到可见位置，再向左移动100 
        //         currentChild.style.transform = `translateX(${- currentIndex * 100 - 100}%)`;
        //         // 直接移动到可见位置
        //         nextChild.style.transform = `translateX(${- nextIndex * 100}%)`;

        //         currentIndex = nextIndex;
        //         // 一帧16毫秒
        //     }, 16)
        // }, 3000)
        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

const d = [
 0, 1, 2, 3
]

let a = <Carousel src={d} />
a.mountTo(document.body)