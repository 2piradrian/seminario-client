export class Optionable {

    constructor(
        public id: string,
        public name: string
    ){}

    public static fromObject(object: {id: string, name: string}): Optionable {
        return new Optionable(
            object.id,
            object.name
        )
    };

    mapToOptionable(selectedNames: string[], catalog: Optionable[]): Optionable[] {
        return selectedNames
            .map(name => catalog.find(item => item.name === name))
            .filter((item): item is Optionable => item !== undefined);
    };
}