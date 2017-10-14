import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import TriggerComponent from '../components/trigger';
import Entity from '../misc/entity';
import { Colours, EntityType } from '../misc/enum';

export default class InputTrigger extends Entity {

    constructor(options: Matter.IBodyDefinition) {

        super();

        let colourManager = ColourManager.Instance();

        let display = new DisplayComponent(Matter.Common.extend(options, {
            label: EntityType.TRIGGER1.toString(),
            isStatic: true,
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 16 },
                { x: 16, y: 16 },
                { x: 16, y: 0 }
            ],
            render: {
                fillStyle: colourManager.getColourByEnum(Colours.smokeyash).rgb
            }
        }));

        display.body.onCollide((pair: Matter.IPair) => {

            if (pair.bodyB.label === EntityType.PLAYER1.toString()) {

                trigger.nextLevel = true;
                console.log('test');
            }
        });

        let input = new InputComponent({
            onUp: () => {
                trigger.nextLevel = true;
            }
        });

        let trigger = new TriggerComponent();

        this.addComponents(display, trigger, input);
    }
}