// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { toast } from 'react-toastify';
import { base_url } from '../utils/baseurl';

const Settings = () => {
  const [builderInfo, setBuilderInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Daily Report Settings form state
  const [dailyReportSettings, setDailyReportSettings] = useState({
    enabled: false,
    time: "08:00",
    email: ""
  });

  useEffect(() => {
    const fetchBuilderInfo = async () => {
      try {
        const builder = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        if (!builder || !builder.id) {
          toast.error('Builder ID not found, please log in again');
          return;
        }

        const response = await fetch(`${base_url}/builders/${builder.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch builder information');
        }

        const data = await response.json();
        setBuilderInfo(data);

        // Initialize daily report settings
        if (data.emailNotifications && data.emailNotifications.dailyReport) {
          setDailyReportSettings({
            enabled: data.emailNotifications.dailyReport.enabled || false,
            time: data.emailNotifications.dailyReport.time || "08:00",
            email: data.emailNotifications.dailyReport.email || ""
          });
        }

        // Set logo preview if exists
        if (data.logo) {
          setPreviewImage(data.logo);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching builder data:', error);
        toast.error('Failed to load settings');
        setLoading(false);
      }
    };

    fetchBuilderInfo();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDailyReportChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDailyReportSettings({
      ...dailyReportSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const updateDailyReportSettings = async () => {
    try {
      setUpdating(true);
      const builder = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

      const response = await fetch(`${base_url}/builder/update-report-settings/${builder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dailyReportSettings)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update daily report settings');
      }

      const updatedSettings = await response.json();
      toast.success('Daily report settings updated successfully');

      // Update local state with new settings
      setDailyReportSettings(updatedSettings.dailyReport);
    } catch (error) {
      console.error('Error updating daily report settings:', error);
      toast.error(error.message || 'Failed to update settings');
    } finally {
      setUpdating(false);
    }
  };

  const updateProfileImage = async () => {
    if (!selectedImage) {
      toast.info('No new image selected');
      return;
    }

    try {
      setUpdating(true);
      const builder = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

      const formData = new FormData();
      formData.append('logo', selectedImage);

      const response = await fetch(`${base_url}/builders/${builder.id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update profile image');
      }

      const result = await response.json();

      if (result.success) {
        // Update the logo in localStorage
        const builderData = JSON.parse(localStorage.getItem('user'));
        builderData.logo = result.builder.logo;
        localStorage.setItem('user', JSON.stringify(builderData));

        toast.success('Profile image updated successfully');
      } else {
        throw new Error(result.message || 'Failed to update profile image');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      toast.error(error.message || 'Failed to update profile image');
    } finally {
      setUpdating(false);
    }
  };

  const saveAllChanges = async () => {
    try {
      setUpdating(true);

      // First update daily report settings
      await updateDailyReportSettings();

      // Then update profile image if selected
      if (selectedImage) {
        await updateProfileImage();
      }

      toast.success('All settings updated successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to save all changes');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 2xl:p-10">
        <Breadcrumb pageName="Settings" />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Information Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="font-semibold text-black dark:text-white">
              Builder Information
            </h3>
          </div>
          <div className="p-6">
            <div className="mb-4 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Builder Name
                </label>
                <input
                  type="text"
                  placeholder="Builder Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={builderInfo?.name || ''}
                  disabled
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={builderInfo?.username || ''}
                  disabled
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={builderInfo?.company || ''}
                  disabled
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Status
                </label>
                <input
                  type="text"
                  placeholder="Status"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={builderInfo?.status || ''}
                  disabled
                />
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  placeholder="Experience"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={builderInfo?.experience || 0}
                  disabled
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Established Year
                </label>
                <input
                  type="number"
                  placeholder="Established Year"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={builderInfo?.establishedYear || ''}
                  disabled
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Website
              </label>
              <input
                type="text"
                placeholder="Website URL"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={builderInfo?.website || ''}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={
                  builderInfo?.address
                    ? `${builderInfo.address.street || ''}, ${builderInfo.address.city || ''}, ${builderInfo.address.state || ''}, ${builderInfo.address.pincode || ''}`
                    : ''
                }
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Contacts
              </label>
              <input
                type="text"
                placeholder="Contacts"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={(builderInfo?.contacts || []).join(', ')}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Daily Reports Settings Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="font-semibold text-black dark:text-white">
              Daily Report Settings
            </h3>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label className="mb-2.5 flex items-center text-black dark:text-white">
                <input
                  type="checkbox"
                  name="enabled"
                  className="mr-2 h-5 w-5"
                  checked={dailyReportSettings.enabled}
                  onChange={handleDailyReportChange}
                />
                Enable Daily Reports
              </label>
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Email for Reports
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={dailyReportSettings.email}
                onChange={handleDailyReportChange}
                disabled={!dailyReportSettings.enabled}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Report Time (24-hour format)
              </label>
              <input
                type="time"
                name="time"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={dailyReportSettings.time}
                onChange={handleDailyReportChange}
                disabled={!dailyReportSettings.enabled}
              />
            </div>
          </div>
        </div>

        {/* Profile Image Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="font-semibold text-black dark:text-white">
              Profile Image
            </h3>
          </div>
          <div className="p-6">
            <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
              <div className="h-40 w-40 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-gray-300">
                    {builderInfo?.name ? builderInfo.name.charAt(0).toUpperCase() : 'B'}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 max-w-md">
                <label className="relative flex min-h-[60px] items-center justify-center rounded-md border border-dashed border-primary py-4 px-6 cursor-pointer">
                  <input
                    type="file"
                    className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div>
                    <span className="block text-center text-sm font-medium text-black dark:text-white mb-1">
                      Click to upload image
                    </span>
                    <span className="flex justify-center text-xs text-body-color dark:text-bodydark">
                      SVG, PNG, JPG (max. 800x800px)
                    </span>
                  </div>
                </label>

                <p className="text-sm text-body-color dark:text-bodydark">
                  This image will be displayed in your profile and throughout the platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={saveAllChanges}
            disabled={updating}
          >
            {updating ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;