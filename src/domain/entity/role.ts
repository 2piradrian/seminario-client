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
            new Role("USER", "User"),
            new Role("MODERATOR", "Moderador"),
            new Role("ADMIN", "Administrador"),
        ];
    }

    public static getStaffRoles(): Role[] {
        return [
            new Role("MODERATOR", "Moderador"),
            new Role("ADMIN", "Administrador"),
        ]; 
    }

    public static fromObject(object: { [key: string]: any }): Role {
        return new Role(object.id, object.name);
    }
}
