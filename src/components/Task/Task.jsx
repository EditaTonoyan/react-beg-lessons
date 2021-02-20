import styles from './Task.module.css'

const Task = (props) => {
    const {task} = props;
    return (
        <div  className="task">
            <li className={styles.li}>{task}</li>
        </div>
    )
}
export default Task