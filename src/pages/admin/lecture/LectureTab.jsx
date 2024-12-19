import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useRemoveLectureMutation, useGetLectureByIdQuery } from "@/features/api/CourseApi";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = `http://localhost:8080/api/v1/media`;

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const params = useParams();
  const {courseId, lectureId} = params;

  const {data:lectureData, refetch} = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;
  console.log(lecture)

  useEffect(()=> {
    if(lecture){
        refetch()
        console.log("Setting isFree:", lecture.isPreviewFree);
        setLectureTitle(lecture.lectureTitle);
        setIsFree(lecture.isPreviewFree);
        setUploadVideoInfo(lecture.videoInfo);
    }
  },[lecture])

  const [editLecture, {data, isSuccess, error, isLoading}] = useEditLectureMutation();

  const [removeLecture, {data: removeData, isLoading: removeIsLoading, isSuccess: removeIsSuccess, error: removeError}] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round(loaded * 100) / total);
          },
        });
        if (res.data.success) {
          // console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async() => {
    await editLecture({
        lectureTitle, 
        videoInfo: uploadVideoInfo, 
        isPreviewFree: isFree, 
        courseId, 
        lectureId 
    })
  }

  const removeLectureHandler = async() => {
    await removeLecture(lectureId);
  }

  useEffect(()=> {
    if(isSuccess){
        toast.success(data.message || 'Lecture updated successfully');
    }
    if(error){
        toast.error(error.data.message || 'Failed to update lecture')
    }
  },[isSuccess, error, data])

  useEffect(()=> {
    if(removeIsSuccess){
        toast.success(removeData.message || 'Lecture delete successfully');
    }
    if(removeError){
        toast.error(removeError.data.message || 'Failed to delete lecture')
    }
  },[removeIsSuccess, removeError, removeData])

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription className="mt-1">
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button disabled={removeIsLoading} variant="destructive" onClick={removeLectureHandler}>
            {
                removeIsLoading ? 
                <>
                    <Loader className="h-4 w-4 animate-spin" />Please wait
                </> : 'Remove Lecture'
            }
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            className="w-[300px]"
            type="text"
            value={lectureTitle}
            onChange={(e)=> setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to JavaScript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            className="w-fit"
            type="file"
            accept="video/*"
            placeholder="Insert video"
            onChange={fileChangeHandler}
          />
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="flex items-center space-x-2 my-5">
            {lecture && (
                <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
            )}
          {/* <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" /> */}
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        <div className="mt-4">
          <Button disabled={isLoading} onClick={editLectureHandler}>
          {
                isLoading ? 
                <>
                    <Loader className="h-4 w-4 animate-spin" />Please wait
                </> : 'Update Lecture'
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
