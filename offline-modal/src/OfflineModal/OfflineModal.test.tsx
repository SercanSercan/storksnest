import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import OfflineModal from './';
import { act } from 'react-dom/test-utils';

const mockInternetConnection = (status: string) => {
    const events = {};
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle, options?) => {
        // @ts-ignore
        events[event] = handle;
    });
    const goOffline = new window.Event(status);
    act(() => {
        window.dispatchEvent(goOffline);
    });
};

describe('OfflineModalComponent', () => {
    it('switches offline and back online', () => {
        render(<OfflineModal />);
        mockInternetConnection('offline');
        expect(screen.getByText('You are offline')).toBeInTheDocument();
        mockInternetConnection('online');
        expect(screen.getByText('It worked! You are back online! :)')).toBeInTheDocument();
    });
});
