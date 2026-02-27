import { CSSProperties, ImgHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import './Image.styles.css';

type Style = CSSProperties & {
    '--image-width': string;
    '--image-height': string;
}

export type Props = ImgHTMLAttributes<HTMLImageElement> & {
    width: string;
    height: string;
    imageSrc: string;
};

type Component = (props: Props) => JSX.Element;

export const Image: Component = props => {
    const { width, height, imageSrc, className } = props;

    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    const handleLoaded = () => {
        setError(false);
    };

    const style: Style = {
        '--image-width': width,
        '--image-height': height,
    };

    return (
        <div style={style} className={classNames('image', className)}>
            {(!imageSrc || error) && (
                <div className='fallback' />
            )}

            {imageSrc &&
                <img
                    src={imageSrc}
                    width={width}
                    height={height}
                    loading='lazy'
                    onError={handleError}
                    onLoad={handleLoaded}
                />
            }
        </div>
    )
};
