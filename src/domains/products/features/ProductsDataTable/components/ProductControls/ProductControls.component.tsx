import { memo } from 'react';
import { IconCircleMenu, IconPlus } from '@/general/ui/icons';

import { Button } from '@/general/ui';

import './ProductControls.styles.css';

export const ProductControls = memo(() => {
    return (
        <div className='product-controls'>
            <Button size='small' variant='primary' text={<IconPlus />} />
            <Button isIcon size='small' variant='ghost' text={<IconCircleMenu />} />
        </div>
    )
});
