import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileImage from "../../assets/images/profileImage.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdatedUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [dailogOpen, setDailogOpen] = useState(false);

  // When we use get method in RTK query, we use {} method
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error,
      isError,
      isSuccess
    },
  ] = useUpdatedUserMutation();

  // Initialize states with user data when it's available
  useEffect(() => {
    if (data?.user) {
      setName(data.user?.name || "");
      setProfilePhoto(null); // Keep profilePhoto empty initially
    }
  }, [data]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    // whenever we want to send file we use formData
    const formData = new FormData();

    // Only append fields that have changed
    if (name && name !== data?.user?.name) formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  // useEffect(() => {
  //   refetch();
  // },[])

  useEffect(()=> {
    if(isSuccess) {
      refetch();
      setDailogOpen(false);
      toast.success(updateUserData?.message || "Profile updated successfully.")
    }
    if(isError) {
      toast.error(updateUserData?.message || "Error occurred while updating profile.")
    }
  },[isSuccess, isError, updateUserData, refetch]);

  // Early return for loading or error states
  if (isLoading) return <ProfileSkeleton />;

  // Safely destructuring user
  const user = data && data?.user || {};

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-3xl text-center md:text-left">
        MY PROFILE
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || ProfileImage}
              alt="Profile Image"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog open={dailogOpen} onOpenChange={setDailogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                  <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button> 
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-xl">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user?.enrolledCourses.length === 0 ? (
            <h1 className="text-lg">You haven't enrolled yet.</h1>
          ) : (
            user?.enrolledCourses?.map((course, i) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-24 animate-pulse">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto md:mx-0"></div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-8 my-5">
        <div className="flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
      <div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 my-5"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};
