import { Optionable } from "./optionable";

export class Role extends Optionable {

    constructor(
        public override id: string,
        public override name: string
    ) {
        super(id, name);
    }

    // --> Methods <-- //

    public static getRoleList(): Role[] {
        return [
            new Role("USER", "USER"),
            new Role("MODERATOR", "MODERATOR"),
            new Role("ADMIN", "ADMIN"),
        ];
    }

    public static fromObject(object: { [key: string]: any }): Role {
        return new Role(object.id, object.name);
    }
}
