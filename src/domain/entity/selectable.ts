export interface Selectable {
    id: string;
    name: string;
}

export function mapSelectedToSelectable(selectedNames: string[], catalog: Selectable[]): Selectable[] {
    return selectedNames
        .map(name => catalog.find(item => item.name === name))
        .filter((item): item is Selectable => item !== undefined);
}