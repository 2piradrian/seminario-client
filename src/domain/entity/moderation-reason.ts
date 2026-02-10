import { Optionable } from "./optionable";

export class ModerationReason extends Optionable {

    constructor(
        public override id: string,
        public override name: string
    ) {
        super(id, name);
    } 
        public static fromObject(object: { [key: string]: any }): ModerationReason {
        if (!object) return null;

        return new ModerationReason(
            object.id, 
            object.name
        );
    }
}