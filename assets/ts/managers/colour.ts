import settings from '../misc/settings';
import { Colours } from '../misc/enum';

let instance = null;

export default class ColourManager {

    private static _instance: ColourManager;

    _colours: any[];

    private constructor() {

        this._colours = [
            {"id": "black", "name": "Black", "r": 0, "g": 0, "b": 0, "rgb": "rgb(0, 0, 0)", "html": "#ff0000" },
            {"id": "valhalla", "name": "Valhalla", "r": 34, "g": 32, "b": 52, "rgb": "rgb(34, 32, 52)", "html": "#ff2220" },
            {"id": "loulou", "name": "Loulou", "r": 69, "g": 40, "b": 60, "rgb": "rgb(69, 40, 60)", "html": "#ff4528" },
            {"id": "oiledcedar", "name": "Oiled cedar", "r": 102, "g": 57, "b": 49, "rgb": "rgb(102, 57, 49)", "html": "#ff6639" },
            {"id": "rope", "name": "Rope", "r": 143, "g": 86, "b": 59, "rgb": "rgb(143, 86, 59)", "html": "#ff8f56" },
            {"id": "tahitigold", "name": "Tahiti gold", "r": 223, "g": 113, "b": 38, "rgb": "rgb(223, 113, 38)", "html": "#ffdf71" },
            {"id": "twine", "name": "Twine", "r": 217, "g": 160, "b": 102, "rgb": "rgb(217, 160, 102)", "html": "#ffd9a0" },
            {"id": "pancho", "name": "Pancho", "r": 238, "g": 195, "b": 154, "rgb": "rgb(238, 195, 154)", "html": "#ffeec3" },

            {"id": "goldenfizz", "name": "Golden fizz", "r": 251, "g": 242, "b": 54, "rgb": "rgb(251, 242, 54)", "html": "#fffbf2" },
            {"id": "atlantis", "name": "Atlantis", "r": 153, "g": 229, "b": 80, "rgb": "rgb(153, 229, 80)", "html": "#ff99e5" },
            {"id": "christi", "name": "Christi", "r": 106, "g": 190, "b": 48, "rgb": "rgb(106, 190, 48)", "html": "#ff6abe" },
            {"id": "elfgreen", "name": "Elf green", "r": 55, "g": 148, "b": 110, "rgb": "rgb(55, 148, 110)", "html": "#ff3794" },
            {"id": "dell", "name": "Dell", "r": 75, "g": 105, "b": 47, "rgb": "rgb(75, 105, 47)", "html": "#ff4b69" },
            {"id": "verdigris", "name": "Verdigris", "r": 82, "g": 75, "b": 36, "rgb": "rgb(82, 75, 36)", "html": "#ff524b" },
            {"id": "opal", "name": "Opal", "r": 50, "g": 60, "b": 57, "rgb": "rgb(50, 60, 57)", "html": "#ff323c" },
            {"id": "deepkoamaru", "name": "Deep koamaru", "r": 63, "g": 63, "b": 116, "rgb": "rgb(63, 63, 116)", "html": "#ff3f3f" },

            {"id": "veniceblue", "name": "Venice blue", "r": 48, "g": 96, "b": 130, "rgb": "rgb(48, 96, 130)", "html": "#ff3060" },
            {"id": "royalblue", "name": "Royal blue", "r": 91, "g": 110, "b": 225, "rgb": "rgb(91, 110, 225)", "html": "#ff5b6e" },
            {"id": "cornflower", "name": "Cornflower", "r": 99, "g": 155, "b": 255, "rgb": "rgb(99, 155, 255)", "html": "#ff639b" },
            {"id": "viking", "name": "Viking", "r": 95, "g": 205, "b": 228, "rgb": "rgb(95, 205, 228)", "html": "#ff5fcd" },
            {"id": "lightsteelblue", "name": "Light steel blue", "r": 203, "g": 219, "b": 252, "rgb": "rgb(203, 219, 252)", "html": "#ffcbdb" },
            {"id": "white", "name": "White", "r": 255, "g": 255, "b": 255, "rgb": "rgb(255, 255, 255)", "html": "#ffffff" },
            {"id": "heather", "name": "Heather", "r": 155, "g": 173, "b": 183, "rgb": "rgb(155, 173, 183)", "html": "#ff9bad" },
            {"id": "topaz", "name": "Topaz", "r": 132, "g": 126, "b": 135, "rgb": "rgb(132, 126, 135)", "html": "#ff847e" },

            {"id": "dimgray", "name": "Dim gray", "r": 105, "g": 106, "b": 106, "rgb": "rgb(105, 106, 106)", "html": "#ff696a" },
            {"id": "smokeyash", "name": "Smokey ash", "r": 89, "g": 86, "b": 82, "rgb": "rgb(89, 86, 82)", "html": "#ff5956" },
            {"id": "clairvoyant", "name": "Clairvoyant", "r": 118, "g": 66, "b": 138, "rgb": "rgb(118, 66, 138)", "html": "#ff7642" },
            {"id": "brown", "name": "Brown", "r": 172, "g": 50, "b": 50, "rgb": "rgb(172, 50, 50)", "html": "#ffac32" },
            {"id": "mandy", "name": "Mandy", "r": 217, "g": 87, "b": 99, "rgb": "rgb(217, 87, 99)", "html": "#ffd957" },
            {"id": "plum", "name": "Plum", "r": 215, "g": 123, "b": 186, "rgb": "rgb(215, 123, 186)", "html": "#ffd77b" },
            {"id": "rainforest", "name": "Rain forest", "r": 143, "g": 151, "b": 74, "rgb": "rgb(143, 151, 74)", "html": "#ff8f97" },
            {"id": "stinger", "name": "Stinger", "r": 138, "g": 111, "b": 48, "rgb": "rgb(138, 111, 48)", "html": "#ff8a6f" },
        ];
    }

    static Instance()
    {
        return this._instance || (this._instance = new this());
    }

    getColourById(id: string) {
        return this._colours.find((colour: any) => {
            return colour.id === id;
        });
    }

    getColourByEnum(val: Colours) {
        return this.getColourById(Colours[val]);
    }
}