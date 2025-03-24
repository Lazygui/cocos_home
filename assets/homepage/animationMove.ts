import { _decorator, Component, Node, NodeEventType, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

enum MenuState {
       Brief,
       Works,
       Article,
       Contact,
       None
}

@ccclass("AnimationMove")
export class AnimationMove extends Component {
       @property({ type: [Node], tooltip: "动画节点组" })
       illustration: Node[] = [];

       @property({ tooltip: "动画持续时间（秒）" })
       animDuration: number = 0.5;

       @property({ tooltip: "节点间动画延迟（秒）" })
       nodeDelay: number = 0.1;

       @property({ type: [Number], tooltip: "各状态Y轴位置[简介, 作品, 文章, 联系]" })
       stateYPositions: number[] = [0, 1000, 2000, 3000];

       private actionFlag: boolean = true;
       private currentState: MenuState = MenuState.None;
       private targetPos: Vec3 = new Vec3();

       onLoad() {
              const stateConfigs = [
                     { nodeName: "brief_1", state: MenuState.Brief },
                     { nodeName: "works_1", state: MenuState.Works },
                     { nodeName: "article_1", state: MenuState.Article },
                     { nodeName: "contact_1", state: MenuState.Contact }
              ];

              stateConfigs.forEach(({ nodeName, state }) => {
                     const node = this.node.getChildByName(nodeName);
                     node?.on(NodeEventType.MOUSE_ENTER, () => {
                            this.currentState = state;
                            this.tryPlayAnimation();
                     });
              });
       }

       private tryPlayAnimation() {
              if (this.actionFlag) {
                     this.playAnimation();
              }
       }

       private playAnimation() {
              if (this.currentState === MenuState.None || this.currentState >= this.stateYPositions.length) return;

              this.actionFlag = false;
              const y = this.stateYPositions[this.currentState];
              this.targetPos.set(0, y, 0);

              this.illustration.forEach((node, index) => {
                     const currentTween = tween(node)
                            .delay(index * this.nodeDelay)
                            .to(this.animDuration, { position: this.targetPos }, { easing: "quadInOut" });

                     if (index === this.illustration.length - 1) {
                            currentTween.call(() => {
                                   this.actionFlag = true;
                                   this.tryPlayAnimation(); // 检查是否有新的状态变化
                            });
                     }

                     currentTween.start();
              });
       }
}
