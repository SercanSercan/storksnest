import React, {useRef, useState} from 'react';
import { useKeyListener } from '@fremtind/jkl-react-hooks';

const Typeahead = () => {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const ref = useRef(null);
    const keys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Backspace'];

    const onKeyPressed = (event) => {
        switch (event.key) {
            case 'ArrowDown':
                console.log("arrow down");
                break;
            default:
                console.log("do nothing");
                break;
        }
    };
    useKeyListener(ref, keys, onKeyPressed);

    return (
        <div className="typeahead">
            <input
                ref={ref}
                type="text"
                value={value}
                placeholder="Type to see some suggestions"
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
            />
        </div>
    );
};

export default Typeahead;