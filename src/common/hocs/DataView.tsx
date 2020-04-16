import React from 'react';
import { useDataFetching } from 'hooks/useDataFetching';
import { BaseViewController } from 'controllers/platform/base-view-controller';
import { DataViewHoc, StatefulView } from 'common/views/types';

export const dataView: DataViewHoc = ({ view, clientFetch }: BaseViewController) => {
  const View = view as StatefulView;
  const DataView = (): JSX.Element => {
    const { loading = false, error = '' } = useDataFetching(clientFetch);

    return <View {...{ loading, error }} />;
  };
  DataView.displayName = 'DataView';
  return DataView;
};
