import { Optionable } from "./optionable";

export class EventStatus extends Optionable {

    static readonly UPCOMING = "UPCOMING";
    static readonly IN_PROGRESS = "IN_PROGRESS";
    static readonly ENDED = "ENDED";
    static readonly CANCELLED = "CANCELLED";
    static readonly DELETED = "DELETED";

    constructor(
        public override id: string,
        public override name: string
    ) {
        super(id, name);
    }

    public static getEventStatusList(): EventStatus[] {
        return [
            new EventStatus(EventStatus.UPCOMING, "PRÓXIMAMENTE"),
            new EventStatus(EventStatus.IN_PROGRESS, "EN CURSO"),
            new EventStatus(EventStatus.ENDED, "TERMINADO"),
            new EventStatus(EventStatus.CANCELLED, "CANCELADO"),
            new EventStatus(EventStatus.DELETED, "DELETED")
        ];
    }

    public static getName(id: string): string {
        return (
            this.getEventStatusList().find(e => e.id === id)?.name ??
            id 
        );
    }

    public static fromObject(object: { [key: string]: any }): EventStatus {
        return new EventStatus(object.id, object.name);
    }

}
