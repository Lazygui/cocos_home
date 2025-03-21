/**
 * 为当前节点添加鼠标移入样式
 */

import { _decorator, Component, EventMouse, NodeEventType } from "cc";
const { ccclass, property } = _decorator;

@ccclass("curser")
export class curser extends Component {
       start() {
              this.node.on(
                     NodeEventType.MOUSE_ENTER,
                     (event: EventMouse) => {
                            document.body.style.cursor = "pointer";
                     },
                     this
              );
              this.node.on(
                     NodeEventType.MOUSE_LEAVE,
                     (event: EventMouse) => {
                            document.body.style.cursor = "default";
                     },
                     this
              );
       }

       update(deltaTime: number) {}
}
