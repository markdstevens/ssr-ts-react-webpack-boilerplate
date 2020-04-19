import React, { useContext } from 'react';
import { useDataFetching } from 'hooks/useDataFetching';
import { BaseViewController } from 'controllers/platform/base-view-controller';
import { DataViewHoc, StatefulView } from 'common/views/types';
import { logger } from 'utils/logger';
import { useLocation } from 'react-router-dom';
import { AllStoreContext } from 'stores/all-store-context';
import { Event } from 'utils/event';

interface DataViewHocProps {
  controller: BaseViewController;
}

export const dataView: DataViewHoc = ({ view }: Pick<BaseViewController, 'view'>) => {
  const View = view as StatefulView;
  const DataView = ({ controller }: DataViewHocProps): JSX.Element => {
    const location = useLocation();
    const stores = useContext(AllStoreContext);

    const matchingControllerMethodMetaData = controller.getMatchingControllerMethodMetaData(location.pathname, stores);
    const fetchMethod = controller[matchingControllerMethodMetaData?.controllerMethod];
    if (!matchingControllerMethodMetaData) {
      logger.event(Event.NO_ROUTE_FOUND, `no controller action found for ${location.pathname}`);
    }

    useDataFetching(fetchMethod, controller.path);

    return <View />;
  };
  DataView.displayName = 'DataView';
  return DataView;
};
