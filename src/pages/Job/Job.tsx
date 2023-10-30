import {FC} from "react";

import styles from './Job.module.scss'

interface JobProps {
  
}
 
const Job: FC<JobProps> = () => {
  return (
  <div className={styles.job}>
    В разработке...
  </div>
  );
}
 
export default Job;