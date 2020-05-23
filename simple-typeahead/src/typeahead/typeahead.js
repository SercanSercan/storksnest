import React, {useState} from 'react';
import { TextInput } from "@fremtind/jkl-text-input-react";

const Typeahead = () => {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    return (
        <div className="typeahead">
            <TextInput
                forceCompact={false}
                action={{
                    icon: 'clear',
                    label: 'Clear the text',
                    onClick: () => setValue(''),
                }}
                label=""
                placeholder="Type to see some suggestions"
                value={value}
                width="100%"
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
            />
        </div>
    );
};

export default Typeahead;