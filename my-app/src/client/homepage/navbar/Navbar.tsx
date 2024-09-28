import styles from './Navbar.module.scss';
import grok from '../icon/grok.svg';
import post from '../icon/post.svg';
import avatar from '../icon/avatar-default.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { RiTwitterXFill } from "react-icons/ri";
import { IoMdHome, IoIosSettings } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { FaRegBell, FaEnvelope, FaRegUser, FaList } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

interface NavbarProps {
    userInfo: {
        name: string;
        email: string;
        avatar:string;
    } | null;
    onPostClick: () => void;
}

export default function Navbar({ userInfo, onPostClick }: NavbarProps) {
    const navigate = useNavigate();
    const [moreItem, setMoreItem] = useState(false);
    const [showLogoutForm, setShowLogout] = useState(false);

    const logoutFormRef = useRef<HTMLDivElement>(null);
    const moreItemRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (logoutFormRef.current && !logoutFormRef.current.contains(event.target as Node)) {
            setShowLogout(false);
        }
        if (moreItemRef.current && !moreItemRef.current.contains(event.target as Node)) {
            setMoreItem(false);
        }
    };

    useEffect(() => {
        if (showLogoutForm || moreItem) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLogoutForm, moreItem]);

    const handleLogout = async () => {
        try {
            const accessToken = Cookies.get('access_token');
            if (!accessToken) return;

            const response = await axios.post('http://localhost:3000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // Xóa accessToken khỏi cookie
            Cookies.remove('access_token');
            
            // Hiển thị thông báo thành công
            toast.success(response?.data?.message || 'Đăng xuất thành công');
            
            // Điều hướng đến trang đăng nhập
            navigate("/");
        } catch (error: any) {
            // Xử lý lỗi và hiển thị thông báo lỗi
            if (error.response) {
                const { errors } = error.response.data;
                if (errors) {
                    // Hiển thị thông báo lỗi cho từng trường cụ thể
                    Object.keys(errors).forEach((key) => {
                        const fieldError = errors[key];
                        toast.error(fieldError.msg || 'Đã xảy ra lỗi');
                    });
                } else {
                    // Hiển thị thông báo lỗi chung
                    toast.error(error.response.data.message || 'Có lỗi xảy ra khi đăng xuất');
                }
            } else {
                // Hiển thị thông báo lỗi kết nối hoặc lỗi khác
                toast.error('Đã xảy ra lỗi kết nối');
            }
        }
    };

    const ToggleMore = () => {
        setMoreItem(!moreItem);
    };

    const toggleLogout = () => {
        setShowLogout(!showLogoutForm);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__list}>
                <div className={styles.navbar__icontitle}>
                    <RiTwitterXFill className={styles.navbar__iconH} />
                </div>
                <div className={styles.navbar__item}>
                    <IoMdHome className={styles.navbar__icon} />
                    <h2 className={styles.navbar__desc}>Home</h2>
                </div>
                <div className={styles.navbar__item}>
                    <GoSearch className={styles.navbar__icon} />
                    <h2 className={styles.navbar__desc}>Explore</h2>
                </div>
                <div className={styles.navbar__item}>
                    <FaRegBell className={styles.navbar__icon} />
                    <h2 className={styles.navbar__desc}>Notification</h2>
                </div>
                <div className={styles.navbar__item}>
                    <FaEnvelope className={styles.navbar__icon} />
                    <h2 className={styles.navbar__desc}>Message</h2>
                </div>
                <div className={styles.navbar__item}>
                    <img src={grok} alt="Grok" className={styles.navbar__icon} />
                    <h2 className={styles.navbar__desc}>Grok</h2>
                </div>
                <div className={styles.navbar__item}>
                    <FaRegUser className={styles.navbar__icon} />
                    <h2 className={styles.navbar__desc}>Profile</h2>
                </div>
                <div className={styles.navbar__item} onClick={ToggleMore}>
                    <LuMoreHorizontal className={styles.navbar__icon} />
                    <h2 className={styles.navbar__desc}>More</h2>
                    {moreItem && (
                        <div ref={moreItemRef} className={styles.navbar__moreList}>
                            <div className={styles.navbar__item}>
                                <FaList className={styles.navbar__icon} />
                                <h2 className={styles.navbar__desc}>List</h2>
                            </div>
                            <div className={styles.navbar__item}>
                                <MdOutlineKeyboardVoice className={styles.navbar__icon} />
                                <h2 className={styles.navbar__desc}>Create your Space</h2>
                            </div>
                            <div className={styles.navbar__item}>
                                <IoIosSettings className={styles.navbar__icon} />
                                <h2 className={styles.navbar__desc}>Setting and privacy</h2>
                            </div>
                        </div>
                    )}
                </div>
                <button className={styles.navbar__button} onClick={onPostClick}>
                    <img src={post} alt="Post" />
                    <p>Post</p>
                </button>
                <div className={styles.navbar__user} onClick={toggleLogout}>
                   <img src={userInfo?.avatar || avatar} className={styles.navbar__img} alt="User Avatar"/>
                    <div className={styles.navbar__userinfo}>
                        {userInfo ? (
                            <div className={styles.navbar__userinfo__text}>
                                <p>{userInfo.name || 'Tên không có'}</p>
                                <p>{userInfo.email || 'Email không có'}</p>
                            </div>
                        ) : (
                            <p>Token hết hạn, vui lòng đăng nhập lại</p>
                        )}
                    </div>
                    {showLogoutForm && (
                        <div ref={logoutFormRef} className={styles.navbar__logoutForm}>
                            <button className={styles.navbar__addaccount}>Add an existing account</button>
                            <button className={styles.navbar__logout} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
