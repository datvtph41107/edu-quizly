import { useForm } from 'react-hook-form';
import Input from '~/components/Input';
import Button from '~/components/Button';
import styles from './Table.module.scss';
import classNames from 'classnames/bind';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TableTipTap from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';

const cx = classNames.bind(styles);

function Table() {
    const {
        register,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            rows: '',
            columns: '',
        },
    });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ table: false }),
            TableTipTap.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: '<p>Start typing or insert a table 👇</p>',
    });

    const rows = watch('rows');
    const columns = watch('columns');
    const showPreview =
        !isNaN(rows) &&
        !isNaN(columns) &&
        Number(rows) >= 2 &&
        Number(rows) <= 12 &&
        Number(columns) >= 1 &&
        Number(columns) <= 12;

    const handleInsertTable = () => {
        const rowCount = Number(rows);
        const colCount = Number(columns);

        editor
            .chain()
            .focus()
            .insertTable({
                rows: rowCount,
                cols: colCount,
                withHeaderRow: true,
            })
            .run();
    };
    return (
        <>
            <h2 className={cx('heading')}>Dimensions for table</h2>
            <div className={cx('field-wrapper')}>
                <div className={cx('gap')}>
                    <Input
                        label="Number of rows"
                        name="rows"
                        type="number"
                        placeholder="Number of rows"
                        classes={cx('form-input')}
                        classNameLabel={cx('form-label')}
                        {...register('rows', {
                            min: {
                                value: 2,
                                message: 'No. of rows must be at least 2',
                            },
                            max: {
                                value: 12,
                                message: 'No. of rows must be no more than 12',
                            },
                        })}
                    />
                    {errors.rows && <span className={cx('error')}>{errors.rows.message}</span>}
                </div>
                <div>
                    <Input
                        label="Number of columns"
                        name="columns"
                        type="number"
                        placeholder="Number of columns"
                        classes={cx('form-input')}
                        classNameLabel={cx('form-label')}
                        {...register('columns', {
                            min: {
                                value: 1,
                                message: 'No. of columns must be at least 1',
                            },
                            max: {
                                value: 12,
                                message: 'No. of columns must be no more than 12',
                            },
                        })}
                    />
                    {errors.columns && <span className={cx('error')}>{errors.columns.message}</span>}
                </div>
            </div>

            {showPreview && (
                <div>
                    <h2 className={cx('heading')}>Preview</h2>
                    <div className={cx('field-preview')}>
                        {Array.from({ length: Number(rows) }).map((_, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={cx('row', {
                                    headingRow: rowIndex === 0,
                                })}
                            >
                                {Array.from({ length: Number(columns) }).map((_, colIndex) => (
                                    <div key={colIndex} className={cx('cell')}></div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={cx('btn-gap')}>
                        <Button type="button" small className={cx('btn')} onClick={handleInsertTable}>
                            Insert
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Table;
