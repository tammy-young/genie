import { useSelector } from "react-redux";
import ProfilePicture from "../../components/profilePicture";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import EditProfileForm from "../../containers/EditProfile";
import FilterSection from "../../containers/ManageFilters";
import Snackbar from '@mui/joy/Snackbar';

export default function Profile() {
  const profile = useSelector(state => state);
  const [isEditing, setIsEditing] = useState(false);
  const [showDoneEditSnackbar, setShowDoneEditSnackbar] = useState(false);

  useEffect(() => {
    document.title = "Profile | Genie";

    if (!profile.username) {
      window.location.href = "/login";
      return;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='flex flex-col h-full relative gap-4 site-padding'>
      <div className="flex flex-col gap-2">
        <div className='sticky top-0 bg-white/95 dark:!bg-neutral-900/80 dark:text-neutral-100 z-50'>
          <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>My Profile</h2>
        </div>
        {
          isEditing ? (
            <EditProfileForm profile={profile} setIsEditing={setIsEditing} setShowDoneEditSnackbar={setShowDoneEditSnackbar} />
          ) : (
            <div className="rounded-xl border-[1px] dark:border-neutral-700 p-6 flex flex-row items-center justify-between w-full gap-6 md:max-w-[75%]">
              <div className="flex flex-row gap-4 items-center">
                <ProfilePicture username={profile.username} size={120} />
                <div>
                  <h3 className="text-2xl font-semibold">{profile.name || "Anonymous Doll"}</h3>
                  <p className="text-gray-600 dark:text-gray-300">@{profile.username}</p>
                </div>
              </div>
              <button
                className="flex flex-row items-center gap-1 font-semibold rounded-xl border-[1px] dark:border-neutral-700 !p-2 !px-4 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={() => setIsEditing(true)}
              >
                <span className="!text-primary-300">Edit</span>
                <EditIcon />
              </button>
            </div >
          )
        }
      </div>
      <div className="flex flex-col gap-2">
        <div className='sticky top-0 bg-white/95 dark:!bg-neutral-900/80 dark:text-neutral-100 z-50'>
          <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>Filters</h2>
        </div>
        <div className="md:max-w-[75%]">
          <FilterSection profile={profile} />
        </div>
      </div>
      <Snackbar
        open={showDoneEditSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowDoneEditSnackbar(false)}
        className="dark:!bg-neutral-800 dark:!text-white dark:!border-neutral-600"
      >
        <p className="m-0 p-0">Profile updated successfully</p>
      </Snackbar>
    </div >
  );
}
