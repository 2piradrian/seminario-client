import { Optionable } from "./optionable";

export class PostType extends Optionable {

    constructor(
        public id: string, 
        public name: string
    ){
        super(id, name);
    }

    public static fromObject(object: {[key: string]: any}): PostType {
        if (!object) return null;

        return new PostType(
            object.id, 
            object.name
        )
    };

    public static toPostType(value: any, list: PostType[]): PostType {
        return list.find(p => p.toString() === value) ?? list[0];
    }

    public static mapToNames(list: PostType[]): string[] {
        return this.prioritizeGeneral(list).map(p => p.name);
    }

    public static prioritizeGeneral(list: PostType[]): PostType[] {
        return list.sort((a, b) => {
            if (a.name === "General") return -1;
            if (b.name === "General") return 1;
            return 0;
        });
    }
    
}