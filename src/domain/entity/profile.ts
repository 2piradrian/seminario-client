import type { Page } from "./page";
import { UserProfile } from "./user-profile";

export class Profile {
  
  private constructor(
    public id: string,
    public displayName: string,
    public portraitImage: string,
    public profileImage: string,
    public shortDescription: string,
    public longDescription: string
  ) {}

  public static fromEntity(profile: UserProfile | Page): Profile {
    if (!profile) return undefined;

  	const displayName = "surname" in profile 
  	  ? this.buildName(profile.name, profile.surname) 
  	  : profile.name;

    return new Profile(
      profile.id,
      displayName,
      profile.portraitImage,
      profile.profileImage,
      profile.shortDescription,
      profile.longDescription
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
