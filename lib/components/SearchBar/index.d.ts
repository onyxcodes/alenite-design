import React from 'react';
import './index.scss';
interface SearchBarProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    onSearch: (query: string) => void;
}
declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
