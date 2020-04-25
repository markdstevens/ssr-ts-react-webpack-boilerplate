import React, { FC } from 'react';
import { useDataFetching } from 'platform/hooks/useDataFetching';
import { logger } from 'platform/utils/logger';
import { useLocation } from 'react-router-dom';
import { Event } from 'platform/utils/event';
import { LoadableComponent } from '@loadable/component';
import { FetchOptions } from 'platform/controllers';

export interface ViewProps {
  fetch?: ((fetchOptions: FetchOptions) => Promise<void>) | undefined;
}

export const dataView = (View: LoadableComponent<{}>): FC<ViewProps> => {
  const DataView = ({ fetch }: ViewProps): JSX.Element => {
    const location = useLocation();

    if (!fetch) {
      logger.event(
        Event.NO_CONTROLLER_ACTION_FOUND,
        `no controller action found for ${location.pathname}`
      );
    }

    useDataFetching(fetch);
    return <View />;
  };
  DataView.displayName = 'DataView';
  return DataView;
};
