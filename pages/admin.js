import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiX } from 'react-icons/fi';
import { withAuth } from '../utils/auth';

function Admin({ auth }) {
    const [banners, setBanners] = useState([]);
    const [editBanner, setEditBanner] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [setting, setSetting] = useState(null);
    const [showSettingModal, setShowSettingModal] = useState(false);
    const [viewImage, setViewImage] = useState(null);

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

    // Add logout functionality
    const handleLogout = () => {
        auth.logout();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Add logout button */}
            <div className="max-w-7xl mx-auto mb-8 flex justify-end">
                <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-all duration-200 transform hover:scale-105"
                >
                    <span>Logout</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Contact Settings Card */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Contact Settings</h2>
                            <p className="text-gray-300">Manage your contact information</p>
                        </div>
                        <button 
                            className="group flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white transition-all duration-200 transform hover:scale-105"
                            onClick={() => setShowSettingModal(true)}
                        >
                            <FiEdit2 className="mr-2" />
                            <span>Edit Settings</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                            <label className="text-gray-400 text-sm mb-2 block">For New ID</label>
                            <span className="text-2xl font-semibold text-white block">{setting?.number1 || '-'}</span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                            <label className="text-gray-400 text-sm mb-2 block">For Master & Super Master ID</label>
                            <span className="text-2xl font-semibold text-white block">{setting?.number2 || '-'}</span>
                        </div>
                    </div>
                </div>

                {/* Banner List Card */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Banner Gallery</h1>
                            <p className="text-gray-300">Manage your banner collection</p>
                        </div>
                        <button 
                            className="group flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white transition-all duration-200 transform hover:scale-105"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <FiPlus className="mr-2" />
                            <span>Add New Banner</span>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {banners.map((banner, index) => (
                            <div key={banner._id} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105">
                                <div className="aspect-[3/1] relative">
                                    <img 
                                        src={banner.image} 
                                        alt={banner.name} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-white text-lg font-semibold">{banner.name}</h3>
                                        <span className="text-gray-400 text-sm">#{index + 1}</span>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <button 
                                            onClick={() => setViewImage(banner)}
                                            className="flex items-center justify-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-blue-300 text-sm transition-all duration-200 hover:scale-105 w-full"
                                        >
                                            <FiEye className="mr-2" /> View
                                        </button>
                                        <button 
                                            onClick={() => setEditBanner(banner)}
                                            className="flex items-center justify-center px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-xl text-indigo-300 text-sm transition-all duration-200 hover:scale-105 w-full"
                                        >
                                            <FiEdit2 className="mr-2" /> Edit
                                        </button>
                                        <button 
                                            onClick={() => setShowDeleteConfirm(banner)}
                                            className="flex items-center justify-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-300 text-sm transition-all duration-200 hover:scale-105 w-full"
                                        >
                                            <FiTrash2 className="mr-2" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Backdrop */}
            {(showSettingModal || showCreateModal || editBanner || showDeleteConfirm) && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
                        {/* Setting Modal */}
                        {showSettingModal && setting && (
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Update Contact Numbers</h2>
                                <form onSubmit={handleSettingUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">For New ID</label>
                                        <input 
                                            type="text" 
                                            name="number1" 
                                            defaultValue={setting.number1}
                                            required 
                                            placeholder="Enter WhatsApp number"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">For Master & Super Master ID</label>
                                        <input 
                                            type="text" 
                                            name="number2" 
                                            defaultValue={setting.number2}
                                            required 
                                            placeholder="Enter WhatsApp number"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowSettingModal(false)}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white transition-colors duration-200 disabled:opacity-50"
                                        >
                                            {isLoading ? 'Updating...' : 'Update Numbers'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Create Modal */}
                        {showCreateModal && (
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Add New Banner</h2>
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Redirect WhatsApp Number</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required 
                                            placeholder="Enter Redirect WhatsApp Number"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Banner Image</label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                name="image" 
                                                accept="image/*"
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateModal(false)}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white transition-colors duration-200 disabled:opacity-50"
                                        >
                                            {isLoading ? 'Creating...' : 'Add Banner'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Edit Modal */}
                        {editBanner && (
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Edit Banner</h2>
                                <form onSubmit={(e) => handleUpdate(e, editBanner._id)} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Redirect WhatsApp Number</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            defaultValue={editBanner.name} 
                                            required 
                                            placeholder="Enter Redirect WhatsApp Number"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Banner Image</label>
                                        <input 
                                            type="file" 
                                            name="image" 
                                            accept="image/*"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                                        />
                                        <img 
                                            src={editBanner.image} 
                                            alt="Current" 
                                            className="mt-4 w-full h-48 object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setEditBanner(null)}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white transition-colors duration-200 disabled:opacity-50"
                                        >
                                            {isLoading ? 'Updating...' : 'Update Banner'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Delete Confirmation Modal */}
                        {showDeleteConfirm && (
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-4">Confirm Delete</h2>
                                <p className="text-gray-300 mb-6">
                                    Are you sure you want to delete "{showDeleteConfirm.name}"?
                                </p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(null)}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(showDeleteConfirm._id)}
                                        disabled={isLoading}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Deleting...' : 'Delete Banner'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Full Screen Image Modal */}
            {viewImage && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex flex-col items-center justify-center"
                    onClick={() => setViewImage(null)}
                >
                    <div className="absolute top-4 right-4">
                        <button 
                            onClick={() => setViewImage(null)}
                            className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                        <img 
                            src={viewImage.image} 
                            alt={viewImage.name}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
                        />
                        <h3 className="text-white text-xl font-semibold mt-4">{viewImage.name}</h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(Admin); 