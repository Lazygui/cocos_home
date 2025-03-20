import { _decorator, Component, EventMouse, NodeEventType } from "cc";
const { ccclass, property } = _decorator;

@ccclass("angle")
export class angle extends Component {
       private move = {
              textNode: 0.08,
              iconNode: 0.05,
              bgNode: 0.02
       };
       start() {
              const parent = this.node.parent;
              parent.on(NodeEventType.MOUSE_MOVE, (event: EventMouse) => {
                     const mouseDeltaX = event.getDeltaX();
                     const mouseDeltaY = event.getDeltaY();
                     const right = event.target._children.filter((item: any): boolean => item._name === "right")[0];
                     if (right) {
                            const moveChildren = right._children.filter((item: any): boolean => item._name.includes("Node"));
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
