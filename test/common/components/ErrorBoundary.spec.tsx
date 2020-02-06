import React from 'react';
import { ErrorBoundary } from 'components/common/ErrorBoundary';
import { mount } from 'enzyme';
import { logger } from 'utils/logger';
import { Event } from 'utils/event';

const GoodComponent = (): JSX.Element => <div>Success!</div>;
const EvilComponent = (props: any): JSX.Element => <div>{props.waitForIt.kaboom}</div>;

describe('<ErrorBoundary />', () => {
  let errorOverrideSpy: jest.SpyInstance;
  let logOverrideSpy: jest.SpyInstance;
  let loggerSpy: jest.SpyInstance;

  beforeAll(() => {
    errorOverrideSpy = jest.spyOn(console, 'error');
    logOverrideSpy = jest.spyOn(console, 'log');
    errorOverrideSpy.mockImplementation(() => ({}));
    logOverrideSpy.mockImplementation(() => ({}));
  });

  beforeEach(() => {
    loggerSpy = jest.spyOn(logger, 'event');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initially set the error state to false when no error in tree', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );

    expect(wrapper.state('hasError')).toBe(false);
  });

  it('should catch and log errors in the nested component tree', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <EvilComponent />
      </ErrorBoundary>
    );

    expect(wrapper.state('hasError')).toBe(true);
    expect(wrapper.find('[data-tid="error-boundary"]')).toHaveLength(1);
    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(loggerSpy).toHaveBeenCalledWith(Event.ERROR_BOUNDARY, expect.any(String));
  });

  it('should use fallback if one is present', () => {
    const fallbackComp = (): JSX.Element => <div data-tid="fallback-component">Fallback!</div>;

    const wrapper = mount(
      <ErrorBoundary fallback={fallbackComp}>
        <EvilComponent />
      </ErrorBoundary>
    );

    const fallback = wrapper.find('[data-tid="fallback-component"]');

    expect(fallback).toHaveLength(1);
    expect(fallback.text()).toBe('Fallback!');
  });
});
