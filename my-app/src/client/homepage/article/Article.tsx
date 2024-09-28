import { useEffect, useRef } from 'react';
import styles from './Article.module.scss';
import { Value } from 'sass';
import avatartest from '../icon/avatar-default.png';

import { GrView } from "react-icons/gr";
import { FaRegCommentAlt,FaUndoAlt  } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
interface BlockProps {
    name:string;
    userEmail:String;
    imageUrl?: string;
    videoUrl?: string;
    status: string;
    reply:number;
    repost:number;
    like:number;
    view:number;
    imageUserName?:string;
    
  }
  export default function Article({ imageUrl, videoUrl, status,like,repost,view,reply,name,userEmail,imageUserName}: BlockProps) {
    return (
    <div>
        <div className={styles.block}>
        
        {imageUserName && (
        // <img src={imageUserName} alt="User Avatar" className={styles.block__avatar} /> 
        <img src={avatartest} alt="User Avatar" className={styles.block__avatar} /> 
        )}
    
            <div className={styles.block__post}>
                <div className={styles.block__info}>
                    <h6 className={styles.block__name}>{name}</h6>
                    <p className={styles.block__userEmail}>{userEmail}</p>
                </div>
                <div>
                    <p className={styles.block__Status}>{status}</p>
                    {imageUrl && <img src={imageUrl} alt="Content" className={styles.block__Image} />}
                    {videoUrl && (
                    <video controls className={styles.block__Video}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                )}
                </div>
                <ul className={styles.block__Content}>
                    {reply && <li className={styles.block__Content_reply}><FaRegCommentAlt className={styles.icon}/>{reply}</li>}
                    {repost && <li className={styles.block__Content_undo}><FaUndoAlt className={styles.icon}/>{repost}</li>}
                    {like !== undefined && <li className={styles.block__Content_like}><BiLike className={styles.icon}/>{like}</li>}
                    {view !== undefined && <li className={styles.block__Content_view}><GrView className={styles.icon}/>{view}</li>}
                </ul>
            </div>
        </div>
    </div>
    );
  }