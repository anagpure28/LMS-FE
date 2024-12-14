import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/api/CourseApi";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const navigate = useNavigate();
  const {data, isLoading} = useGetCreatorCourseQuery();

  if(isLoading) return <h1>Loading...</h1>

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   },[])

  return (
    <div>
      <Button onClick={()=> navigate('create')}>Create a new course</Button>
      <Table className="mt-5">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((el,i) => (
            <TableRow key={el?._id}>
              <TableCell className="font-medium">{el?.coursePrice || 'Free'}</TableCell>
              <TableCell><Badge>{el?.isPublished ? 'Published' : 'Draft'}</Badge></TableCell>
              <TableCell>{el?.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button size='sm' variant='ghost' onClick={() => navigate(`${el?._id}`)}><Edit /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
