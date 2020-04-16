import { BaseStore } from 'stores/base-store';
import { LocKeys } from 'i18n/types';

type LocalizedStrings = { [key in LocKeys]: string };

export interface LocalizationState {
  strings: LocalizedStrings;
  getLoc: (locKey: LocKeys, locParams?: LocParams) => string;
}

interface LocParams {
  [key: string]: string;
}

export class LocalizationStore extends BaseStore<LocalizationState> {
  constructor(initialState: LocalizationState) {
    super(initialState);

    this.getLoc = this.getLoc.bind(this);
    this.fetch = this.fetch.bind(this);

    this.state.getLoc = this.getLoc;
  }

  public getLoc(locKey: LocKeys, locParams: LocParams = {}): string {
    const numArgs = Object.keys(locParams).length || 0;

    const rawLocString = this.state.strings[locKey];
    if (!rawLocString) {
      throw new Error(`unrecognized localization key "${locKey}"`);
    }

    const numArgsInLocString = rawLocString.match(/\{(([^}]+))\}/g)?.length ?? 0;

    if (numArgs !== numArgsInLocString) {
      throw new Error(
        `number of args in loc string does not match number of args passed to getLoc\nlocKey = ${locKey}`
      );
    }

    let evaluatedLocString = rawLocString;
    Object.keys(locParams).forEach(locParamKey => {
      evaluatedLocString = evaluatedLocString.replace(`{${locParamKey}}`, locParams[locParamKey]);
    });

    return evaluatedLocString ?? '!!! unlocalized content !!!';
  }

  public async fetch(language: string, region: string): Promise<void> {
    const module = await import(/* webpackChunkName: "[request]" */ `../../../../i18n/strings.${language}-${region}`);
    this.state.strings = module.strings;
  }
}
