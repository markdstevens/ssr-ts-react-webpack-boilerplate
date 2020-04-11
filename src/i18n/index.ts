type LocKeys = 'navBarTitle' | 'chiRho';
type LocalizedStrings = { [key in LocKeys]: string };

export interface LocalizationStore {
  getLoc: (locKey: LocKeys) => string;
}

export class Localization implements LocalizationStore {
  private locale: string;
  private localizedStrings: LocalizedStrings | null = null;

  constructor(locale: string) {
    this.locale = locale;
    import(/* webpackChunkName: "[request]" */ `./strings.${this.locale}`).then(module => {
      this.localizedStrings = module.strings;
    });
  }

  public getLoc(locKey: LocKeys): string {
    if (this.localizedStrings !== null) {
      return this.localizedStrings[locKey];
    }

    return '!!! unlocalized content !!!';
  }
}
