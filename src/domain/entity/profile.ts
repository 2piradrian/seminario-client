import type { PageProfile } from "./page-profile.ts";
import { UserProfile } from "./user-profile";

export class Profile {
  
  private constructor(
    public id: string,
    public displayName: string,
    public portraitImage: string,
    public profileImage: string,
    public shortDescription: string,
    public longDescription: string,
  ) {}

  public static fromEntity(user: UserProfile, page: PageProfile | null): Profile {
    const source = page?.id ? page : user;

    const displayName = "surname" in source
        ? this.buildName(source.name, source.surname)
        : source.name;

    return new Profile(
        source.id,
        displayName,
        source.portraitImage,
        source.profileImage,
        source.shortDescription,
        source.longDescription
    );
}

  private static buildName(name: string, surname?: string) {
    return surname ? `${name} ${surname}` : name;
  }

  public static mapToProfiles(selected: string[], catalog: Profile[]): Profile[] {
    return selected
      .map(name => catalog.find(item => item.displayName === name))
      .filter((item): item is Profile => item !== undefined);
  }

  public static toProfile(selected: string, catalog: Profile[]): Profile | undefined {
    return catalog.find(item => item.displayName === selected);
  }

  public static mapToNames(selectedProfiles: Profile[]): string[] {
    return selectedProfiles.map(profile => profile.displayName);
  }
  
}
