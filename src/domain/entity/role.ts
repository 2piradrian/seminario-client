import { Optionable } from "./optionable";

export class Role extends Optionable {

    static readonly USER = "USER";
    static readonly MODERATOR = "MODERATOR";
    static readonly ADMIN = "ADMIN";

    constructor(
        public override id: string,
        public override name: string
    ) {
        super(id, name);
    }

    public static getRoleList(): Role[] {
        return [
            new Role(Role.USER, "User"),
            new Role(Role.MODERATOR, "Moderador"),
            new Role(Role.ADMIN, "Administrador"),
        ];
    }

    public static getStaffRoles(): Role[] {
        return Role.getRoleList().filter(r => r.id !== Role.USER);
    }

    public static fromObject(object: { [key: string]: any }): Role {
        return new Role(object.id, object.name);
    }

}
