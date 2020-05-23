import React, {useRef, useState} from 'react';
import { useKeyListener } from '@fremtind/jkl-react-hooks';
import cn from 'classnames';

import suggestions from '../mockdata/suggestions';

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
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
            />
            <ul className="select__wrapper__option-wrapper">
                {showSuggestions &&
                suggestions.suggestions.map((suggestion, i) => {
                    const city = suggestion.capital;
                    return (
                        <li
                            className={cn('select__option', {
                                hovered_option: i === 2 - 1,
                            })}
                            key={i}
                            onMouseDown={() => {
                                //chooseText(address);
                            }}
                        >
                            {city}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Typeahead;