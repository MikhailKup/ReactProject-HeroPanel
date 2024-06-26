import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { activeFilterChanged, fetchFilters, selectAll } from './filtersSlice'
import store from '../../store/index'
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
            // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {'active' : name === activeFilter});
            return <button 
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(name))}
                    >
                    {label}
                    </button>
        })
    }
    const elements = renderFiltersList(filters);
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;