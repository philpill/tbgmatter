import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import DisplayComponent from '../components/display';
import TriggerComponent from '../components/trigger';
import InputComponent from '../components/input';
import Entity from '../misc/entity';
import { Colours, EntityType } from '../misc/enum';

export default class Boundary extends Entity {

    constructor(bodyOpts: Matter.IBodyDefinition, options?) {

        super();

        let defaults = {
            label: EntityType.BOUNDARY1.toString(),
            isStatic: true,
            vertices: bodyOpts.vertices,
            render: {
                fillStyle: 'transparent'
            }
        };

        let opts: Matter.IBodyDefinition = Object.assign(bodyOpts, defaults);

        let display = new DisplayComponent(opts);

        display.body.onCollide((pair: Matter.IPair) => {

            if (options.isLethal && pair.bodyA.label === EntityType.PLAYER1.toString()) {

                console.log('test');

                trigger.playerDeath = true;
            }
        });

        let trigger = new TriggerComponent();

        this.addComponents(display, trigger);
    }
}