import { BaseStore } from '../base-store';
import { LocKeyMap } from 'i18n/platform/types';
import { LocKeys } from 'i18n/platform/loc-keys';
import { logger, Event } from 'platform/utils';
import autoBind from 'auto-bind';

interface LocParams {
  [key: string]: string;
}

export interface LocalizationState {
  strings: LocKeyMap;
  getLoc: (locKey: LocKeys, locParams?: LocParams) => string;
}

export class LocalizationStore extends BaseStore<LocalizationState> {
  constructor(initialState: LocalizationState) {
    super(initialState);
    autoBind(this);

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
    try {
      const module = await import(
        /* webpackChunkName: "[request]" */ `../../../../i18n/strings.${language}-${region}`
      );
      this.state.strings = module.strings;
    } catch (e) {
      logger.event(
        Event.NO_LOCALIZATION_FILE_FOR_REGION_AND_COUNTRY,
        `no localization file found for ${language}-${region}`,
        {
          region,
          language
        }
      );
    }
  }
}
