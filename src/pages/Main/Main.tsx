import React, {FC, useCallback, useEffect, useState} from 'react';
import styles from './Main.module.css';
import {getListOfUsers, logout} from '../../api.auth';
import search from "../../assets/search.png";
import Pagination from "../../components/Paginator/Paginator";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {setUser} from "../../redux/UserSlice/UserSlice";

const Main: FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [total_pages, setTotal_pages] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<any[]>(users);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListOfUsers(page);
                setUsers(response.data.data);
                setFilteredUsers(users);
                setTotal_pages(response.data.total_pages)
            } catch (err) {
                setUsers([]);
            }
        };
        fetchData();
    }, [page]);

    useEffect(() => {
        const results = users.filter(user =>
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleNextPageClick = useCallback(() => {
        const current = page;
        const next = current + 1;
        const total = users ? total_pages : current;

        setPage(next <= total ? next : current);
    }, [page, users, total_pages]);

    const handlePrevPageClick = useCallback(() => {
        const current = page;
        const prev = current - 1;

        setPage(prev > 0 ? prev : current);
    }, [page]);

    const handleProfileClick = (id: number) => {
        const user = users.find(user => user.id === id);
        if (!user) {
            return;
        }
        dispatch(setUser(user));
        navigate(`/users/${id}`);
    };

  return (
    <div className={styles.App}>
        <section className={styles.profileSection}>
            <div className={styles.flexRow}>
                <div className={styles.contentBox}>
                    <div className={styles.flexRow1}>
                        <img
                            className={styles.searchImg}
                            src={search}
                            alt="alt text"
                        />
                        <input className={styles.highlightSearch}
                               type='text'
                               placeholder='Поиск'
                               onChange={(e) => setSearchTerm(e.target.value)}
                               value={searchTerm} />
                    </div>
                </div>

                <a href='/profile' className={styles.highlightProfile}>Профиль</a>
                <button onClick={logout} className={styles.logoutButton}>Выйти</button>
            </div>
        </section>
        <section className={styles.userListSection}>
            <div className={styles.layoutContainer}>

                {users ? (
                    <div className={styles.itemGrid}>
                        {filteredUsers.map((item, index) => (
                            <div className={styles.userItem} key={index} onClick={() => handleProfileClick(item.id)}>
                                <img
                                    className={styles.userImage}
                                    src={item.avatar}
                                    alt="alt text"
                                />
                                <h4 className={styles.userInfo}>
                                    {item.last_name} {item.first_name} <br/>
                                    {item.email}
                                </h4>
                            </div>
                        ))}
                    </div>
                ) : (
                    'no users'
                )}

                {users && (
                    <Pagination
                        onNextPageClick={handleNextPageClick}
                        onPrevPageClick={handlePrevPageClick}
                        disable={{
                            left: page === 1,
                            right: page === total_pages,
                        }}
                        nav={{current: page, total: total_pages}}
                    />
                )}
            </div>
        </section>
    </div>
  );
}

export default Main;