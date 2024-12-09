import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import NextJS from "../../assets/images/NextJs.jpg";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-xl dark:bg-gray-800 bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={NextJS}
          alt="course"
          className="w-full h-40 object-cover rounded-t-xl"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3 cursor-pointer">
        <h1 className="hover:underline font-bold text-lg truncate">
          Nextjs Complete Course in Hindi 2024
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Photo Icon" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Aniket Nagpure</h1>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            Advance
          </Badge>
        </div>
        <div className="text-lg font-bold">
          <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
