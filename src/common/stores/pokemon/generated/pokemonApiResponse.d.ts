interface PokemonApiResponse {
    abilities: AbilitiesItem[];
    base_experience: number;
    forms: FormsItem[];
    game_indices: GameIndicesItem[];
    height: number;
    held_items: HeldItemsItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: MovesItem[];
    name: string;
    order: number;
    species: Species;
    sprites: Sprites;
    stats: StatsItem[];
    types: TypesItem[];
    weight: number;
}
interface AbilitiesItem {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
}
interface Ability {
    name: string;
    url: string;
}
interface FormsItem {
    name: string;
    url: string;
}
interface GameIndicesItem {
    game_index: number;
    version: Version;
}
interface Version {
    name: string;
    url: string;
}
interface HeldItemsItem {
    item: Item;
    version_details: VersionDetailsItem[];
}
interface Item {
    name: string;
    url: string;
}
interface VersionDetailsItem {
    rarity: number;
    version: Version;
}
interface MovesItem {
    move: Move;
    version_group_details: VersionGroupDetailsItem[];
}
interface Move {
    name: string;
    url: string;
}
interface VersionGroupDetailsItem {
    level_learned_at: number;
    move_learn_method: Move_learn_method;
    version_group: Version_group;
}
interface Move_learn_method {
    name: string;
    url: string;
}
interface Version_group {
    name: string;
    url: string;
}
interface Species {
    name: string;
    url: string;
}
interface Sprites {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
}
interface StatsItem {
    base_stat: number;
    effort: number;
    stat: Stat;
}
interface Stat {
    name: string;
    url: string;
}
interface TypesItem {
    slot: number;
    type: Type;
}
interface Type {
    name: string;
    url: string;
}
