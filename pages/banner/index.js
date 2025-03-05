import { useState, useEffect } from 'react';
import styles from './Banner.module.css';

export default function BannerList() {
    const [banners, setBanners] = useState([]);
    const [editBanner, setEditBanner] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [setting, setSetting] = useState(null);
    const [showSettingModal, setShowSettingModal] = useState(false);

    // Fetch setting data
    const fetchSetting = async () => {
        try {
            const response = await fetch('/api/setting');
            const data = await response.json();
            setSetting(data.data);
        } catch (error) {
            console.error('Error fetching setting:', error);
        }
    };

    // Handle setting update
    const handleSettingUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            id: setting._id,
            number1: e.target.number1.value,
            number2: e.target.number2.value
        };

        try {
            const response = await fetch('/api/changeSetting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowSettingModal(false);
                fetchSetting();
            }
        } catch (error) {
            console.error('Error updating setting:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch banner list
    const fetchBanners = async () => {
        try {
            const response = await fetch('/api/banner/bannerList');
            const data = await response.json();
            setBanners(data.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    useEffect(() => {
        fetchSetting();
        fetchBanners();
    }, []);

    // Handle banner update
    const handleUpdate = async (e, id) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target);
        formData.append('id', id);

        try {
            const response = await fetch('/api/banner/updateBanner', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setEditBanner(null);
                fetchBanners();
            }
        } catch (error) {
            console.error('Error updating banner:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle banner delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/banner/deleteBanner?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setShowDeleteConfirm(null);
                fetchBanners();
            } else {
                console.error('Failed to delete banner');
            }
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    // Add this new function for handling banner creation
    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target);

        try {
            const response = await fetch('/api/banner/addBanner', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setShowCreateModal(false);
                fetchBanners();
            }
        } catch (error) {
            console.error('Error creating banner:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Setting Section */}
            <div className={styles.settingSection}>
                <div className={styles.settingHeader}>
                    <h2>Contact Settings</h2>
                    <button 
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => setShowSettingModal(true)}
                    >
                        Edit Settings
                    </button>
                </div>
                <div className={styles.settingContent}>
                    <div className={styles.settingItem}>
                        <label>Number 1:</label>
                        <span>{setting?.number1 || '-'}</span>
                    </div>
                    <div className={styles.settingItem}>
                        <label>Number 2:</label>
                        <span>{setting?.number2 || '-'}</span>
                    </div>
                </div>
            </div>

            {/* Setting Edit Modal */}
            {showSettingModal && setting && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Edit Settings</h2>
                        <form onSubmit={handleSettingUpdate}>
                            <div>
                                <label>Number 1:</label>
                                <input 
                                    type="text" 
                                    name="number1" 
                                    defaultValue={setting.number1}
                                    required 
                                    placeholder="Enter number 1"
                                />
                            </div>
                            <div>
                                <label>Number 2:</label>
                                <input 
                                    type="text" 
                                    name="number2" 
                                    defaultValue={setting.number2}
                                    required 
                                    placeholder="Enter number 2"
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Updating...' : 'Update'}
                                </button>
                                <button type="button" onClick={() => setShowSettingModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Banner Section */}
            <div className={styles.header}>
                <h1>Banner List</h1>
                <button 
                    className={`${styles.actionButton} ${styles.createButton}`}
                    onClick={() => setShowCreateModal(true)}
                >
                    Create Banner
                </button>
            </div>
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map((banner, index) => (
                        <tr key={banner._id}>
                            <td>{index + 1}</td>
                            <td>{banner.name}</td>
                            <td>
                                <img 
                                    src={banner.image} 
                                    alt={banner.name} 
                                    className={styles.previewImage}
                                />
                            </td>
                            <td>
                                <button className={styles.actionButton} onClick={() => setEditBanner(banner)}>Edit</button>
                                <button className={styles.actionButton} onClick={() => setShowDeleteConfirm(banner)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Create Modal */}
            {showCreateModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Create Banner</h2>
                        <form onSubmit={handleCreate}>
                            <div>
                                <label>Name:*</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required 
                                    placeholder="Enter banner name"
                                />
                            </div>
                            <div>
                                <label>Image:*</label>
                                <input 
                                    type="file" 
                                    name="image" 
                                    accept="image/*"
                                    required
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Creating...' : 'Create'}
                                </button>
                                <button type="button" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editBanner && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Edit Banner</h2>
                        <form onSubmit={(e) => handleUpdate(e, editBanner._id)}>
                            <div>
                                <label>Name:*</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    defaultValue={editBanner.name} 
                                    required 
                                    placeholder="Enter banner name"
                                />
                            </div>
                            <div>
                                <label>Image:*</label>
                                <input 
                                    type="file" 
                                    name="image" 
                                    accept="image/*"
                                />
                                <img 
                                    src={editBanner.image} 
                                    alt="Current" 
                                    className={styles.previewImage}
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Updating...' : 'Update'}
                                </button>
                                <button type="button" onClick={() => setEditBanner(null)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete "{showDeleteConfirm.name}"?</p>
                        <div className={styles.modalActions}>
                            <button 
                                onClick={() => handleDelete(showDeleteConfirm._id)}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Deleting...' : 'Yes'}
                            </button>
                            <button onClick={() => setShowDeleteConfirm(null)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 