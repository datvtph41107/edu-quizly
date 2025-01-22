import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useDebounce } from '~/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = ['123', '234'];

            setSearchResult();
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChangeValue = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search', { focus: isFocused })}>
                <button className={cx('search-btn', { focus: isFocused })} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={handleChangeValue}
                    onFocus={() => {
                        setShowResult(true);
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            </div>
        </div>
    );
}

export default Search;
