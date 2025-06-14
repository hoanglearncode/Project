import { useState } from "react";
import { Search, X} from 'lucide-react';
export default function SearchBox() {
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="relative flex-1 max-w-md">
            <div className={`relative transition-all duration-300 ${
                isFocused ? 'transform scale-105' : ''
            }`}>
                <Search 
                    size={18} 
                    className={`absolute left-3 top-1/2 z-10 transform -translate-y-1/2 transition-colors duration-300 ${
                        isFocused ? 'text-blue-500' : 'text-gray-700'
                    }`} 
                />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white/95 backdrop-blur-sm border-2 rounded-xl 
                        text-gray-700 placeholder-gray-400 outline-none transition-all duration-300
                        ${isFocused 
                            ? 'border-blue-400 shadow-lg shadow-blue-100/50 bg-white' 
                            : 'border-white/50 hover:border-white/70 shadow-md'
                        }`}
                />
                {searchValue && (
                    <button
                        onClick={() => setSearchValue('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={18}/>
                    </button>
                )}
            </div>
        </div>
    );
}