import './Counter.styles.css';

type Props = {
    value: number;
};

type Component = (props: Props) => JSX.Element;

export const Counter: Component = props => (
    <div className='counter'>
        {props.value}
    </div>
);
