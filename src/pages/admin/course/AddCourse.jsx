import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/CourseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const [createCourse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation();

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  const createCourseHandler = async() => {
    await createCourse({courseTitle, category})
  }

  useEffect(()=> {
    if(isSuccess) {
        toast.success(data?.message || 'Course created successfully.')
        setCourseTitle('')
        setCategory('')
        navigate('/admin/course')
    }
    if(error) {
        toast.error(data?.message || 'Failed to create course')
    }
  },[isSuccess, error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new course
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, minus!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            className="w-[300px]"
            type="text"
            value={courseTitle}
            onChange={(e)=> setCourseTitle(e.target.value)}
            placeholder="Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="HTML">HTML</SelectItem>
                <SelectItem value="CSS">CSS</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="React JS">React JS</SelectItem>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 py-3">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {
                isLoading ? (
                    <>
                        <Loader2 className=" h-4 w-4 animate-spin" /> Please wait
                    </>
                ) : "Create"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
