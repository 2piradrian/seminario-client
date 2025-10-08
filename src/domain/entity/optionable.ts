export class Optionable {

    constructor(
        public id: string,
        public name: string
    ){}

    public static fromObject(object: {[key: string]: any}): Optionable {
        return new Optionable(
            object.id,
            object.name
        )
    };
    
    // --> Methods <-- //

    public static mapToOptionable(selected: string[], catalog: Optionable[]): Optionable[] {
        return selected
            .map(name => catalog.find(item => item.name === name))
            .filter((item): item is Optionable => item !== undefined);
    };

    public static toOptionable(selected: string, catalog: Optionable[]){
        return catalog.find(item => item.name === selected);
    }

    public static mapToNames(selectedOptions: Optionable[]): string[] {
        return selectedOptions.map(option => option.name);
    }



}