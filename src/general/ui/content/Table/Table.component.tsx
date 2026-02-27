import { memo, TableHTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { Checkbox } from '../../';

import './Table.styles.css'

type SortOptions = 'asc' | 'desc' | null;
type SortMap = Record<string, SortOptions>;
export type SortState = { column: string; direction: SortOptions };

type Row = Record<string, string | number | JSX.Element> & {
    id: string;
};

type Props<Data extends ReadonlyArray<Row>, Type = unknown> = TableHTMLAttributes<Type> & {
    headers?: Record<keyof Data[number], string | null>;
    columns: ReadonlyArray<string>;
    data: Data;
    sortedBy?: SortState | null;
    sortable?: ReadonlyArray<string>;
    onSort?: (sortState: SortState) => void;
    onSelect?: () => void;
};

type Component = <Data extends ReadonlyArray<Row>>(props: Props<Data>) => JSX.Element;

export const Table: Component = memo(props => {
    const { headers, columns, data, sortedBy, sortable, onSort } = props;
    const [selectedRows, setSelectedRows] = useState<ReadonlyArray<string>>([]);
    const [sortedColumns, setSortedColumns] = useState<SortMap>({});
    const rowIds = useMemo(() => data.map(row => row.id), [data]);

    useEffect(() => {
        if (sortable) {
            const baseSort = sortable.reduce<SortMap>((acc, column) => (acc[column] = null, acc), {});
            const initialSort = !sortedBy ? baseSort : { ...baseSort, [sortedBy.column]: sortedBy.direction };
            setSortedColumns(initialSort);
        }
    }, [sortable, sortedBy]);

    const handleSelectRow = (id: string) => {
        setSelectedRows(state => state.includes(id) ? state.filter(rowId => rowId !== id) : state.concat(id));
    };

    const handleSelectAllRows = () => {
        setSelectedRows(state => state.length < rowIds.length ? rowIds : []);
    };

    const handleSort = useCallback((column: string) => {
        if (onSort && column in sortedColumns) {
            const { [column]: direction } = sortedColumns;
            const sort = { column, direction };
            if (direction === null) sort.direction = 'desc';
            if (direction === 'desc') sort.direction = 'asc';
            if (direction === 'asc') sort.direction = null;
            setSortedColumns(state => ({ ...state, [column]: sort.direction }));
            onSort(sort);
        }
    }, [onSort, sortedColumns]);

    return (
        <div className='table'>
            <table>
                <colgroup>
                    <col className='column-select' data-column='select' />
                    {columns.map(key => (
                        <col className={`column-${key}`} key={`column-${key}`} data-column={key} />
                    ))}
                </colgroup>

                {headers && (
                    <thead>
                        <tr>
                            <th data-col='select'>
                                <Checkbox
                                    checked={!!selectedRows.length && selectedRows.length === rowIds.length}
                                    onChange={handleSelectAllRows}
                                />
                            </th>
                            {columns.map(key => (
                                <th key={`table-header-${key}`} data-col={key}>
                                    {!sortable?.includes(key) && headers[key]}
                                    {sortable?.includes(key) && (
                                        <div
                                            className={classNames('sortable-column', sortedColumns[key])}
                                            onClick={() => handleSort(key)}
                                        >
                                            {headers[key]}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}

                <tbody>
                    {data.map(row => (
                        <tr key={row.id} data-row={row.id}>
                            <td data-col='select'>
                                <Checkbox
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleSelectRow(row.id)}
                                />
                            </td>
                            {columns.map(key => (
                                <td key={`${key}-${row.id}`} data-col={key}>
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}) as Component;
