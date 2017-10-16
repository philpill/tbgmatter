import settings from '../misc/settings';
import * as Matter from 'matter-js';
import ColourManager from '../managers/colour';
import AudioManager from '../managers/audio';
import DisplayComponent from '../components/display';
import InputComponent from '../components/input';
import AudioComponent from '../components/audio';
import Entity from '../misc/entity';
import { Colours, EntityType } from '../misc/enum';

export default class Player extends Entity {

    velocityX: number;
    airVelocityX: number;
    velocityY: number;

    audioManager: AudioManager;

    constructor(options: Matter.IBodyDefinition) {

        super();

        this.hasFocus = true;
        this.velocityX = 2.5;
        this.airVelocityX = 1.2;
        this.velocityY = -5;

        let colourManager = ColourManager.Instance();
        this.audioManager = AudioManager.Instance();

        let audio = new AudioComponent({});

        let display = new DisplayComponent(Matter.Common.extend(options, {
            label: EntityType.PLAYER1.toString(),
            vertices: [
                { x: 0, y: 0 },
                { x: 0, y: 32 },
                { x: 16, y: 32 },
                { x: 16, y: 0 }
            ],
            render: {
                fillStyle: colourManager.getColourByEnum(Colours.mandy).rgb
            },
            inertia: Infinity,
            collisionFilter: {
                mask: 0x0001
            }
        }));

        let input = new InputComponent({
            onActionPrimary: () => {

                this.setVelocityY(display.body);
            },
            onUp: () => {

                this.setVelocityY(display.body);
            },
            onLeft: () => {

                this.setVelocityX(display.body, true);
            },
            onRight: () => {

                this.setVelocityX(display.body);
            },
            onReset: () => {

                let y = display.body.velocity.y;
                let friction = y === 0 ? 0.1 : 0;

                Matter.Body.set(display.body, {
                    friction: friction,
                    velocity: { x: 0, y: y }
                });
            }
        });

        this.addComponents(display, input, audio);
    }

    setVelocityX(body: Matter.Body, isReverse?: boolean) {

        let x = body.velocity.x;
        let y = body.velocity.y;

        let velocityX = isReverse ? -this.velocityX : this.velocityX;
        let airVelocityX = isReverse ? -this.airVelocityX : this.airVelocityX;

        x = y === 0 ? velocityX : airVelocityX;

        let friction = y === 0 ? 0.1 : 0;

        Matter.Body.set(body, {
            friction: friction,
            velocity: { x: x, y: y }
        });
    }

    setVelocityY(body: Matter.Body) {
        let x = body.velocity.x;
        let y = body.velocity.y;

        if (y === 0) {
            this.audioManager.play('audio-hup');
            y = -5;
        }

        let friction = y === 0 ? 0.1 : 0;

        Matter.Body.set(body, {
            friction: friction,
            velocity: { x: x, y: y }
        });
    }
}


