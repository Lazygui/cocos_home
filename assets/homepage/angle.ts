import { _decorator, Component, EventMouse, NodeEventType } from "cc";
const { ccclass, property } = _decorator;

@ccclass("angle")
export class angle extends Component {
       //节点坐标倍数
       private move = {
              textNode: 0.08,
              iconNode: 0.05,
              bgNode: 0.02
       };
       start() {
              //监听画布节点
              this.node.on(NodeEventType.MOUSE_MOVE, (event: EventMouse) => {
                     //获取节点坐标
                     const mouseDeltaX = event.getDeltaX();
                     const mouseDeltaY = event.getDeltaY();
                     //获取需要移动节点组
                     const right = event.target._children.filter((item: any): boolean => item._name === "right")[0];
                     if (right) {
                            //获取需要移动节点组
                            const moveChildren = right._children.filter((item: any): boolean => item._name.includes("Node"));
                            //设置节点坐标
                            for (let i = 0; i < moveChildren.length; i++) {
                                   const item = moveChildren[i];
                                   const itemPosition = item.getPosition();
                                   item.setPosition(
                                          itemPosition.x + this.move[item._name] * mouseDeltaX,
                                          itemPosition.y + this.move[item._name] * mouseDeltaY
                                   );
                            }
                     }
              });
       }

       update(deltaTime: number) {}
}
