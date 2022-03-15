import React, { useEffect, useRef, useState } from 'react';

enum ConnectionStatus {
    Offline,
    SwitchingOnline,
    Online,
}

const OfflineModal: React.FC = () => {
    const [connStatus, setConnStatus] = useState<number>(ConnectionStatus.Online);
    const connStatusRef = useRef(connStatus);
    connStatusRef.current = connStatus;
    useEffect(() => {
        const toggleOffline = () => {
            setConnStatus(ConnectionStatus.Offline);
        };
        let timer: NodeJS.Timeout | undefined;
        const toggleOnline = () => {
            setConnStatus(ConnectionStatus.SwitchingOnline);
            timer = setTimeout(() => {
                if (connStatusRef.current !== ConnectionStatus.Offline) {
                    setConnStatus(ConnectionStatus.Online);
                }
            }, 3000);
        };

        window.addEventListener('online', toggleOnline);
        window.addEventListener('offline', toggleOffline);
        return () => {
            window.removeEventListener('online', toggleOnline);
            window.removeEventListener('offline', toggleOffline);
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, []);

    switch (connStatus) {
        case ConnectionStatus.Offline:
            return (
                <div className="modal__mask" role="document">
                    <h2 id="dialogTitle" className="jkl-title">
                        You are offline
                    </h2>
                    <p className="jkl-body">
                        Please check your internet connection.
                    </p>
                </div>
            );
        case ConnectionStatus.SwitchingOnline:
            return (
                <div className="modal__mask" role="document">
                    <h2 id="dialogTitle" className="jkl-title">
                        It worked! You are back online! :)
                    </h2>
                    <p className="jkl-body">
                        This message will disappear soon.
                    </p>
                </div>
            );
        case ConnectionStatus.Online:
            return <></>;
        default:
            return <></>;
    }
};

export default OfflineModal;